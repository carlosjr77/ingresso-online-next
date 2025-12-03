import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    serverTimestamp,
    query,
    onSnapshot
} from 'firebase/firestore';

// --- Variáveis globais de Ambiente (Blindadas) ---
export const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
export const sanitizedAppId = appId.replace(/\//g, '_'); 
export const firebaseConfigGlobal = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null; 

// Variáveis de Serviço 
let app = null;
let db = null;
let auth = null;
export let currentUserId = null;
let initialized = false;

// CORREÇÃO BRUTAL: Inicialização só ocorre no browser (lado do cliente)
if (typeof window !== 'undefined' && firebaseConfigGlobal && !initialized) {
    try {
        app = initializeApp(firebaseConfigGlobal);
        db = getFirestore(app);
        auth = getAuth(app);
        initialized = true;
    } catch (e) {
        console.error("Firebase Initialization Failed (Client Side):", e);
    }
}

/**
 * Retorna o serviço de autenticação.
 */
export function getAuthService() {
    return auth;
}

/**
 * Retorna o serviço de banco de dados.
 */
export function getFirestoreService() {
    return db;
}

/**
 * Retorna o usuário logado (não anônimo) em tempo real.
 */
export function getCurrentUser() {
    return auth ? auth.currentUser : null;
}


// --- FUNÇÕES DE AUTENTICAÇÃO E LÓGICA DE USUÁRIO ---

/**
 * Autentica o usuário para acessar dados do Firestore (anônimo ou com token inicial).
 */
export async function authenticateUser() {
    if (!initialized || !auth) {
        return;
    }

    try {
        // Se já tiver um usuário logado (inclusive email/password), não faz nada.
        if (auth.currentUser) {
            currentUserId = auth.currentUser.uid;
            return currentUserId;
        }

        // Tenta usar o token de sessão do Canvas (se existir)
        if (initialAuthToken) { 
            const userCredential = await signInWithCustomToken(auth, initialAuthToken);
            currentUserId = userCredential.user.uid;
        } else {
            // Se não tiver token, faz login anônimo (para acesso básico ao checkout)
            const userCredential = await signInAnonymously(auth);
            currentUserId = userCredential.user.uid;
        }
    } catch (error) {
        console.error("Firebase Auth Error:", error);
    }
    return currentUserId;
}

/**
 * Login de Administrador (Email/Password).
 */
export async function signInAdmin(email, password) {
    if (!auth) {
        throw new Error("Serviço de autenticação não inicializado.");
    }
    // NOTA: Para este exemplo, estamos usando signInWithEmailAndPassword. 
    // Você precisa configurar Email/Password no seu console do Firebase.
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    currentUserId = userCredential.user.uid;
    return userCredential.user;
}

/**
 * Logout do Administrador.
 */
export async function signOutUser() {
    if (!auth) {
        throw new Error("Serviço de autenticação não inicializado.");
    }
    await signOut(auth);
    currentUserId = null;
    // Opcional: Faz login anônimo imediatamente após o logout do admin
    await signInAnonymously(auth); 
}


// --- FUNÇÕES DE FIRESTORE ---

/**
 * Salva a intenção de pedido do cliente no Firestore.
 */
export async function saveOrderIntention(orderData) {
    if (!currentUserId || !db) {
        await authenticateUser(); // Tenta garantir a autenticação
    }
    if (!currentUserId || !db) {
        console.error("Firestore Error: DB not available or User ID not available to save order.");
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

/**
 * Observa os pedidos no Firestore em tempo real.
 */
export function subscribeToOrders(setOrders, userId) {
    if (!userId || !db) {
        console.error("Firestore Error: Cannot subscribe, user ID or DB not ready.");
        return () => {};
    }
    
    const ordersCollectionRef = collection(db, `artifacts/${sanitizedAppId}/users/${userId}/orders`);
    
    const unsubscribe = onSnapshot(query(ordersCollectionRef), (snapshot) => {
        const ordersList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp ? doc.data().timestamp.toDate().toLocaleString('pt-BR') : 'N/A'
        }));
        setOrders(ordersList);
    }, (error) => {
        console.error("Firestore subscription failed:", error);
    });

    return unsubscribe;
}