// import React from "react";
// import "./Search.css";

// const Search = ({ searchTerm, setSearchTerm, handleSearch }) => {
//   return (
//     <div className="search-container">
//       <input
//         type="text"
//         placeholder="Search by username, name, location, or sublocation"
//         value={searchTerm}
//         onChange={(e) => {
//           setSearchTerm(e.target.value);
//           handleSearch(e.target.value);
//         }}
//       />
//       <button onClick={() => handleSearch(searchTerm)}>Search</button>
//     </div>
//   );
// };

// export default Search;

// import "./Search.css";

// const Search = ({ cardsData, setFilteredCards, searchTerm, setSearchTerm }) => {
//   const handleSearch = (term) => {
//     setSearchTerm(term);

//     if (term === "") {
//       setFilteredCards(cardsData);
//     } else {
//       const lowercasedTerm = term.toLowerCase();
//       const filtered = cardsData.filter((card) => {
//         const userName = card.userName || "";
//         const location = card.location || "";
//         const subLocation = card.subLocation || "";
//         const firstName = card.firstName || "";
//         const lastName = card.lastName || "";
//         const fullName = `${card.firstName} ${card.lastName}` || "";
//         return (
//           userName.toLowerCase().includes(lowercasedTerm) ||
//           firstName.toLowerCase().includes(lowercasedTerm) ||
//           lastName.toLowerCase().includes(lowercasedTerm) ||
//           location.toLowerCase().includes(lowercasedTerm) ||
//           subLocation.toLowerCase().includes(lowercasedTerm) ||
//           fullName.toLowerCase().includes(lowercasedTerm)
//         );
//       });
//       setFilteredCards(filtered);
//     }
//   };

//   return (
//     <div className="search-container">
//       <input
//         type="text"
//         placeholder="Search by username, name, location, or sublocation"
//         value={searchTerm}
//         onChange={(e) => handleSearch(e.target.value)}
//       />
//       <button onClick={() => handleSearch(searchTerm)}>Search</button>
//     </div>
//   );
// };

// export default Search;

// import React from "react";
// import "./Search.css";
// import { FaSearch } from "react-icons/fa";

// const Search = ({
//   cardsData,
//   setFilteredCards,
//   searchTerm,
//   setSearchTerm,
//   additionalFields = [],
// }) => {
//   const handleSearch = (term) => {
//     setSearchTerm(term);

//     if (term === "") {
//       setFilteredCards(cardsData);
//     } else {
//       const lowercasedTerm = term.toLowerCase();
//       const filtered = cardsData.filter((card) => {
//         const defaultMatches = [
//           card.username || "",
//           card.location || "",
//           card.subLocation || "",
//           card.firstName || "",
//           card.lastName || "",
//           `${card.firstName} ${card.lastName}` || "",
//         ].some((field) => field.toLowerCase().includes(lowercasedTerm));

//         const additionalMatches = additionalFields.some((field) =>
//           (card[field] || "").toLowerCase().includes(lowercasedTerm)
//         );

//         return defaultMatches || additionalMatches;
//       });
//       setFilteredCards(filtered);
//     }
//   };

//   return (
//     <div className="search-container">
//       <input
//         type="text"
//         placeholder="Search by username, name, location, or sublocation"
//         value={searchTerm}
//         onChange={(e) => handleSearch(e.target.value)}
//       />
//       <FaSearch
//         className="search-icon"
//         onClick={() => handleSearch(searchTerm)}
//       >
//         Search
//       </FaSearch>
//     </div>
//   );
// };

// export default Search;

// import React from "react";
// import "./Search.css";
// import { FaSearch } from "react-icons/fa";

// const Search = ({
//   cardsData,
//   setFilteredCards,
//   searchTerm,
//   setSearchTerm,
//   additionalFields = [],
//   filterCategory,
//   setFilterCategory,
//   showCategoryFilter = false,
// }) => {
//   const handleSearch = (term) => {
//     setSearchTerm(term);

//     if (term === "") {
//       setFilteredCards(cardsData);
//     } else {
//       const lowercasedTerm = term.toLowerCase();
//       const filtered = cardsData.filter((card) => {
//         const defaultMatches = [
//           card.username || "",
//           card.location || "",
//           card.subLocation || "",
//           card.firstName || "",
//           card.lastName || "",
//           `${card.firstName} ${card.lastName}` || "",
//         ].some((field) => field.toLowerCase().includes(lowercasedTerm));

//         const additionalMatches = additionalFields.some((field) =>
//           (card[field] || "").toLowerCase().includes(lowercasedTerm)
//         );

//         return defaultMatches || additionalMatches;
//       });
//       setFilteredCards(filtered);
//     }
//   };

//   const handleCategoryChange = (e) => {
//     setFilterCategory(e.target.value);
//   };

//   return (
//     <div className="search-container">
//       <input
//         type="text"
//         placeholder="Search by username, name, location, or sublocation"
//         value={searchTerm}
//         onChange={(e) => handleSearch(e.target.value)}
//       />

//       <select
//         className="role-select"
//         value={filterCategory}
//         onChange={handleCategoryChange}
//       >
//         <option value="all">All</option>
//         <option value="admin">Admin</option>
//         <option value="user">User</option>
//       </select>

//       <FaSearch
//         className="search-icon"
//         onClick={() => handleSearch(searchTerm)}
//       >
//         Search
//       </FaSearch>
//     </div>
//   );
// };

// export default Search;

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
