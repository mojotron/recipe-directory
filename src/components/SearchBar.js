import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/SearchBar.css";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchValue}`);
  };

  return (
    <form className="SearchBar" aria-label="form" onSubmit={handleSubmit}>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </form>
  );
};

export default SearchBar;
