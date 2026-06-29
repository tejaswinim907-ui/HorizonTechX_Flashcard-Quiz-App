function CategoryFilter({ category, setCategory }) {
  return (
    <select
      className="w-full p-3 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="All">All Categories</option>
      <option value="React">React</option>
      <option value="Java">Java</option>
      <option value="Python">Python</option>
      <option value="DBMS">DBMS</option>
    </select>
  );
}

export default CategoryFilter;