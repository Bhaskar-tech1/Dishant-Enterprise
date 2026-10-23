import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDv4Cl3tSAuuSnTfXnwBr8DhIyiBGrr82E',
  authDomain: 'dishanth-enterprise.firebaseapp.com',
  projectId: 'dishanth-enterprise',
  storageBucket: 'dishanth-enterprise.firebasestorage.app',
  messagingSenderId: '746915113711',
  appId: '1:746915113711:web:41bd20b38983b2f281c91a',
  measurementId: 'G-GBXCYQ9L8W',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const clientDb = getFirestore(app);
