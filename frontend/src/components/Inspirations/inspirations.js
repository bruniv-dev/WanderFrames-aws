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
