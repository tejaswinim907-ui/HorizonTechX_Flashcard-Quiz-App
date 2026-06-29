import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const COLLECTION_NAME = "flashcards";

// Get all flashcards
export const getFlashcards = async () => {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Add flashcard
export const addFlashcard = async (card) => {
  await addDoc(collection(db, COLLECTION_NAME), card);
};

// Delete flashcard
export const deleteFlashcard = async (id) => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};

// Update flashcard
export const updateFlashcard = async (id, card) => {
  await updateDoc(doc(db, COLLECTION_NAME, id), card);
};