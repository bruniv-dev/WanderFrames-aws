import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  deleteUserById,
  fetchUserDetailsByToken,
  fetchUserDetailsById,
  updateUserOrAdminRole,
} from "../api-helpers/helpers";
import UserCard from "../UserCard/userCard";
import "./UserActions.css";
import Header from "../Header/header";
import Loading from "../Loading/Loading.js";
import Popup from "../ErrorPages/PopupCard.js";
import Search from "../Search/Search";
import Footer from "../footer/footer.js";

const UserActions = () => {
  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [currentUserIsAdmin, setCurrentUserIsAdmin] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12; // Number of users per page
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchUserDetailsByToken()
      .then((tokenData) => {
        const userId = tokenData.userId;
        setLoggedInUserId(userId);

        return fetchUserDetailsById(userId);
      })
      .then((userDetails) => {
        setCurrentUserIsAdmin(userDetails.isAdmin);

        if (!userDetails.isAdmin) {
          navigate("/unauthorized");
        } else {
          return getAllUsers();
        }
      })
      .then((data) => {
        setUsersData(data.users);
        setFilteredUsers(data.users);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    const filtered = usersData.filter((user) => {
      const matchesRole =
        filterCategory === "all" ||
        (filterCategory === "admin" && user.isAdmin) ||
        (filterCategory === "user" && !user.isAdmin);

      const lowercasedTerm = searchQuery.toLowerCase();
      const matchesSearchQuery = [
        user.username || "",
        user.location || "",
        user.subLocation || "",
        user.firstName || "",
        user.lastName || "",
        `${user.firstName} ${user.lastName}` || "",
        user.email || "",
      ].some((field) => field.toLowerCase().includes(lowercasedTerm));

      return matchesRole && matchesSearchQuery;
    });

    filtered.sort((a, b) => {
      if (a._id === loggedInUserId) return -1;
      if (b._id === loggedInUserId) return 1;
      return 0;
    });
    setFilteredUsers(filtered);
  }, [searchQuery, filterCategory, usersData]);

  // Pagination logic
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedUserId(null);
    setPopupType("");
  };

  const handleConfirmAction = () => {
    if (selectedUserId) {
      if (popupType === "makeAdmin") {
        updateUserOrAdminRole(selectedUserId, true, "Admin")
          .then((updatedUser) => {
            const updatedUsers = usersData.map((user) =>
              user._id === selectedUserId
                ? {
                    ...user,
                    isAdmin: updatedUser.isAdmin,
                    role: updatedUser.role,
                  }
                : user
            );
            setUsersData(updatedUsers);
            setFilteredUsers(updatedUsers);
          })
          .catch((e) => console.log(e));
      } else if (popupType === "removeAdmin") {
        updateUserOrAdminRole(selectedUserId, false, "User")
          .then((updatedUser) => {
            const updatedUsers = usersData.map((user) =>
              user._id === selectedUserId
                ? {
                    ...user,
                    isAdmin: updatedUser.isAdmin,
                    role: updatedUser.role,
                  }
                : user
            );
            setUsersData(updatedUsers);
            setFilteredUsers(updatedUsers);
          })
          .catch((e) => console.log(e));
      } else if (popupType === "deleteUser") {
        setSuccessMessage("");

        deleteUserById(selectedUserId)
          .then(() => {
            setSuccessMessage("User Deleted Successfully!");
            setTimeout(() => {
              setSuccessMessage("");
            }, 2000);

            const updatedUsers = usersData.filter(
              (user) => user._id !== selectedUserId
            );
            setUsersData(updatedUsers);
            setFilteredUsers(updatedUsers);
          })
          .catch((e) => {
            setError("Failed to delete user!");
            setTimeout(() => setError(""), 2000);
          });
      }

      handleClosePopup();
    }
  };

  const handleActionWithPopup = (userId, type) => {
    setSelectedUserId(userId);
    setPopupType(type);
    setShowPopup(true);
  };

  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Header
        classNameheader="postActions-header"
        classNamelogo="postActions-logo"
        classNamenav="postActions-nav"
        classNamesignin="postActions-signin"
        logoSrc={`Logo_black_Green.svg`}
      />
      <div className="user-actions-header">
        <Search
          cardsData={usersData}
          setFilteredCards={setFilteredUsers}
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          additionalFields={["email", "username", "_id"]}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          showCategoryFilter={true}
        />
      </div>
      <div className="user-actions-container">
        {error ? (
          <div className="notif error-message">{error}</div>
        ) : successMessage ? (
          <div className="notif success-message">{successMessage}</div>
        ) : null}
        {currentUsers.map((user) => (
          <UserCard
            key={user._id}
            userId={user._id}
            username={user.username}
            firstName={user.firstName}
            lastName={user.lastName}
            createdAt={user.createdAt}
            email={user.email}
            bio={user.bio}
            role={user.role}
            profileImage={user.profileImage}
            isAdmin={user.isAdmin}
            onAdminDelete={() => {
              handleActionWithPopup(user._id, "deleteUser");
            }}
            makeAdmin={() => handleActionWithPopup(user._id, "makeAdmin")}
            removeAdmin={() => handleActionWithPopup(user._id, "removeAdmin")}
            currentUserIsAdmin={currentUserIsAdmin}
            loggedInUserId={loggedInUserId}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          className="page-button arrow-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="page-button arrow-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>

      <Popup
        showPopup={showPopup}
        onClose={handleClosePopup}
        onConfirm={handleConfirmAction}
        confirmBtnText="Confirm"
        message={{
          title:
            popupType === "makeAdmin"
              ? "Confirm Make Admin"
              : popupType === "removeAdmin"
              ? "Confirm Remove Admin"
              : "Confirm Delete User",
          body:
            popupType === "makeAdmin"
              ? "Do you want to make this user an Admin?"
              : popupType === "removeAdmin"
              ? "Do you want to remove this user's Admin privileges?"
              : "Are you sure you want to delete this user?",
        }}
      />
      <Footer />
    </>
  );
};

export default UserActions;
