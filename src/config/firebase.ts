import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBF7RmbjynKOIZdbb9rDZQVm8iJoLqqmeE",
  authDomain: "chatbot-59c57.firebaseapp.com",
  projectId: "chatbot-59c57",
  storageBucket: "chatbot-59c57.firebasestorage.app",
  messagingSenderId: "279230031171",
  appId: "1:279230031171:web:794ebb07de7aec0301fbf6",
  measurementId: "G-6GS6S7GT9P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);