// import React, { useState, useEffect } from "react";
// import Header from "../Header/header.js";
// import "./Inspirations.css";
// import CardLayout from "../Card-layout/cardLayout.js";
// import {
//   getAllPosts,
//   fetchUserDetailsByToken,
//   fetchUserDetailsById,
// } from "../api-helpers/helpers.js";
// import Loading from "../Loading/Loading.js";
// import Search from "../Search/Search.js";

// const Inspirations = () => {
//   const [cardsData, setCardsData] = useState([]);
//   const [filteredCards, setFilteredCards] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [userLoggedIn, setUserLoggedIn] = useState(false);
//   const [loggedInUserId, setLoggedInUserId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserIdFromToken = async () => {
//       try {
//         const userDetails = await fetchUserDetailsByToken();
//         console.log("User Details from Token:", userDetails); // Log user details
//         if (userDetails && userDetails.userId) {
//           setLoggedInUserId(userDetails.userId);
//           setUserLoggedIn(true);
//         } else {
//           setUserLoggedIn(false);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user details:", error);
//         setUserLoggedIn(false);
//       }
//     };

//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
//         const data = await getAllPosts();
//         console.log("All Posts:", data.posts); // Log all posts

//         // Fetch user details for each post
//         const postsWithUserNames = await Promise.all(
//           data.posts.map(async (post) => {
//             try {
//               const user = await fetchUserDetailsById(post.user);
//               return {
//                 ...post,
//                 userName: user.username || "Unknown",
//                 lastName: user.lastName || "Unknown",
//                 firstName: user.firstName || "Unknown",
//               };
//             } catch {
//               return {
//                 ...post,
//                 userName: "Unknown",
//                 firstName: "Unknown",
//                 lastName: "Unknown",
//               };
//             }
//           })
//         );

//         console.log("Posts with User Names:", postsWithUserNames); // Log posts with user names

//         // Filter posts based on logged-in state
//         const filteredPosts = userLoggedIn
//           ? postsWithUserNames.filter((post) => post.user !== loggedInUserId)
//           : postsWithUserNames;

//         console.log("Filtered Posts:", filteredPosts); // Log filtered posts

//         setCardsData(filteredPosts);
//         setFilteredCards(filteredPosts);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserIdFromToken().then(fetchPosts);
//   }, [userLoggedIn, loggedInUserId]);

//   useEffect(() => {
//     if (searchTerm === "") {
//       setFilteredCards(cardsData);
//     } else {
//       const lowercasedTerm = searchTerm.toLowerCase();
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
//   }, [searchTerm, cardsData]);

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   const handleCardClick = (e) => {
//     e.stopPropagation();
//     if (!userLoggedIn) {
//       setShowPopup(true);
//     }
//   };

//   return (
//     <>
//       {loading && <Loading />}
//       <Header
//         classNameheader="inspirations-header"
//         classNamelogo="inspirations-logo"
//         classNamenav="inspirations-nav"
//         classNamesignin="inspirations-signin"
//       />
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by username, location, or sublocation"
//           value={searchTerm}
//           onChange={(e) => handleSearch(e.target.value)}
//         />
//         <button onClick={() => handleSearch(searchTerm)}>Search</button>
//       </div>
//       <div className="inspirations-container">
//         {filteredCards.length === 0 && !loading ? (
//           <div className="no-cards-message">No cards available</div>
//         ) : (
//           <CardLayout cardsData={filteredCards} onCardClick={handleCardClick} />
//         )}
//       </div>
//     </>
//   );
// };

// export default Inspirations;

import React, { useState, useEffect } from "react";
import Header from "../Header/header.js";
import "./Inspirations.css";
import CardLayout from "../Card-layout/cardLayout.js";
import {
  getAllPosts,
  fetchUserDetailsByToken,
  fetchUserDetailsById,
} from "../api-helpers/helpers.js";
import Loading from "../Loading/Loading.js";
import Search from "../Search/Search.js";
import Footer from "../footer/footer.js";

const Inspirations = () => {
  const [cardsData, setCardsData] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserIdFromToken = async () => {
      try {
        const userDetails = await fetchUserDetailsByToken();
        if (userDetails && userDetails.userId) {
          setLoggedInUserId(userDetails.userId);
          setUserLoggedIn(true);
        } else {
          setUserLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setUserLoggedIn(false);
      }
    };

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getAllPosts();
        const postsWithUserNames = await Promise.all(
          data.posts.map(async (post) => {
            try {
              const user = await fetchUserDetailsById(post.user);
              return {
                ...post,
                username: user.username || "Unknown",
                lastName: user.lastName || "Unknown",
                firstName: user.firstName || "Unknown",
              };
            } catch {
              return {
                ...post,
                username: "Unknown",
                firstName: "Unknown",
                lastName: "Unknown",
              };
            }
          })
        );

        const filteredPosts = userLoggedIn
          ? postsWithUserNames.filter((post) => post.user !== loggedInUserId)
          : postsWithUserNames;

        setCardsData(filteredPosts);
        setFilteredCards(filteredPosts);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIdFromToken().then(fetchPosts);
  }, [userLoggedIn, loggedInUserId]);

  const handleCardClick = (e) => {
    e.stopPropagation();
    if (!userLoggedIn) {
      setShowPopup(true);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Header
        classNameheader="inspirations-header"
        classNamelogo="inspirations-logo"
        classNamenav="inspirations-nav"
        classNamesignin="inspirations-signin"
        logoSrc={`Logo_black_green.svg`}
      />
      <Search
        cardsData={cardsData}
        setFilteredCards={setFilteredCards}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="inspirations-container">
        {filteredCards.length === 0 && !loading ? (
          <div className="no-cards-message">No cards available</div>
        ) : (
          <CardLayout cardsData={filteredCards} onCardClick={handleCardClick} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Inspirations;
