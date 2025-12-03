import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    setLogLevel
} from 'firebase/firestore';

// Variáveis de ambiente (acessadas apenas no runtime do cliente onde são definidas)
let app, db, auth;
let initialized = false;
let currentUserId = null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Dados mock (substitua pela API real quando tiver)
const mockEventsData = [
    { id: "show-banda-a", name: "Show de Lançamento - Banda A", date: "15/12/2025", location: "Arena Principal", price: 120.00, symplaUrl: "https://www.sympla.com.br/evento/show-banda-a/simulacao" },
    { id: "congresso-tech-2026", name: "Congresso de Tecnologia 2026", date: "20/01/2026", location: "Centro de Convenções", price: 450.00, symplaUrl: "https://www.sympla.com.br/evento/congresso-tech/simulacao" },
    { id: "festival-cinema", name: "Festival de Cinema Independente", date: "05/03/2026", location: "Cine Arte", price: 50.00, symplaUrl: "https://www.sympla.com.br/evento/festival-cinema/simulacao" },
    { id: "expo-automovel", name: "Expo Automóvel Luxo", date: "10/04/2026", location: "Pavilhão Metropolitano", price: 280.00, symplaUrl: "https://www.sympla.com.br/evento/expo-automovel/simulacao" },
    { id: "show-pericles-natanzinho", name: "Péricles e Natanzinho Lima - Folk Valley", price: 180.00, symplaUrl: "https://www.sympla.com.br/evento/folk-valley-apresenta-pericles-e-natanzinho-lima/3207294" },
    { id: "reveillon-sunset-gigoia", name: "Réveillon Sunset Gigóia - RIO", price: 600.00, symplaUrl: "https://www.sympla.com.br/evento/reveillon-sunset-gigoia" },
    { id: "reveillon-celebrare-2026", name: "Réveillon Celebrare 2026 - RIO", price: 750.00, symplaUrl: "https://www.sympla.com.br/evento/reveillon-celebrare-2026" },
    { id: "love-sessions-2025", name: "Love Sessions Festival 2025", price: 150.00, symplaUrl: "https://www.sympla.com.br/evento/love-sessions-festival-2025-rio-de-janeiro/1234567" },
];


