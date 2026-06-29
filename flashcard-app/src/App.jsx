import { useState } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([
    {
      question: "What is the capital of India?",
      answer: "New Delhi",
    },
    {
      question: "What is React?",
      answer: "A JavaScript Library",
    },
    {
      question: "Who developed Python?",
      answer: "Guido van Rossum",
    },
  ]);

  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [editIndex, setEditIndex] = useState(null);

  const nextCard = () => {
    setCurrent((current + 1) % cards.length);
    setShowAnswer(false);
  };

  const prevCard = () => {
    setCurrent((current - 1 + cards.length) % cards.length);
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const addOrUpdateCard = () => {
    if (question.trim() === "" || answer.trim() === "") {
      alert("Please enter Question and Answer.");
      return;
    }

    if (editIndex === null) {
      setCards([...cards, { question, answer }]);
      alert("Flashcard Added Successfully!");
    } else {
      const updatedCards = [...cards];
      updatedCards[editIndex] = { question, answer };
      setCards(updatedCards);
      alert("Flashcard Updated Successfully!");
      setEditIndex(null);
    }

    setQuestion("");
    setAnswer("");
  };

  const editCard = () => {
    setQuestion(cards[current].question);
    setAnswer(cards[current].answer);
    setEditIndex(current);
  };

  const deleteCard = () => {
    if (cards.length === 1) {
      alert("At least one flashcard must remain.");
      return;
    }

    const updated = cards.filter((_, index) => index !== current);

    setCards(updated);
    setCurrent(0);
    setShowAnswer(false);

    alert("Flashcard Deleted!");
  };

  return (
    <div className="container">

      <h1>📚 Flashcard Quiz App</h1>

      <div className="card">

        <h3 className="card-count">
          Card {current + 1} of {cards.length}
        </h3>

        <h2>Question</h2>

        <p>{cards[current].question}</p>

        {showAnswer && (
          <>
            <h2>Answer</h2>
            <p>{cards[current].answer}</p>
          </>
        )}

        <button className="show" onClick={handleShowAnswer}>
          Show Answer
        </button>

        <div className="button-group">

          <button className="blue" onClick={prevCard}>
            Previous
          </button>

          <button className="blue" onClick={nextCard}>
            Next
          </button>

          <button className="orange" onClick={editCard}>
            Edit
          </button>

          <button className="red" onClick={deleteCard}>
            Delete
          </button>

        </div>

      </div>

      <div className="form">

        <h2>
          {editIndex === null ? "Add Flashcard" : "Edit Flashcard"}
        </h2>

        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button className="green" onClick={addOrUpdateCard}>
          {editIndex === null ? "Add Flashcard" : "Update Flashcard"}
        </button>

      </div>

    </div>
  );
}

export default App;