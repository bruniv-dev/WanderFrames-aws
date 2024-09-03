// import React, { useState, useEffect } from "react";
// import "./Favorites.css";
// import CardLayout from "../Card-layout/cardLayout";
// import Header from "../Header/header";
// import {
//   fetchFavorites,
//   fetchUserDetailsByToken,
// } from "../api-helpers/helpers";
// import Loading from "../Loading/Loading";

// const Favorites = () => {
//   const [favorites, setFavorites] = useState([]);
//   const [filteredFavorites, setFilteredFavorites] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch user's favorite posts
//   const refreshFavorites = async () => {
//     try {
//       setLoading(true);
//       const tokenData = await fetchUserDetailsByToken();
//       const userId = tokenData.userId;

//       const data = await fetchFavorites(userId);
//       const favoritesList = data.favorites;

//       setFavorites(favoritesList);
//       setFilteredFavorites(favoritesList);
//     } catch (err) {
//       setError("Error fetching favorites. Please try again.");
//       console.error("Error fetching favorites:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     refreshFavorites();
//   }, []);

//   // Handle search
//   const handleSearch = (term) => {
//     const lowercasedTerm = term.toLowerCase();
//     const filtered = favorites.filter((favorite) => {
//       const location = favorite.location || "";
//       const subLocation = favorite.subLocation || "";
//       return (
//         location.toLowerCase().includes(lowercasedTerm) ||
//         subLocation.toLowerCase().includes(lowercasedTerm)
//       );
//     });
//     setFilteredFavorites(filtered);
//   };

//   if (error) {
//     return <div className="favorites-container">{error}</div>;
//   }

//   return (
//     <>
//       {loading && <Loading />}
//       <Header
//         classNameheader="favorites-header"
//         classNamelogo="favorites-logo"
//         classNamenav="favorites-nav"
//         classNamesignin="favorites-signin"
//       />
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by location or sublocation"
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             handleSearch(e.target.value);
//           }}
//         />
//         <button onClick={() => handleSearch(searchTerm)}>Search</button>
//       </div>
//       <div className="favorites-container">
//         {filteredFavorites.length === 0 ? (
//           <div className="no-favorites-message">No favorites added yet.</div>
//         ) : (
//           <CardLayout
//             cardsData={filteredFavorites}
//             onFavoriteToggle={refreshFavorites}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default Favorites;

import React, { useState, useEffect } from "react";
import "./Favorites.css";
import CardLayout from "../Card-layout/cardLayout";
import Header from "../Header/header";
import {
  fetchFavorites,
  fetchUserDetailsByToken,
  fetchUserDetailsById,
} from "../api-helpers/helpers";
import Loading from "../Loading/Loading";
import Search from "../Search/Search";
import Footer from "../footer/footer";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's favorite posts with user details
  const refreshFavorites = async () => {
    try {
      setLoading(true);
      const tokenData = await fetchUserDetailsByToken();
      const userId = tokenData.userId;

      const data = await fetchFavorites(userId);
      const favoritesList = data.favorites;

      // Fetch user details for each favorite post
      const favoritesWithUserNames = await Promise.all(
        favoritesList.map(async (favorite) => {
          try {
            const user = await fetchUserDetailsById(favorite.user);
            return {
              ...favorite,
              username: user.username || "Unknown",
              firstName: user.firstName || "Unknown",
              lastName: user.lastName || "Unknown",
            };
          } catch {
            return {
              ...favorite,
              username: "Unknown",
              firstName: "Unknown",
              lastName: "Unknown",
            };
          }
        })
      );

      setFavorites(favoritesWithUserNames);
      setFilteredFavorites(favoritesWithUserNames);
    } catch (err) {
      setError("Error fetching favorites. Please try again.");
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshFavorites();
  }, []);

  if (error) {
    return <div className="favorites-container">{error}</div>;
  }

  return (
    <>
      {loading && <Loading />}
      <Header
        classNameheader="favorites-header"
        classNamelogo="favorites-logo"
        classNamenav="favorites-nav"
        classNamesignin="favorites-signin"
        logoSrc={`Logo_black_Green.svg`}
      />
      <Search
        cardsData={favorites}
        setFilteredCards={setFilteredFavorites}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="favorites-container">
        {filteredFavorites.length === 0 ? (
          <div className="no-favorites-message">No favorites added yet.</div>
        ) : (
          <CardLayout
            cardsData={filteredFavorites}
            onFavoriteToggle={refreshFavorites}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
