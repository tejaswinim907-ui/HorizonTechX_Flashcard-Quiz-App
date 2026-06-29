import { createContext, useEffect, useState } from "react";
import sampleFlashcards from "../data/sampleFlashcards";

export const FlashcardContext = createContext();

export function FlashcardProvider({ children }) {
  const [flashcards, setFlashcards] = useState(() => {
    const saved = localStorage.getItem("flashcards");
    return saved ? JSON.parse(saved) : sampleFlashcards;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [quizAttempts, setQuizAttempts] = useState(() => {
    return Number(localStorage.getItem("quizAttempts")) || 0;
  });

  const [correctAnswers, setCorrectAnswers] = useState(() => {
    return Number(localStorage.getItem("correctAnswers")) || 0;
  });

  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem("quizHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // 💾 persistence
  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("quizAttempts", String(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem("correctAnswers", String(correctAnswers));
  }, [correctAnswers]);

  useEffect(() => {
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
  }, [quizHistory]);

  // 📚 Flashcards
  const addFlashcard = (card) => {
    setFlashcards((prev) => [...prev, card]);
  };

  const deleteFlashcard = (id) => {
    setFlashcards((prev) => prev.filter((c) => c.id !== id));
  };

  const updateFlashcard = (updatedCard) => {
    setFlashcards((prev) =>
      prev.map((c) => (c.id === updatedCard.id ? updatedCard : c))
    );
  };

  // ❤️ Favorites
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // 🎯 Quiz result
  const recordQuizResult = (correct, total) => {
    setQuizAttempts((p) => p + 1);
    setCorrectAnswers((p) => p + correct);

    const entry = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      correct,
      total,
      score: Math.round((correct / total) * 100),
    };

    setQuizHistory((prev) => [entry, ...prev]);
  };

  // 🧠 FIXED: spaced repetition tracking
  const updateCardPerformance = (id, isCorrect) => {
    setFlashcards((prev) =>
      prev.map((card) => {
        if (card.id !== id) return card;

        return {
          ...card,
          correctCount: (card.correctCount || 0) + (isCorrect ? 1 : 0),
          wrongCount: (card.wrongCount || 0) + (!isCorrect ? 1 : 0),
          lastReviewed: new Date().toISOString(),
        };
      })
    );
  };

  return (
    <FlashcardContext.Provider
      value={{
        flashcards,
        addFlashcard,
        deleteFlashcard,
        updateFlashcard,

        favorites,
        toggleFavorite,

        quizAttempts,
        correctAnswers,
        quizHistory,
        recordQuizResult,

        updateCardPerformance,
      }}
    >
      {children}
    </FlashcardContext.Provider>
  );
}