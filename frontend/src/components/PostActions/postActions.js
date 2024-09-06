import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/header.js";
import "./PostAction.css";
import CardLayout from "../Card-layout/cardLayout.js";
import Search from "../Search/Search";
import {
  getAllPosts,
  deletePostById,
  fetchUserDetailsById,
  fetchUserDetailsByToken,
} from "../api-helpers/helpers.js";
import Footer from "../footer/footer.js";

const PostActions = () => {
  const [cardsData, setCardsData] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    fetchUserDetailsByToken()
      .then(async (tokenData) => {
        const userId = tokenData.userId;
        const userDetails = await fetchUserDetailsById(userId);

        setIsAdmin(userDetails.isAdmin);
        if (!userDetails.isAdmin) {
          navigate("/unauthorized");
        } else {
          return getAllPosts();
        }
      })
      .then(async (data) => {
        const postsWithUserNames = await Promise.all(
          data.posts.map(async (post) => {
            try {
              const user = await fetchUserDetailsById(post.user);
              return {
                ...post,
                username: user.username || "Unknown",
                lastName: user.lastName || "Unknown",
                firstName: user.firstName || "Unknown",
                role: user.role || "user",
              };
            } catch {
              return {
                ...post,
                username: "Unknown",
                firstName: "Unknown",
                lastName: "Unknown",
                role: "user",
              };
            }
          })
        );
        setCardsData(postsWithUserNames);
        setFilteredCards(postsWithUserNames);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    const filtered = cardsData.filter((card) => {
      const matchesSearch = card.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole =
        filterCategory === "all" ||
        card.role.toLowerCase() === filterCategory.toLowerCase();

      return matchesSearch && matchesRole;
    });

    setFilteredCards(filtered);
  }, [searchTerm, filterCategory, cardsData]);

  const handleAdminDelete = (postId) => {
    deletePostById(postId)
      .then(() => {
        setSuccessMessage("Post Deleted Successfully!");
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
        const updatedCards = cardsData.filter((post) => post._id !== postId);
        setCardsData(updatedCards);
        setFilteredCards(updatedCards);
      })
      .catch((e) => {
        console.log(e);
        setError("Failed to Delete Post");
        setTimeout(() => {
          setError("");
        }, 2000);
      });
  };

  return loading ? (
    <div>Loading...</div>
  ) : isAdmin ? (
    <>
      <Header
        classNameheader="postActions-header"
        classNamelogo="postActions-logo"
        classNamenav="postActions-nav"
        classNamesignin="postActions-signin"
        logoSrc={`Logo_black_Green.svg`}
      />

      <Search
        cardsData={cardsData}
        setFilteredCards={setFilteredCards}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        showCategoryFilter={true}
      />

      <div className="postActions-container">
        {error ? (
          <div className="notif error-message">{error}</div>
        ) : successMessage ? (
          <div className="notif success-message">{successMessage}</div>
        ) : null}
        <CardLayout
          cardsData={filteredCards}
          onAdminDelete={handleAdminDelete}
          isAdminContext={true}
        />
      </div>
      <Footer />
    </>
  ) : null;
};

export default PostActions;
