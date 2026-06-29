import { useContext, useState } from "react";
import { FlashcardContext } from "../context/FlashcardContext";

import Flashcard from "../components/Flashcard";
import FlashcardForm from "../components/FlashcardForm";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

function Home() {
  const { flashcards } = useContext(FlashcardContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredFlashcards = flashcards.filter((card) => {
    const matchesSearch =
      card.question.toLowerCase().includes(search.toLowerCase()) ||
      card.answer.toLowerCase().includes(search.toLowerCase()) ||
      card.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || card.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        📚 AI Flashcard Quiz
      </h1>

      <FlashcardForm />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlashcards.length > 0 ? (
          filteredFlashcards.map((card) => (
            <Flashcard
              key={card.id}
              card={card}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg">
            No flashcards found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;