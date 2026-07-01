function SearchBar({ search, setSearch }) {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search competitions by title or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;