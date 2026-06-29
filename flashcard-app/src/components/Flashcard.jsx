import { useState, useContext } from "react";
import { FlashcardContext } from "../context/FlashcardContext";

function Flashcard({ card }) {
  const { deleteFlashcard, updateFlashcard } =
    useContext(FlashcardContext);

  const [showAnswer, setShowAnswer] = useState(false);
  const [editing, setEditing] = useState(false);

  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);
  const [category, setCategory] = useState(card.category);

  const handleSave = () => {
    updateFlashcard({
      id: card.id,
      question,
      answer,
      category,
    });

    setEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      {editing ? (
        <>
          <input
            className="border p-2 w-full mb-3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <textarea
            className="border p-2 w-full mb-3"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <select
            className="border p-2 w-full mb-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>React</option>
            <option>Java</option>
            <option>Python</option>
            <option>DBMS</option>
          </select>

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded mr-2"
          >
            Save
          </button>

          <button
            onClick={() => setEditing(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">
            📖 {card.question}
          </h2>

          <span className="inline-block mt-3 bg-blue-100 px-3 py-1 rounded">
            {card.category}
          </span>

          {showAnswer && (
            <p className="mt-4">
              ✅ {card.answer}
            </p>
          )}

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>

          <div className="flex justify-between mt-5">

            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              ✏ Edit
            </button>

            <button
              onClick={() => deleteFlashcard(card.id)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              🗑 Delete
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default Flashcard;