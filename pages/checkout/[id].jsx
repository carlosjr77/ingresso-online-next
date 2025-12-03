import { useState, useEffect } from 'react';

// --- DADOS MOCKADOS (MOVIDOS PARA FORA PARA O BUILD DO NEXT.JS) ---
const mockEventsData = [
    {
        "id": "show-banda-a",
        "name": "Show de Lançamento - Banda A",
        "date": "15/12/2025",
        "location": "Arena Principal",
        "price": 120.00,
        "symplaUrl": "https://www.sympla.com.br/evento/show-banda-a/simulacao"
    },
    {
        "id": "congresso-tech-2026",
        "name": "Congresso de Tecnologia 2026",
        "date": "20/01/2026",
        "location": "Centro de Convenções",
        "price": 450.00,
        "symplaUrl": "https://www.sympla.com.br/evento/congresso-tech/simulacao"
    },
    {
        "id": "festival-cinema",
        "name": "Festival de Cinema Independente",
        "date": "05/03/2026",
        "location": "Cine Arte",
        "price": 50.00,
        "symplaUrl": "https://www.sympla.com.br/evento/festival-cinema/simulacao"
    },
    {
        "id": "expo-automovel",
        "name": "Expo Automóvel Luxo",
        "date": "10/04/2026",
        "location": "Pavilhão Metropolitano",
        "price": 280.00,
        "symplaUrl": "https://www.sympla.com.br/evento/expo-automovel/simulacao"
    },
    {
        "id": "show-pericles-natanzinho",
        "name": "Péricles e Natanzinho Lima - Folk Valley",
        "date": "20/12/2025",
        "location": "Arena Folk Valley",
        "price": 180.00,
        "symplaUrl": "https://www.sympla.com.br/evento/folk-valley-apresenta-pericles-e-natanzinho-lima/3207294"
    },
    {
        "id": "reveillon-sunset-gigoia",
        "name": "Réveillon Sunset Gigóia - RIO",
        "date": "31/12/2025",
        "location": "Ilha da Gigóia, Barra da Tijuca",
        "price": 600.00, 
        "symplaUrl": "https://www.sympla.com.br/evento/reveillon-sunset-gigoia"
    },
    {
        "id": "reveillon-celebrare-2026",
        "name": "Réveillon Celebrare 2026 - RIO",
        "date": "31/12/2025",
        "location": "Clube Monte Líbano, Lagoa",
        "price": 750.00, 
        "symplaUrl": "https://www.sympla.com.br/evento/reveillon-celebrare-2026"
    },
    {
        "id": "love-sessions-2025",
        "name": "Love Sessions Festival 2025",
        "date": "20/12/2025",
        "location": "Riocentro, Rio de Janeiro",
        "price": 150.00, 
        "symplaUrl": "https://www.sympla.com.br/evento/love-sessions-festival-2025-rio-de-janeiro/1234567"
    }
];

// --- NEXT.JS BUILD FUNCTIONS (CORREÇÃO DE BUILD) ---

// 1. GERA OS CAMINHOS CONHECIDOS
export async function getStaticPaths() {
    const paths = mockEventsData.map((event) => ({
        params: { id: event.id },
    }));

    return { paths, fallback: false }; // fallback: false impede que caminhos desconhecidos sejam criados
}

// 2. CARREGA OS DADOS PARA AQUELES CAMINHOS (Mock data)
export async function getStaticProps({ params }) {
    const event = mockEventsData.find((e) => e.id === params.id);
    
    // Se o evento for encontrado, retorna os dados para serem usados pelo componente.
    if (!event) {
        return { notFound: true };
    }

    return {
        props: {
            // Apenas o evento é passado via props.
            eventData: event,
        },
    };
}


// --- MÓDULOS FIREBASE EMBUTIDOS ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    serverTimestamp 
} from 'firebase/firestore';

