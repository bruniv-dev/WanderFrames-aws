import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchUserProfile, fetchUserPosts } from "../api-helpers/helpers";
import CardLayout from "../Card-layout/cardLayout";
import "./UserProfile.css";
import Header from "../Header/header";
import Footer from "../footer/footer";
//TO VIEW OTHER USER PROFILE
const UserProfile = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          const userData = await fetchUserProfile(userId);
          setUser(userData.user);
          const userPosts = await fetchUserPosts(userId);
          setPosts(userPosts);
        } catch (err) {
          console.error("Error fetching user details or posts:", err);
          setError("Failed to fetch user details or posts");
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    } else {
      setError("No user ID found");
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header
        classNameheader="user-profile-header"
        classNamelogo="user-profile-logo"
        classNamenav="user-profile-nav"
        classNamesignin="user-profile-signin"
        logoSrc={`Logo_green.svg`}
      />
      <div className="user-profile-container">
        {user ? (
          <div className="user-profile-details">
            <div className="user-profile-image">
              <img src={user.profileImage} alt="Profile" />
            </div>
            <div className="user-profile-info">
              <h2>{user.username}</h2>
              <h3
                style={{ color: "gray" }}
              >{`${user.firstName} ${user.lastName}`}</h3>
              <p className="user-profile-email">Email: {user.email}</p>
              <p className="user-profile-bio">
                {" "}
                {user.bio || "No bio available"}
              </p>
              <p className="user-profile-role">{user.role}</p>
              <p className="user-profile-joined">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p>No user data available</p>
        )}
        <div className="user-posts-section">
          {posts.length > 0 ? (
            <CardLayout cardsData={posts} />
          ) : (
            <p>No posts available</p>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
