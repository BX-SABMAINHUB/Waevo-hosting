import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración DIRECTA de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD13N4-9MjTrmlPwGP7mves0Exje4v2ACw",
  authDomain: "kahoot-8529e.firebaseapp.com",
  databaseURL: "https://kahoot-8529e-default-rtdb.firebaseio.com",
  projectId: "kahoot-8529e",
  storageBucket: "kahoot-8529e.firebasestorage.app",
  messagingSenderId: "313414356056",
  appId: "1:313414356056:web:4aab4587f7df9393008e2d",
  measurementId: "G-8T4CPC1BQ3"
};

// Inicializar Firebase solo una vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
