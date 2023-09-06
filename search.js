// Search.js
import React, { useState } from "react";

function Search({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    const [searchProfession, searchLocation] = searchText.split(",");
    onSearch(searchProfession.trim(), searchLocation.trim());
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by profession, location"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
