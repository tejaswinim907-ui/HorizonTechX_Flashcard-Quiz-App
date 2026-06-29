import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAbERG2ViRnN8g3jxMHX9zHta9wDngSkHk",
  authDomain: "ai-flashcard-quiz-62e46.firebaseapp.com",
  projectId: "ai-flashcard-quiz-62e46",
  storageBucket: "ai-flashcard-quiz-62e46.firebasestorage.app",
  messagingSenderId: "719468381269",
  appId: "1:719468381269:web:96cb97d4e6610b840200dc",
  measurementId: "G-P7HBW0GL8H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics (only works in the browser)
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;