// Variáveis de ambiente
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const sanitizedAppId = appId.replace(/\//g, '_'); 

// Inicialização do Firebase e Variáveis de Serviço
let app, db, auth, currentUserId = null;
let initialized = false;

// CORREÇÃO BRUTAL: Só inicializamos o Firebase no LADO DO CLIENTE (browser)
if (typeof window !== 'undefined' && !initialized) {
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    
    try {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
        initialized = true;
    } catch (e) {
        console.error("Firebase Initialization Failed (Client Side):", e);
    }
}

/**
 * Realiza a autenticação do usuário e define o ID do usuário (userId).
 */
async function authenticateUser(setAuthReady) {
    if (!initialized || !auth) {
        setAuthReady(true);
        console.error("Firebase Auth Skipped: Not initialized.");
        return;
    }

    // CORREÇÃO: Usando a referência correta à variável global
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
    
    try {
        if (initialAuthToken) {
            const userCredential = await signInWithCustomToken(auth, initialAuthToken);
            currentUserId = userCredential.user.uid;
        } else {
            const userCredential = await signInAnonymously(auth);
            currentUserId = userCredential.user.uid;
        }
        setAuthReady(true);
    } catch (error) {
        console.error("Firebase Auth Error:", error);
        setAuthReady(true);
    }
}

/**
 * Salva a intenção de pedido do cliente no Firestore.
 */
async function saveOrderIntention(orderData) {
    if (!currentUserId || !db) {
        console.error("Firestore Error: DB not available or User ID not available for saving order.");
        return null;
    }

    const ordersCollectionRef = collection(db, `artifacts/${sanitizedAppId}/users/${currentUserId}/orders`);

    const orderPayload = {
        ...orderData,
        timestamp: serverTimestamp(),
        status: 'PENDING_FULFILLMENT',
    };

    try {
        const docRef = await addDoc(ordersCollectionRef, orderPayload);
        return docRef.id;
    } catch (e) {
        console.error("Error saving order intention:", e);
        return null;
    }
}
// --- FIM DOS MÓDULOS FIREBASE EMBUTIDOS ---

export default function CheckoutPage({ eventData }) { // Recebe eventData diretamente das props
  // Se eventData não for fornecido (não deveria acontecer com fallback: false), usa estado local
  const [event, setEvent] = useState(eventData || null);
  const [loading, setLoading] = useState(false); // Já carregado
  const [processing, setProcessing] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  
  // Estado do Formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    ticketQuantity: 1
  });

  // 1. AUTENTICAÇÃO
  useEffect(() => {
    // Inicia a autenticação do Firebase no lado do cliente
    authenticateUser(setAuthReady);
  }, []);

  // --- LÓGICA DE PREÇO (Sua Margem de Lucro) ---
  const PREMIER_TAX = 0.05; // 5%
  const basePrice = event ? event.price : 0;
  const premierPriceUnit = basePrice * (1 + PREMIER_TAX); // Preço + 5%
  const totalPrice = premierPriceUnit * formData.ticketQuantity;

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'ticketQuantity') {
        value = parseInt(value);
    }
    setFormData({...formData, [e.target.name]: value});
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!authReady || processing || !event) return;

    setProcessing(true);

    try {
      // ... (Lógica de salvamento idêntica à versão anterior) ...
      const orderData = {
        eventId: event.id,
        eventName: event.name,
        customer: {
            name: formData.name,
            email: formData.email,
            cpf: formData.cpf,
            phone: formData.phone
        },
        quantity: formData.ticketQuantity,
        totalPaid: parseFloat(totalPrice.toFixed(2)),
        originalPrice: event.price,
        profitMargin: parseFloat((totalPrice - (event.price * formData.ticketQuantity)).toFixed(2)),
        symplaUrl: event.symplaUrl,
        premierPrice: parseFloat(premierPriceUnit.toFixed(2))
      };
      
      const orderId = await saveOrderIntention(orderData);

      if (orderId) {
        const feedbackElement = document.getElementById('buyFeedback');
        if (feedbackElement) {
             feedbackElement.innerText = "Pedido salvo! Redirecionando para Sympla...";
        }

        if (event.symplaUrl) {
             window.open(event.symplaUrl, '_blank');
        }

        setTimeout(() => {
            window.location.href = '/'; 
        }, 2000);
        
      } else {
        throw new Error("Falha ao salvar o pedido no banco de dados.");
      }

    } catch (error) {
      console.error("Erro no checkout:", error);
      const feedbackElement = document.getElementById('buyFeedback');
      if (feedbackElement) {
          feedbackElement.innerText = "Erro ao processar o pedido. Tente novamente ou verifique sua conexão.";
      }
    } finally {
      setTimeout(() => setProcessing(false), 2000);
    }
  };

  if (!event) return <div className="errorContainer"><h1 className="errorTitle">Evento não encontrado</h1></div>;

  return (
    <div className="detailsContainer">
      <div className="detailCard" style={{maxWidth: '600px', margin: '40px auto'}}>
        <h1 className="detailTitle" style={{fontSize: '2rem'}}>Checkout Premier Pass</h1>
        <p className="tagline">Finalizando compra para: <strong>{event.name}</strong></p>

        {/* Resumo do Pedido */}
        <div className="summaryBox">
          <div className="summaryItem">
            <span>Valor Unitário (Premier):</span>
            <span>R$ {premierPriceUnit.toFixed(2)}</span>
          </div>
          <div className="summaryItem">
            <span>Quantidade:</span>
            <span>x {formData.ticketQuantity}</span>
          </div>
          <div className="summaryTotal">
            <span>Total a Pagar:</span>
            <span>R$ {totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleCheckout} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          <div className="formGroup">
            <label className="formLabel">Nome Completo</label>
            <input 
              type="text" name="name" required 
              value={formData.name} onChange={handleInputChange}
              className="formInput"
            />
          </div>
          
          <div className="formGroup">
            <label className="formLabel">E-mail (Para envio do ingresso)</label>
            <input 
              type="email" name="email" required 
              value={formData.email} onChange={handleInputChange}
              className="formInput"
            />
          </div>

          <div className="formGroup grid2">
             <div className="innerGroup">
                <label className="formLabel">CPF</label>
                <input 
                  type="text" name="cpf" required placeholder="000.000.000-00"
                  value={formData.cpf} onChange={handleInputChange}
                  className="formInput"
                />
             </div>
             <div className="innerGroup">
                <label className="formLabel">Telefone</label>
                <input 
                  type="text" name="phone" required placeholder="(XX) 99999-9999"
                  value={formData.phone} onChange={handleInputChange}
                  className="formInput"
                />
             </div>
          </div>

          <div className="formGroup">
            <label className="formLabel">Quantidade de Ingressos</label>
            <select 
              name="ticketQuantity"
              value={formData.ticketQuantity} onChange={handleInputChange}
              className="formSelect"
            >
              {[1,2,3,4,5,6].map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>
          
          {/* Feedback de erro/sucesso */}
          <p id="buyFeedback" className="feedbackText" style={{textAlign: 'center'}}></p>

          <button 
            type="submit" 
            className="buyButton fullWidth"
            disabled={processing || !authReady}
          >
            {processing ? 'Salvando Pedido...' : 'Confirmar e Pagar (Redireciona Sympla)'}
          </button>
        </form>
        
        <p style={{textAlign: 'center', marginTop: '15px', fontSize: '0.8rem', color: '#666'}}>
          🔒 Seus dados serão salvos para garantir a entrega premium do seu ingresso.
        </p>
      </div>

      {/* --- ESTILOS CSS CONSOLIDADOS PARA CHECKOUT --- */}
      <style jsx global>{`
        /* Cores consistentes */
        :root {
            --accent-color: #00bcd4;
            --text-color: #e0e0e0;
            --bg-color: #121212;
            --card-bg: #1f1f1f;
            --border-color: #333;
        }

        .detailsContainer {
            min-height: 100vh;
            background-color: var(--bg-color);
            color: var(--text-color);
            padding: 20px 1rem 4rem 1rem;
            display: flex;
            justify-content: center;
        }

        .detailCard {
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        
        .detailTitle {
            font-size: 2.8rem;
            font-weight: 800;
            margin-bottom: 10px;
            background: linear-gradient(90deg, #00bcd4, #5c6bc0);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
        }

        .tagline {
            font-size: 1rem;
            color: #aaa;
            margin-bottom: 30px;
            border-bottom: 1px solid #282828;
            padding-bottom: 15px;
        }

        /* Box de Resumo */
        .summaryBox {
          background: #2a2a2a; 
          padding: 20px; 
          border-radius: 8px; 
          margin-bottom: 25px; 
          border: 1px solid #444;
        }
        .summaryItem {
          display: flex; 
          justify-content: space-between; 
          margin-bottom: 8px; 
          color: #ccc;
        }
        .summaryTotal {
          display: flex; 
          justify-content: space-between; 
          margin-top: 15px; 
          padding-top: 15px; 
          border-top: 1px solid #555; 
          font-size: 1.3rem; 
          font-weight: bold; 
          color: #4CAF50;
        }

        /* Estilos do Formulário */
        .formGroup {
            display: flex; 
            flex-direction: column;
            gap: 15px; /* Espaçamento padrão para grupos */
        }
        .grid2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 0;
        }
        .formLabel {
            display: block; 
            margin-bottom: 5px; 
            color: #aaa; 
            font-size: 0.9rem;
        }
        .formInput, .formSelect {
            width: 100%; 
            padding: 12px; 
            border-radius: 6px; 
            border: 1px solid #444; 
            background: #1a1a1a; 
            color: #fff;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.3);
        }
        .formSelect {
            appearance: none; /* Remove seta padrão */
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%23aaa' d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.939l-4.243-4.242L4.343 8z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 15px center;
            background-size: 1em;
        }
        .fullWidth {
            width: 100%;
            margin-top: 20px;
        }

        .buyButton {
            /* Mantendo o estilo do botão de compra da página de detalhes */
            padding: 15px 30px;
            font-size: 1.2rem;
            font-weight: 700;
            color: #fff;
            background: linear-gradient(45deg, #00bcd4, #5c6bc0);
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.4s ease;
            box-shadow: 0 0 10px rgba(0, 188, 212, 0.4);
        }

        .buyButton:hover {
            transform: translateY(-3px);
            box-shadow: 0 0 20px rgba(0, 188, 212, 0.6);
            background: linear-gradient(45deg, #33e5ff, #7f95ff);
        }
        
        .buyButton:disabled {
            background: #444;
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
        }

        .feedbackText {
            color: #ff9800;
        }

        /* Estilos de Carregamento/Erro */
        .loadingContainer, .errorContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
            text-align: center;
        }

        .loadingText {
            color: #aaa;
            margin-top: 15px;
        }

        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top: 4px solid var(--accent-color);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        /* Responsividade */
        @media (max-width: 600px) {
            .detailCard { padding: 20px; }
            .grid2 { grid-template-columns: 1fr; }
            .buyButton { font-size: 1rem; padding: 12px 20px; }
        }

      `}</style>
    </div>
  );
}