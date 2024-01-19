import React from "react";
//Search Functionality
const Search = ({ searchQuery, handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearch}
      className="search-input"
    />
  );
};

export default Search;