export default function CheckoutPage() {
    const router = useRouter();
    // CORREÇÃO: Pega o ID da rota dinamicamente
    const { id } = router.query; 

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [authReady, setAuthReady] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        ticketQuantity: 1,
    });
    
    // --- LÓGICA DE FIREBASE CONSOLIDADA NO CLIENTE ---

    // 1. Inicialização e Autenticação Firebase
    useEffect(() => {
        // CORREÇÃO: Inicializa Firebase APENAS no lado do cliente e de forma segura
        if (typeof window !== 'undefined' && !initialized) {
            const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
            
            try {
                app = initializeApp(firebaseConfig);
                db = getFirestore(app);
                auth = getAuth(app);
                setLogLevel('debug'); // Para ver os logs no console
                initialized = true;
            } catch (e) {
                console.error("Firebase Init Falhou:", e);
                setAuthReady(true);
                setLoading(false);
                return;
            }
        }

        const authenticate = async () => {
            if (!auth) return;
            const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

            try {
                let userCredential;
                if (initialAuthToken) {
                    userCredential = await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    userCredential = await signInAnonymously(auth);
                }
                currentUserId = userCredential.user.uid;
                setAuthReady(true);
                console.log("Firebase Auth OK →", currentUserId);
            } catch (err) {
                console.error("Erro na autenticação:", err);
                setAuthReady(true);
            }
        };

        authenticate();
    }, []);

    // 2. Busca do Evento (dependente do ID da URL)
    useEffect(() => {
        if (!id) {
            if (router.isReady) setLoading(false);
            return;
        }

        const found = mockEventsData.find((e) => e.id === id);
        if (found) setEvent(found);
        setLoading(false);
    }, [id, router.isReady]);


    // Salvar intenção de pedido
    const saveOrderIntention = async (orderData, userId) => {
        if (!db) {
            console.error("Firestore não inicializado.");
            return null;
        }
        
        // CORREÇÃO: O path é construído usando o userId que vem da autenticação
        const ordersRef = collection(db, `artifacts/${appId}/users/${userId}/orders`); 
        
        try {
            const docRef = await addDoc(ordersRef, {
                ...orderData,
                timestamp: serverTimestamp(),
                status: 'PENDING_FULFILLMENT',
            });
            return docRef.id;
        } catch (e) {
            console.error("Erro ao salvar pedido:", e);
            return null;
        }
    };

    // Verificar se CPF já comprou este evento
    const checkDuplicateCpf = async (userId, cpf, eventId) => {
        if (!db) return false;
        
        // CORREÇÃO: O path é construído usando o userId que vem da autenticação
        const q = query(
            collection(db, `artifacts/${appId}/users/${userId}/orders`),
            where('customer.cpf', '==', cpf.replace(/\D/g, '')),
            where('eventId', '==', eventId)
        );
        const snap = await getDocs(q);
        return !snap.empty;
    };


    // --- FUNÇÕES DE LÓGICA / UI ---

    // Cálculo de preço com margem de 5%
    const PREMIER_TAX = 0.05;
    const basePrice = event ? event.price : 0;
    const premierPriceUnit = basePrice * (1 + PREMIER_TAX);
    const totalPrice = premierPriceUnit * formData.ticketQuantity;

    // CORREÇÃO: Máscaras de CPF e telefone (usando 'value' de input)
    const formatCPF = (value) => {
        // Remove tudo que não é dígito e aplica a máscara
        const v = value.replace(/\D/g, '');
        return v.replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
                .slice(0, 14);
    }
    const formatPhone = (value) => {
        // Remove tudo que não é dígito e aplica a máscara
        const v = value.replace(/\D/g, '');
        return v.replace(/^(\d{2})(\d)/g, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .slice(0, 15);
    }

    const handleInputChange = (e) => {
        let value = e.target.value;
        const name = e.target.name;

        if (name === 'cpf') value = formatCPF(value);
        if (name === 'phone') value = formatPhone(value);
        if (name === 'ticketQuantity') value = parseInt(value, 10) || 1;

        setFormData({ ...formData, [name]: value });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        
        const userId = currentUserId; // Usa o ID global definido na autenticação

        if (processing || !authReady || !event || !userId) {
             document.getElementById('buyFeedback').innerHTML = '<span style="color:#ff9800">Aguarde o carregamento ou verifique o evento.</span>';
             return;
        }
        
        setProcessing(true);
        const feedback = document.getElementById('buyFeedback');


        try {
            // Checa duplicidade por CPF
            const alreadyBought = await checkDuplicateCpf(userId, formData.cpf, event.id);
            if (alreadyBought) {
                feedback.innerHTML = '<span style="color:#ff9800">Você já reservou ingresso(s) para este evento com este CPF.</span>';
                setProcessing(false);
                return;
            }

            // Monta dados do pedido
            const orderData = {
                eventId: event.id,
                eventName: event.name,
                customer: {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    cpf: formData.cpf.replace(/\D/g, ''),
                    phone: formData.phone.replace(/\D/g, ''),
                },
                quantity: formData.ticketQuantity,
                totalPaid: parseFloat(totalPrice.toFixed(2)),
                originalPrice: event.price,
                profitMargin: parseFloat((totalPrice - event.price * formData.ticketQuantity).toFixed(2)),
                symplaUrl: event.symplaUrl,
                premierPrice: parseFloat(premierPriceUnit.toFixed(2)),
            };

            const orderId = await saveOrderIntention(orderData, userId);
            if (!orderId) throw new Error("Falha ao salvar no banco");

            // Feedback + redirecionamento confiável
            feedback.innerHTML = `
                <span style="color:#4CAF50">Tudo certo! Redirecionando para Sympla em 3s...</span><br/>
                <a href="${event.symplaUrl}" target="_blank" rel="noopener" style="color:#00bcd4; text-decoration:underline">
                    Clique aqui se não redirecionar automaticamente
                </a>
            `;

            setTimeout(() => {
                window.location.href = event.symplaUrl; // Redireciona na mesma aba
            }, 3000);

        } catch (err) {
            console.error("Erro no Checkout:", err);
            feedback.innerHTML = '<span style="color:#f44336">Erro ao processar. Tente novamente.</span>';
        } finally {
            // O setProcessing(false) é adiado para dar tempo do redirecionamento
            setTimeout(() => setProcessing(false), 3000); 
        }
    };


    // Loading / Erro
    if (loading || !authReady || !router.isReady) {
        return (
            <div className="loadingContainer">
                <div className="spinner"></div>
                <p className="loadingText">Preparando o checkout...</p>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="errorContainer">
                <h1 className="errorTitle">Evento não encontrado</h1>
                <p style={{color: '#aaa'}}>O link que você acessou pode estar incorreto.</p>
            </div>
        );
    }

    return (
        <div className="detailsContainer">
            <div className="detailCard">
                <h1 className="detailTitle">Checkout Premier Pass</h1>
                <p className="tagline">Finalizando compra para: <strong>{event.name}</strong></p>

                {/* Resumo */}
                <div className="summaryBox">
                    <div className="summaryItem"><span>Preço do Lote (Sympla):</span><span>R$ {basePrice.toFixed(2)}</span></div>
                    <div className="summaryItem"><span>Taxa Premier Pass (5%):</span><span style={{color:'#ffc107'}}>R$ {(premierPriceUnit - basePrice).toFixed(2)}</span></div>
                    <div className="summaryItem"><span>Valor Unitário (Premier):</span><span>R$ {premierPriceUnit.toFixed(2)}</span></div>
                    <div className="summaryItem"><span>Quantidade:</span><span>x {formData.ticketQuantity}</span></div>
                    <div className="summaryTotal"><span>Total a Pagar:</span><span>R$ {totalPrice.toFixed(2)}</span></div>
                </div>

                {/* Formulário */}
                <form onSubmit={handleCheckout}>
                    <div className="formGroup">
                        <label className="formLabel">Nome Completo</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="formInput" />
                    </div>

                    <div className="formGroup">
                        <label className="formLabel">E-mail (envio do ingresso)</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="formInput" />
                    </div>

                    <div className="formGroup grid2">
                        <div className="innerGroup">
                            <label className="formLabel">CPF</label>
                            <input type="text" name="cpf" required placeholder="000.000.000-00" value={formData.cpf} onChange={handleInputChange} className="formInput" maxLength={14} />
                        </div>
                        <div className="innerGroup">
                            <label className="formLabel">Telefone</label>
                            <input type="text" name="phone" required placeholder="(11) 99999-9999" value={formData.phone} onChange={handleInputChange} className="formInput" maxLength={15} />
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="formLabel">Quantidade de Ingressos</label>
                        <select name="ticketQuantity" value={formData.ticketQuantity} onChange={handleInputChange} className="formSelect">
                            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>

                    <p id="buyFeedback" className="feedbackText"></p>

                    <button type="submit" className="buyButton fullWidth" disabled={processing}>
                        {processing ? 'Processando...' : 'Confirmar e Ir para Sympla →'}
                    </button>
                </form>

                <p style={{textAlign:'center', marginTop:'20px', fontSize:'0.8rem', color:'#666'}}>
                    Seus dados ficam salvos para entrega premium do ingresso
                </p>
            </div>

            {/* ESTILOS (Mesmo visual incrível) */}
            <style jsx global>{`
                :root { --accent:#00bcd4; --bg:#121212; --card:#1f1f1f; --text:#e0e0e0; }
                .detailsContainer { min-height:100vh; background:var(--bg); color:var(--text); padding:20px 1rem; display:flex; justify-content:center; }
                .detailCard { background:var(--card); border:1px solid #333; border-radius:16px; padding:40px; max-width:600px; width:100%; box-shadow:0 10px 30px rgba(0,0,0,.5); }
                .detailTitle { font-size:2.8rem; font-weight:800; background:linear-gradient(90deg,#00bcd4,#5c6bc0); -webkit-background-clip:text; color:transparent; }
                .tagline { color:#aaa; border-bottom:1px solid #282828; padding-bottom:15px; margin-bottom:30px; }
                .summaryBox { background:#2a2a2a; padding:20px; border-radius:8px; margin-bottom:25px; border:1px solid #444; }
                .summaryItem { display:flex; justify-content:space-between; margin-bottom:8px; color:#ccc; }
                .summaryTotal { display:flex; justify-content:space-between; margin-top:15px; padding-top:15px; border-top:1px solid #555; font-size:1.3rem; font-weight:bold; color:#4CAF50; }
                .formGroup { margin-bottom: 15px; display:flex; flex-direction:column; gap:5px; }
                .grid2 { display:grid; grid-template-columns:1fr 1fr; gap:15px; }
                .formLabel { color:#aaa; font-size:0.9rem; }
                .formInput, .formSelect { padding:12px; border-radius:6px; border:1px solid #444; background:#1a1a1a; color:#fff; }
                .formSelect {
                    appearance:none;
                    background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23666' viewBox='0 0 24 24'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
                    background-repeat:no-repeat;
                    background-position:right 15px center;
                    background-size:12px;
                }
                .buyButton {
                    margin-top:20px; padding:16px; font-size:1.2rem; font-weight:700; color:#fff;
                    background:linear-gradient(45deg,#00bcd4,#5c6bc0); border:none; border-radius:10px; cursor:pointer;
                    transition:all .3s; box-shadow:0 0 15px rgba(0,188,212,.4);
                }
                .buyButton:hover:not(:disabled) { transform:translateY(-3px); box-shadow:0 0 25px rgba(0,188,212,.6); }
                .buyButton:disabled { background:#444; cursor:not-allowed; transform:none; box-shadow:none; }
                .feedbackText { min-height:40px; text-align:center; margin:10px 0; }
                .loadingContainer, .errorContainer { min-height:80vh; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
                .spinner { width:50px; height:50px; border:5px solid rgba(255,255,255,.1); border-top:5px solid var(--accent); border-radius:50%; animation:spin 1s linear infinite; }
                @keyframes spin { to { transform:rotate(360deg); } }
                @media (max-width:600px) { .detailCard { padding:20px; } .grid2 { grid-template-columns:1fr; } }
            `}</style>
        </div>
    );
}