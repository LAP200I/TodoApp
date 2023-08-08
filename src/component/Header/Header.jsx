import "./Header.css";

export default function Header({ searchQuery, setSearchQuery }) {
  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="header">
      <h1>Todo List</h1>
      <div className="form-row">
        <input
          type="text"
          id="search"
          placeholder="Search todo items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          className="btn btn-clear"
          onClick={handleClear}
          title="Clear inputs"
        >
          {/* clear icon */}
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}
