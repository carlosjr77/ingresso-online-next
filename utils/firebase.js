import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    serverTimestamp,
    query,
    onSnapshot
} from 'firebase/firestore';

// --- Variáveis globais fornecidas pelo ambiente ---
// O app ID (usado para isolar dados de diferentes projetos no Canvas)
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// A configuração do Firebase (precisa ser parseada de string para objeto)
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
// O token de autenticação inicial para login
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let currentUserId = null;

/**
 * Realiza a autenticação do usuário e define o ID do usuário (userId).
 * Garante que currentUserId seja definido.
 */
export async function authenticateUser() {
    try {
        if (initialAuthToken) {
            const userCredential = await signInWithCustomToken(auth, initialAuthToken);
            currentUserId = userCredential.user.uid;
        } else {
            const userCredential = await signInAnonymously(auth);
            currentUserId = userCredential.user.uid;
        }
        // console.log("Firebase: Autenticação concluída. User ID:", currentUserId);
    } catch (error) {
        console.error("Firebase Auth Error:", error);
    }
}

// Chama a autenticação assim que o módulo é carregado (importado)
authenticateUser();

/**
 * Salva a intenção de pedido do cliente no Firestore.
 * @param {object} orderData - Dados do pedido (evento, cliente, etc.)
 */
export async function saveOrderIntention(orderData) {
    // Garante que a autenticação tenha sido tentada e o ID esteja disponível
    if (!currentUserId) {
        await authenticateUser();
    }
    if (!currentUserId) {
        console.error("Firestore Error: User not authenticated, cannot save order.");
        return null;
    }

    // Coleção: artifacts/{appId}/users/{userId}/orders
    const ordersCollectionRef = collection(db, `artifacts/${appId}/users/${currentUserId}/orders`);

    const orderPayload = {
        ...orderData,
        timestamp: serverTimestamp(),
        status: 'PENDING_FULFILLMENT', // Pedido aguardando follow-up e compra na Sympla
    };

    try {
        const docRef = await addDoc(ordersCollectionRef, orderPayload);
        console.log("Order intention saved to Firestore with ID:", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error saving order intention:", e);
        return null;
    }
}

/**
 * Observa os pedidos no Firestore em tempo real (para a página de Admin).
 * Usa onAuthStateChanged para garantir que a subscrição só ocorra após a autenticação.
 */
export function subscribeToOrders(setOrders) {
    let unsubscribeFirestore = () => {};

    // Usa o listener de autenticação para garantir que currentUserId esteja definido
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user && user.uid === currentUserId) {
            // Garante que a subscrição só seja feita após a autenticação
            const ordersCollectionRef = collection(db, `artifacts/${appId}/users/${currentUserId}/orders`);
            
            // Cancela a subscrição anterior antes de criar a nova (em caso de re-autenticação)
            unsubscribeFirestore();

            // Configura o listener em tempo real
            unsubscribeFirestore = onSnapshot(query(ordersCollectionRef), (snapshot) => {
                const ordersList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    // Converte timestamp para data legível para o Admin
                    timestamp: doc.data().timestamp ? doc.data().timestamp.toDate().toLocaleString('pt-BR') : 'N/A'
                }));
                setOrders(ordersList);
            }, (error) => {
                console.error("Firestore subscription failed:", error);
            });
        } else if (!user) {
            // Limpa os pedidos se o usuário for desautenticado (apesar de improvável aqui)
            setOrders([]); 
            unsubscribeFirestore();
            console.error("Firestore Error: User logged out, subscription terminated.");
        }
    });

    // Retorna uma função que cancela ambos os listeners (Auth e Firestore)
    return () => {
        unsubscribeAuth();
        unsubscribeFirestore();
    };
}

export { auth, db };