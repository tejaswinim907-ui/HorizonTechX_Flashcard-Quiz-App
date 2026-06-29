function CategoryCard({ title, emoji }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer">

      <div className="text-5xl">
        {emoji}
      </div>

      <h2 className="text-2xl font-bold mt-5">
        {title}
      </h2>

    </div>
  );
}

export default CategoryCard;