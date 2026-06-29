import { useContext, useMemo } from "react";
import { FlashcardContext } from "../context/FlashcardContext";

export default function Dashboard() {
  const {
    flashcards,
    favorites,
    quizAttempts,
    correctAnswers,
  } = useContext(FlashcardContext);

  // Calculate accuracy safely
  const accuracy = useMemo(() => {
    if (quizAttempts === 0) return 0;
    return Math.round((correctAnswers / quizAttempts) * 100);
  }, [quizAttempts, correctAnswers]);

  // Category breakdown
  const categoryStats = useMemo(() => {
    const stats = {};

    flashcards.forEach((card) => {
      const category = card.category || "Uncategorized";
      stats[category] = (stats[category] || 0) + 1;
    });

    return stats;
  }, [flashcards]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Dashboard</h1>

      {/* Stats Cards */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h2>📚 Flashcards</h2>
          <p style={styles.number}>{flashcards.length}</p>
        </div>

        <div style={styles.card}>
          <h2>❤️ Favorites</h2>
          <p style={styles.number}>{favorites.length}</p>
        </div>

        <div style={styles.card}>
          <h2>🎯 Quiz Attempts</h2>
          <p style={styles.number}>{quizAttempts}</p>
        </div>

        <div style={styles.card}>
          <h2>📈 Accuracy</h2>
          <p style={styles.number}>{accuracy}%</p>
        </div>
      </div>

      {/* Category Section */}
      <div style={styles.section}>
        <h2>📂 Categories</h2>

        {Object.keys(categoryStats).length === 0 ? (
          <p>No flashcards available</p>
        ) : (
          <div style={styles.categoryGrid}>
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} style={styles.categoryCard}>
                <h3>{category}</h3>
                <p>{count} cards</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* Inline Styles (simple modern UI) */
const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "30px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  number: {
    fontSize: "24px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  section: {
    marginTop: "20px",
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "10px",
    marginTop: "10px",
  },
  categoryCard: {
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
  },
};