import { useState, useEffect } from 'react';

// --- MÓDULOS FIREBASE EMBUTIDOS ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    query,
    onSnapshot
} from 'firebase/firestore';

// --- Variáveis globais fornecidas pelo ambiente ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// CORREÇÃO CRÍTICA: Sanitiza o appId, removendo barras que causavam o erro de caminho do Firestore (6 segmentos)
const sanitizedAppId = appId.replace(/\//g, '_'); 

const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Inicialização do Firebase (globalmente, fora do componente)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// --- FIM DOS MÓDULOS FIREBASE EMBUTIDOS ---


export default function AdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [authReady, setAuthReady] = useState(false);

    // 1. Efeito para lidar com a Autenticação
    useEffect(() => {
        let unsubscribeAuth = () => {};
        
        // Função para iniciar o login (anônimo ou com token)
        async function initialAuth() {
             try {
                if (initialAuthToken) {
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    await signInAnonymously(auth);
                }
             } catch(error) {
                 console.error("Auth failed:", error);
             }
        }
        
        // Inicia o processo de login
        initialAuth();

        // O listener onAuthStateChanged é mais confiável para pegar o UID final
        unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } 
            setAuthReady(true);
        });

        return () => unsubscribeAuth();
    }, []);

    // 2. Efeito para Subscrever os Pedidos (só executa após a Autenticação)
    useEffect(() => {
        // Só tenta se a autenticação já tiver ocorrido E o userId estiver definido
        if (!authReady || !userId) return;

        console.log("Starting Firestore subscription for UID:", userId);
        
        // Caminho da Coleção CORRIGIDO: usa o appId sanitizado
        // Estrutura correta: artifacts/DOC_ID_SANITIZADO/users/UID_DOCUMENT/orders
        const ordersCollectionRef = collection(db, `artifacts/${sanitizedAppId}/users/${userId}/orders`);
        
        // Configura o listener em tempo real (onSnapshot)
        const unsubscribeFirestore = onSnapshot(query(ordersCollectionRef), (snapshot) => {
            const ordersList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Converte timestamp para data legível para o Admin
                timestamp: doc.data().timestamp ? doc.data().timestamp.toDate().toLocaleString('pt-BR') : 'N/A'
            }));
            setOrders(ordersList);
            setLoading(false);
        }, (error) => {
            console.error("Firestore subscription failed:", error);
            setLoading(false);
        });

        // Cleanup: Desinscreve-se do Firestore quando o componente desmontar
        return () => unsubscribeFirestore();
    }, [authReady, userId]); // Depende do estado de Auth e do ID

    
    // Função para formatar o preço em Reais
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };
    
    // Calcula o total de lucro pendente na tela
    const totalProfit = orders.reduce((sum, order) => sum + (order.profitMargin || 0), 0);
    
    if (loading || !authReady) {
        return (
            <div className="loadingContainer">
                <div className="spinner"></div>
                <h1 className="loadingTitle">Carregando Painel de Administração...</h1>
                <p className="loadingText">Conectando ao Firebase em tempo real.</p>
            </div>
        );
    }
    
    // --- CSS do Painel de Administração como string para evitar warnings ---
    const adminStyles = `
        :root {
            --accent-color: #00bcd4;
            --text-color: #e0e0e0;
            --bg-color: #121212;
            --card-bg: #1f1f1f;
            --border-color: #333;
            --success-color: #4CAF50;
            --pending-color: #FFC107;
        }

        /* Layout Geral */
        .adminContainer {
            max-width: 1400px;
            margin: 0 auto;
            padding: 4rem 1rem;
            min-height: 100vh;
            background-color: var(--bg-color);
            color: var(--text-color);
        }
        .adminTitle {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
            color: var(--accent-color);
        }
        .adminSubtitle {
            font-size: 1.1rem;
            color: #aaa;
            margin-bottom: 2rem;
        }
        .profitHighlight {
            color: var(--success-color);
            font-weight: bold;
            margin-left: 8px;
        }
        .userIdDisplay {
            margin-top: 30px;
            font-size: 0.8rem;
            color: #555;
        }

        /* Tabela de Pedidos */
        .ordersTableContainer {
            overflow-x: auto;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
        }
        .ordersTable {
            width: 100%;
            border-collapse: collapse;
            min-width: 800px; /* Garante que a tabela não seja muito espremida em telas menores */
        }

        .ordersTable th, .ordersTable td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }

        .ordersTable th {
            background-color: #282828;
            color: var(--accent-color);
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.9rem;
        }

        .ordersTable td {
            background-color: var(--card-bg);
            color: var(--text-color);
            vertical-align: top;
            font-size: 0.95rem;
        }
        
        .ordersTable tr:hover td {
            background-color: #252525;
        }

        .eventName {
            font-weight: 600;
            color: #fff;
        }

        .profitMargin {
            font-weight: bold;
            color: var(--success-color);
        }

        /* Tags de Status */
        .statusTag {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: bold;
            text-transform: uppercase;
        }
        .status-pending_fulfillment {
            background-color: var(--pending-color);
            color: #333;
        }
        .status-fulfilled { /* Se você adicionar lógica de "cumprido" */
            background-color: var(--success-color);
            color: #fff;
        }

        /* Botão de Ação */
        .actionButton {
            display: inline-block;
            padding: 8px 12px;
            background-color: #5c6bc0;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 600;
            transition: background-color 0.3s;
        }
        .actionButton:hover {
            background-color: #7986cb;
        }
        
        .noOrdersMessage {
            padding: 40px;
            text-align: center;
            background-color: #282828;
            border-radius: 8px;
            border: 1px solid var(--accent-color);
            color: #fff;
        }

        /* Responsividade para Tabelas (Mobile) */
        @media (max-width: 768px) {
            .ordersTable, .ordersTable thead, .ordersTable tbody, .ordersTable th, .ordersTable td, .ordersTable tr {
                display: block;
            }

            .ordersTable thead tr {
                position: absolute;
                top: -9999px;
                left: -9999px;
            }

            .ordersTable tr {
                margin-bottom: 15px;
                border: 1px solid var(--accent-color);
                border-radius: 8px;
                overflow: hidden;
            }

            .ordersTable td {
                border: none;
                position: relative;
                padding-left: 50%; 
                text-align: right;
            }

            .ordersTable td:before {
                content: attr(data-label);
                position: absolute;
                left: 10px;
                width: 45%; 
                padding-right: 10px;
                white-space: nowrap;
                text-align: left;
                font-weight: bold;
                color: var(--accent-color);
            }

            .adminTitle { font-size: 2rem; }
        }
    `;
    
    return (
        <div className="adminContainer">
            <h1 className="adminTitle">Painel de Administração Premier Pass</h1>
            <p className="adminSubtitle">Leads capturados em tempo real (Total de Lucro Pendente: 
                <span className="profitHighlight">{formatCurrency(totalProfit)}</span>)
            </p>

            <p className="userIdDisplay">Seu ID de Usuário para Pedidos (Referência do Firestore): {userId || 'Aguardando autenticação...'}</p>

            {orders.length === 0 ? (
                <div className="noOrdersMessage">
                    <p>Nenhum pedido de ingresso capturado ainda. Compartilhe o link do seu site!</p>
                </div>
            ) : (
                <div className="ordersTableContainer">
                    <table className="ordersTable">
                        <thead>
                            <tr>
                                <th>ID Pedido</th>
                                <th>Data/Hora</th>
                                <th>Evento</th>
                                <th>Cliente</th>
                                <th>Status</th>
                                <th>Qtd.</th>
                                <th>Lucro (5%)</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td data-label="ID Pedido">{order.id.substring(0, 8)}...</td>
                                    <td data-label="Data/Hora">{order.timestamp}</td>
                                    <td data-label="Evento" className="eventName">{order.eventName}</td>
                                    <td data-label="Cliente">
                                        {order.customer.name}<br/>
                                        <small>{order.customer.email}</small>
                                    </td>
                                    <td data-label="Status">
                                        <span className={`statusTag status-${order.status.toLowerCase()}`}>
                                            {order.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td data-label="Qtd.">{order.quantity}</td>
                                    <td data-label="Lucro" className="profitMargin">
                                        {formatCurrency(order.profitMargin)}
                                    </td>
                                    <td data-label="Ação">
                                        <a 
                                            href={order.symplaUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="actionButton"
                                        >
                                            Completar Sympla &rarr;
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            {/* CORREÇÃO: Usando dangerouslySetInnerHTML para injetar o CSS, evitando o warning. */}
            <style dangerouslySetInnerHTML={{ __html: adminStyles }} />
        </div>
    );
}