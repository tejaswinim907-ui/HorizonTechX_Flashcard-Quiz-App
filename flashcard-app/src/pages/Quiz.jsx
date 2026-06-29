import { useContext, useState, useMemo } from "react";
import { FlashcardContext } from "../context/FlashcardContext";

export default function Quiz() {
  const {
    flashcards,
    recordQuizResult,
    updateCardPerformance,
  } = useContext(FlashcardContext);

  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!flashcards || flashcards.length === 0) {
    return <h2>No flashcards available</h2>;
  }

  const current = flashcards[index];

  const progress = Math.round((index / flashcards.length) * 100);

  const next = (isCorrect) => {
    const newScore = isCorrect ? score + 1 : score;
    const nextIndex = index + 1;

    setScore(newScore);

    if (nextIndex < flashcards.length) {
      setIndex(nextIndex);
      setShowAnswer(false);
    } else {
      setFinished(true);
      recordQuizResult(newScore, flashcards.length);
    }
  };

  const handleCorrect = () => {
    updateCardPerformance(current.id, true);
    next(true);
  };

  const handleWrong = () => {
    updateCardPerformance(current.id, false);
    next(false);
  };

  if (finished) {
    return (
      <div style={styles.center}>
        <h1>🎉 Finished</h1>
        <h2>
          Score: {score} / {flashcards.length}
        </h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Progress */}
      <div style={styles.bar}>
        <div style={{ ...styles.fill, width: `${progress}%` }} />
      </div>

      <p>
        {index + 1} / {flashcards.length}
      </p>

      {/* Card */}
      <div style={styles.card}>
        <h2>{current.question}</h2>

        {showAnswer && <p>{current.answer}</p>}

        <button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? "Hide" : "Show"} Answer
        </button>
      </div>

      {/* Buttons */}
      <div style={styles.row}>
        <button onClick={handleWrong} style={styles.wrong}>
          ✖ Wrong
        </button>

        <button onClick={handleCorrect} style={styles.correct}>
          ✔ Correct
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 20, maxWidth: 600, margin: "auto" },
  card: {
    padding: 20,
    background: "#fff",
    borderRadius: 10,
    marginTop: 10,
  },
  row: {
    display: "flex",
    gap: 10,
    marginTop: 20,
  },
  correct: {
    flex: 1,
    background: "green",
    color: "#fff",
    padding: 10,
    border: "none",
  },
  wrong: {
    flex: 1,
    background: "red",
    color: "#fff",
    padding: 10,
    border: "none",
  },
  bar: {
    height: 8,
    background: "#eee",
    borderRadius: 10,
  },
  fill: {
    height: "100%",
    background: "#4f46e5",
  },
  center: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};