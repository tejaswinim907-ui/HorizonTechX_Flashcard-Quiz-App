import { useState, useContext } from "react";
import { FlashcardContext } from "../context/FlashcardContext";

function FlashcardForm() {
  const { addFlashcard } = useContext(FlashcardContext);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("React");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const newCard = {
      id: Date.now(),
      question,
      answer,
      category,
    };

    addFlashcard(newCard);

    setQuestion("");
    setAnswer("");
    setCategory("React");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-lg mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">
        ➕ Add Flashcard
      </h2>

      {/* Question */}
      <input
        type="text"
        placeholder="Enter Question"
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {/* Answer */}
      <textarea
        placeholder="Enter Answer"
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="4"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      {/* Category */}
      <select
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="React">React</option>
        <option value="Java">Java</option>
        <option value="Python">Python</option>
        <option value="DBMS">DBMS</option>
        <option value="AI">AI</option>
        <option value="Machine Learning">Machine Learning</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Add Flashcard
      </button>
    </form>
  );
}

export default FlashcardForm;