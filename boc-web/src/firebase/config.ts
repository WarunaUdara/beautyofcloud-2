import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdyGTbvIruNH_vjwSo4N90fFVqtT0vCk4",
  authDomain: "boc-web-a1a9f.firebaseapp.com",
  projectId: "boc-web-a1a9f",
  storageBucket: "boc-web-a1a9f.firebasestorage.app",
  messagingSenderId: "705127827058",
  appId: "1:705127827058:web:561a78bf06fdf929b0a4eb"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
