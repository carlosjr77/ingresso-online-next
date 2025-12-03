// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase com suas chaves reais
const firebaseConfig = {
  apiKey: "AIzaSyBoXn4anFk8kBTf77XMsvKLvJ-vWS3nOg8",
  authDomain: "premierpass-5a3c2.firebaseapp.com",
  projectId: "premierpass-5a3c2",
  storageBucket: "premierpass-5a3c2.firebasestorage.app",
  messagingSenderId: "39450381142",
  appId: "1:39450381142:web:8e636f190811920070a4f7",
  measurementId: "G-ZJZ362D6JR"
};

// Evita inicializar múltiplas vezes no Next.js (Singleton pattern)
// Isso é crucial para evitar erros durante o desenvolvimento (hot reload)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { db };