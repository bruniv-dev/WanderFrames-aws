import React from "react";
import "./Search.css";
import { FaSearch } from "react-icons/fa";

const Search = ({
  cardsData,
  setFilteredCards,
  searchTerm,
  setSearchTerm,
  additionalFields = [],
  filterCategory,
  setFilterCategory,
  showCategoryFilter = false,
}) => {
  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term === "") {
      setFilteredCards(cardsData);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const filtered = cardsData.filter((card) => {
        const defaultMatches = [
          card.username || "",
          card.location || "",
          card.subLocation || "",
          card.firstName || "",
          card.lastName || "",
          `${card.firstName} ${card.lastName}` || "",
        ].some((field) => field.toLowerCase().includes(lowercasedTerm));

        const additionalMatches = additionalFields.some((field) =>
          (card[field] || "").toLowerCase().includes(lowercasedTerm)
        );

        return defaultMatches || additionalMatches;
      });
      setFilteredCards(filtered);
    }
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by username, name, location, or sublocation"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {showCategoryFilter && (
        <select
          className="role-select"
          value={filterCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      )}

      <FaSearch
        className="search-icon"
        onClick={() => handleSearch(searchTerm)}
      >
        Search
      </FaSearch>
    </div>
  );
};

export default Search;
