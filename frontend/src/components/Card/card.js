import React, { useState, useEffect } from "react";
import {
  MdLocationOn,
  MdDeleteForever,
  MdEdit,
  MdMoreVert,
} from "react-icons/md";
import {
  toggleFavorite,
  fetchUserDetailsById,
  deletePostById,
  fetchUserDetailsByToken,
  updatePost,
} from "../api-helpers/helpers";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Popup from "../ErrorPages/PopupCard";

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} card-custom-prev-arrow`}
      style={{ ...style, display: "block" }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    />
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} card-custom-next-arrow`}
      style={{ ...style, display: "block" }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    />
  );
};

const Card = ({
  images = [],
  location,
  subLocation,
  description,
  date,
  postedAt,
  _id,
  userId,
  locationUrl,
  onFavoriteToggle,
  onDelete,
  isAdmin,
  onAdminDelete,
  onCardClick,
  isProfile,
  isAdminContext,
  isModal,
  closeModal,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [authorDetails, setAuthorDetails] = useState({});
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [confirmBtnText, setConfirmBtnText] = useState("");
  const navigate = useNavigate();

  const formatPostDate = (dateString) => {
    if (!dateString) {
      return "Date not available";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date"; 
    }

    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetailsById(userId)
        .then((author) => {
          setAuthorDetails(author); 
        })
        .catch((err) => console.error("Error fetching author details:", err));
    }

    
    fetchUserDetailsByToken()
      .then((tokenData) => {
        const userId = tokenData.userId;
        setLoggedInUserId(userId); 

      
        if (userId) {
          fetchUserDetailsById(userId)
            .then((user) => {
        
              if (user.favorites && user.favorites.includes(_id)) {
                setIsFavorite(true); 
              }
            })
            .catch((err) => console.error("Error fetching user details:", err));
        }
      })
      .catch((err) =>
        console.error("Error fetching user details from token:", err)
      );
  }, [_id, userId]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (loggedInUserId && _id) {
      toggleFavorite(_id, loggedInUserId)
        .then(() => {
          setIsFavorite((prevIsFavorite) => !prevIsFavorite);
          if (onFavoriteToggle) {
            onFavoriteToggle();
          }
        })
        .catch((err) => console.error("Error in toggleFavorite:", err));
    } else {
      setShowPopup(true);
      setPopupMessage("You need to login to add to favorites");
      setPopupTitle("Please Log In");
      setConfirmBtnText("Log In");
      setPopupConfirmHandler(() => () => {
        navigate("/loginSignUp");
      });
    }
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    setPopupTitle("Please Confirm");
    setPopupMessage("Are you sure you want to delete this post?");
    setConfirmBtnText("Delete");
    setShowPopup(true);
    setPopupConfirmHandler(() => async () => {
      try {
        await deletePostById(_id);
        if (onDelete) {
          onDelete(_id); 
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        if (error.response && error.response.status === 403) {
          navigate("/unauthorized");
        }
      }
    });
  };

  const handleAdminDeleteClick = (e) => {
    e.stopPropagation();
    setPopupTitle("Please Confirm");
    setPopupMessage("Are you sure you want to delete this post?");
    setShowPopup(true);
    setConfirmBtnText("Delete");
    setPopupConfirmHandler(() => () => {
      if (onAdminDelete) {
        onAdminDelete(_id);
      }
    });
  };

  const handleEditClick = async (e) => {
    e.stopPropagation();

    try {
      await updatePost(_id, {
        location,
        subLocation,
        description,
        locationUrl,
      });
      navigate("/editPost", { state: { postId: _id } });
    } catch (error) {
      console.log("Caught error:", error.message);
      if (error.response && error.response.status === 403) {
        navigate("/unauthorized");
        console.error("Update failed:", error.message);
      }
    }
  };

  const handleUsernameClick = (e) => {
    e.stopPropagation();
    navigate("/userProfile", { state: { userId } });
  };

  const uniqueImages = Array.from(new Set(images.map((img) => img.url))).map(
    (url) => images.find((img) => img.url === url)
  );

  const hasMultipleImages = uniqueImages.length > 1;

  const sliderSettings = {
    dots: hasMultipleImages,
    infinite: hasMultipleImages,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: isHovered && hasMultipleImages,
    autoplaySpeed: 3000,
    customPaging: (i) => <div className="small-card-custom-dot" />,
    dotsClass: "slick-dots card-custom-dots",
    prevArrow: hasMultipleImages ? <CustomPrevArrow /> : null,
    nextArrow: hasMultipleImages ? <CustomNextArrow /> : null,
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupConfirmHandler(null); 
  };

  const handleLoginRedirect = () => {
    handleClosePopup();
    navigate("/loginSignup");
  };

  const [popupConfirmHandler, setPopupConfirmHandler] = useState(null);

  const handlePopupConfirm = () => {
    if (popupConfirmHandler) {
      popupConfirmHandler();
    }
    handleClosePopup();
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      <div
        className={`card-container ${isModal ? "modal-card" : ""}`}
        onClick={onCardClick}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => {
          setIsHovered(false); 
          closeMenu();
        }}
      >
        {isModal && loggedInUserId && (
          <span className="close-button" onClick={closeModal}>
            &times;
          </span>
        )}
        <div
          className={`card-header ${!loggedInUserId ? "not-logged-in" : ""}`}
        >
          {loggedInUserId && (
            <>
              <img
                className="profile-image-card"
                src={authorDetails.profileImage || "https://placehold.co/50x50"}
                alt="profilepic"
              />
              <div className="card-user-info">
                <p className="card-username" onClick={handleUsernameClick}>
                  {authorDetails.username || "Login to view user details"}
                </p>
                <div className="card-last-row">
                  <p className="card-role">
                    {authorDetails.isAdmin ? "Admin" : "User"}
                  </p>

                  <p className="card-date">{formatPostDate(postedAt)}</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={`${isModal ? "modal-flex" : ""}`}>
          <div className="card-image-slider">
            {uniqueImages.length > 0 ? (
              <Slider {...sliderSettings}>
                {uniqueImages.map((img, index) => (
                  <img
                    key={index}
                    className="card-slider-image"
                    src={img.url}
                    alt={`Slide ${index + 1}`}
                  />
                ))}
              </Slider>
            ) : (
              <img
                className="card-slider-image"
                src="https://placehold.co/600x400"
                alt="Placeholder"
              />
            )}
          </div>
          <div className="card-content">
            <div className="loc-name-nav">
              <p className="card-location">{location}</p>
              {locationUrl && (
                <a href={locationUrl} target="_blank" rel="noopener noreferrer">
                  <MdLocationOn className="card-location-button" />
                </a>
              )}
            </div>
            <p className="card-sub-location">{subLocation}</p>
            <p className={`${isModal && isLoggedIn ? "visit-date" : "hidden"}`}>
              Date Of Visit : {formatPostDate(date)}
            </p>
            <p className={"card-description"}>{description}</p>
          </div>
        </div>
        {!isAdminContext && !isModal && (
          <button
            className={`card-add-to-favorites ${
              !loggedInUserId ? "not-logged-in" : ""
            }${isFavorite ? "favorite" : ""}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? (
              <FaHeart className="isfav" />
            ) : (
              <FaRegHeart className="notfav" />
            )}
          </button>
        )}

        <div className="card-kebab-menu-container">
          <MdMoreVert className="card-kebab-menu-icon" onClick={toggleMenu} />
          {menuVisible && (
            <div className="card-kebab-menu">
              <div
                className="card-kebab-menu-item edit"
                onClick={handleEditClick}
              >
                <MdEdit className="card-kebab-menu-icon edit" /> Edit
              </div>
              <div
                className="card-kebab-menu-item delete"
                onClick={handleDeleteClick}
              >
                <MdDeleteForever className="card-kebab-menu-icon delete" />{" "}
                Delete
              </div>
            </div>
          )}
        </div>

        {onAdminDelete && (
          <MdDeleteForever
            className="card-admin-delete-button"
            onClick={handleAdminDeleteClick}
          ></MdDeleteForever>
        )}
      </div>
      <Popup
        showPopup={showPopup}
        onClose={handleClosePopup}
        onConfirm={handlePopupConfirm}
        confirmBtnText={confirmBtnText}
        message={{
          title: popupTitle,
          body: popupMessage,
        }}
      />
    </>
  );
};

export default Card;
