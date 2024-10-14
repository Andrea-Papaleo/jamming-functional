import React, { useState } from "react";
import "./SearchBar.css";

export const SearchBar = ({
  onSearch,
}: {
  onSearch: (searchTerm: string) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInput = (newTerm: string) => {
    setSearchTerm(newTerm);
  };

  const handleSumbit = () => {
    onSearch(searchTerm);
  };
  return (
    <div className="searchBar-container">
      <input
        value={searchTerm}
        className="search-input"
        placeholder="Enter a Song Title"
        onChange={(e) => handleInput(e.target.value)}
      />
      <button className="search-button" onClick={handleSumbit}>
        SEARCH
      </button>
    </div>
  );
};
