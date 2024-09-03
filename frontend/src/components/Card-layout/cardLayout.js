// // // // import React, { useState } from "react";
// // // // import Card from "../Card/card";
// // // // import Slider from "react-slick";
// // // // import "slick-carousel/slick/slick.css";
// // // // import "slick-carousel/slick/slick-theme.css";
// // // // import "./CardLayout.css";
// // // // import Popup from "../ErrorPages/PopupCard";
// // // // import { useNavigate } from "react-router-dom";

// // // // const CustomPrevArrow = ({ className, style, onClick }) => (
// // // //   <div
// // // //     className={`${className} custom-prev-arrow`}
// // // //     style={{ ...style, display: "block" }}
// // // //     onClick={(e) => {
// // // //       e.stopPropagation();
// // // //       onClick();
// // // //     }}
// // // //   />
// // // // );

// // // // const CustomNextArrow = ({ className, style, onClick }) => (
// // // //   <div
// // // //     className={`${className} custom-next-arrow`}
// // // //     style={{ ...style, display: "block" }}
// // // //     onClick={(e) => {
// // // //       e.stopPropagation();
// // // //       onClick();
// // // //     }}
// // // //   />
// // // // );

// // // // const CardLayout = ({
// // // //   cardsData,
// // // //   onFavoriteToggle,
// // // //   onDelete,
// // // //   onAdminDelete,
// // // //   isProfile,
// // // //   isAdminContext,
// // // // }) => {
// // // //   const [selectedCard, setSelectedCard] = useState(null);
// // // //   const [showPopup, setShowPopup] = useState(false);
// // // //   const [popupMessage, setPopupMessage] = useState({});
// // // //   const [popupConfirmText, setPopupConfirmText] = useState("");

// // // //   const openModal = (card) => {
// // // //     setSelectedCard(card);
// // // //   };

// // // //   const closeModal = () => {
// // // //     setSelectedCard(null);
// // // //   };

// // // //   const handlePopupClose = () => {
// // // //     setShowPopup(false);
// // // //   };
// // // //   const navigate = useNavigate();
// // // //   const handlePopupConfirm = () => {
// // // //     if (popupConfirmText === "Log In") {
// // // //       navigate("/loginSignup");
// // // //       // For example, use navigate('/login') from react-router-dom here
// // // //     } else if (popupConfirmText === "Delete") {
// // // //       if (onAdminDelete) {
// // // //         onAdminDelete(selectedCard._id);
// // // //       } else if (onDelete) {
// // // //         onDelete(selectedCard._id);
// // // //       }
// // // //     }
// // // //     setShowPopup(false);
// // // //   };

// // // //   const handleFavoriteClick = (cardId) => {
// // // //     const storedUserId = localStorage.getItem("userId");
// // // //     if (storedUserId) {
// // // //       if (typeof onFavoriteToggle === "function") {
// // // //         onFavoriteToggle(cardId);
// // // //       } else {
// // // //         console.error("onFavoriteToggle is not a function");
// // // //       }
// // // //     } else {
// // // //       setPopupMessage({
// // // //         title: "Please Sign In",
// // // //         body: "You need to be logged in to add items to your favorites.",
// // // //       });
// // // //       setPopupConfirmText("Log In");
// // // //       setShowPopup(true);
// // // //     }
// // // //   };

// // // //   if (!cardsData || !Array.isArray(cardsData)) {
// // // //     return <div>No cards available.</div>;
// // // //   }

// // // //   const sliderSettings = {
// // // //     dots: selectedCard && selectedCard.images.length > 1,
// // // //     infinite: selectedCard && selectedCard.images.length > 1,
// // // //     speed: 500,
// // // //     slidesToShow: 1,
// // // //     slidesToScroll: 1,
// // // //     autoplay: selectedCard && selectedCard.images.length > 1,
// // // //     autoplaySpeed: 3000,
// // // //     customPaging: (i) => <div className="card-custom-dot" />,
// // // //     dotsClass: "slick-dots card-custom-dots",
// // // //     prevArrow:
// // // //       selectedCard && selectedCard.images.length > 1 ? (
// // // //         <CustomPrevArrow />
// // // //       ) : null,
// // // //     nextArrow:
// // // //       selectedCard && selectedCard.images.length > 1 ? (
// // // //         <CustomNextArrow />
// // // //       ) : null,
// // // //   };

// // // //   const formatDate = (dateString) => {
// // // //     const options = {
// // // //       day: "2-digit",
// // // //       month: "long",
// // // //       year: "numeric",
// // // //     };
// // // //     return new Intl.DateTimeFormat("en-GB", options).format(
// // // //       new Date(dateString)
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div className="card-layout">
// // // //       {cardsData.map((card) => (
// // // //         <Card
// // // //           key={card._id}
// // // //           _id={card._id}
// // // //           userId={card.user}
// // // //           images={card.images}
// // // //           location={card.location}
// // // //           subLocation={card.subLocation}
// // // //           description={card.description}
// // // //           date={card.date}
// // // //           postedAt={card.postedAt}
// // // //           locationUrl={card.locationUrl}
// // // //           onFavoriteToggle={
// // // //             onFavoriteToggle ? () => onFavoriteToggle(card._id) : null
// // // //           }
// // // //           onDelete={onDelete}
// // // //           onAdminDelete={onAdminDelete ? () => onAdminDelete(card._id) : null}
// // // //           onCardClick={() => openModal(card)}
// // // //           isProfile={isProfile}
// // // //           isAdminContext={isAdminContext}
// // // //         />
// // // //       ))}

// // // //       {selectedCard && (
// // // //         <div className="modal-backdrop" onClick={closeModal}>
// // // //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// // // //             <span className="close-button" onClick={closeModal}>
// // // //               &times;
// // // //             </span>
// // // //             <div className="modal-slider">
// // // //               <Slider {...sliderSettings}>
// // // //                 {selectedCard.images.length > 0 ? (
// // // //                   selectedCard.images.map((img, index) => (
// // // //                     <img
// // // //                       key={index}
// // // //                       className="modal-slider-image"
// // // //                       src={img.url}
// // // //                       alt={`Slide ${index + 1}`}
// // // //                     />
// // // //                   ))
// // // //                 ) : (
// // // //                   <img
// // // //                     className="modal-slider-image"
// // // //                     src="https://placehold.co/600x400"
// // // //                     alt="Placeholder"
// // // //                   />
// // // //                 )}
// // // //               </Slider>
// // // //             </div>
// // // //             <p> {selectedCard.location}</p>
// // // //             <p> {selectedCard.subLocation}</p>
// // // //             <p> {selectedCard.description}</p>
// // // //             <p> {formatDate(selectedCard.date)}</p>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {showPopup && (
// // // //         <Popup
// // // //           showPopup={showPopup}
// // // //           onClose={handlePopupClose}
// // // //           onConfirm={handlePopupConfirm}
// // // //           confirmText={popupConfirmText}
// // // //           message={popupMessage}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CardLayout;

// // // import React, { useState } from "react";
// // // import Card from "../Card/card";
// // // import Slider from "react-slick";
// // // import "slick-carousel/slick/slick.css";
// // // import "slick-carousel/slick/slick-theme.css";
// // // import "./CardLayout.css";
// // // import Popup from "../ErrorPages/PopupCard";
// // // import { useNavigate } from "react-router-dom";

// // // const CustomPrevArrow = ({ className, style, onClick }) => (
// // //   <div
// // //     className={`${className} custom-prev-arrow`}
// // //     style={{ ...style, display: "block" }}
// // //     onClick={(e) => {
// // //       e.stopPropagation();
// // //       onClick();
// // //     }}
// // //   />
// // // );

// // // const CustomNextArrow = ({ className, style, onClick }) => (
// // //   <div
// // //     className={`${className} custom-next-arrow`}
// // //     style={{ ...style, display: "block" }}
// // //     onClick={(e) => {
// // //       e.stopPropagation();
// // //       onClick();
// // //     }}
// // //   />
// // // );

// // // const CardLayout = ({
// // //   cardsData,
// // //   onFavoriteToggle,
// // //   onDelete,
// // //   onAdminDelete,
// // //   isProfile,
// // //   isAdminContext,
// // // }) => {
// // //   const [selectedCard, setSelectedCard] = useState(null);
// // //   const [showPopup, setShowPopup] = useState(false);
// // //   const [popupMessage, setPopupMessage] = useState({});
// // //   const [popupConfirmText, setPopupConfirmText] = useState("");

// // //   // Pagination states
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const cardsPerPage = 12; // 4 rows * 2 cards per row

// // //   const totalCards = cardsData.length;
// // //   const totalPages = Math.ceil(totalCards / cardsPerPage);

// // //   const paginate = (pageNumber) => {
// // //     setCurrentPage(pageNumber);
// // //   };

// // //   const handlePopupClose = () => {
// // //     setShowPopup(false);
// // //   };

// // //   const navigate = useNavigate();

// // //   const openModal = (card) => {
// // //     setSelectedCard(card);
// // //   };

// // //   const closeModal = () => {
// // //     setSelectedCard(null);
// // //   };

// // //   const handlePopupConfirm = () => {
// // //     if (popupConfirmText === "Log In") {
// // //       navigate("/loginSignup");
// // //     } else if (popupConfirmText === "Delete") {
// // //       if (onAdminDelete) {
// // //         onAdminDelete(selectedCard._id);
// // //       } else if (onDelete) {
// // //         onDelete(selectedCard._id);
// // //       }
// // //     }
// // //     setShowPopup(false);
// // //   };

// // //   const handleFavoriteClick = (cardId) => {
// // //     const storedUserId = localStorage.getItem("userId");
// // //     if (storedUserId) {
// // //       if (typeof onFavoriteToggle === "function") {
// // //         onFavoriteToggle(cardId);
// // //       } else {
// // //         console.error("onFavoriteToggle is not a function");
// // //       }
// // //     } else {
// // //       setPopupMessage({
// // //         title: "Please Sign In",
// // //         body: "You need to be logged in to add items to your favorites.",
// // //       });
// // //       setPopupConfirmText("Log In");
// // //       setShowPopup(true);
// // //     }
// // //   };

// // //   if (!cardsData || !Array.isArray(cardsData)) {
// // //     return <div>No cards available.</div>;
// // //   }

// // //   // Calculate the current cards to display
// // //   const startIndex = (currentPage - 1) * cardsPerPage;
// // //   const endIndex = startIndex + cardsPerPage;
// // //   const currentCards = cardsData.slice(startIndex, endIndex);

// // //   const sliderSettings = {
// // //     dots: selectedCard && selectedCard.images.length > 1,
// // //     infinite: selectedCard && selectedCard.images.length > 1,
// // //     speed: 500,
// // //     slidesToShow: 1,
// // //     slidesToScroll: 1,
// // //     autoplay: selectedCard && selectedCard.images.length > 1,
// // //     autoplaySpeed: 3000,
// // //     customPaging: (i) => <div className="card-custom-dot" />,
// // //     dotsClass: "slick-dots card-custom-dots",
// // //     prevArrow:
// // //       selectedCard && selectedCard.images.length > 1 ? (
// // //         <CustomPrevArrow />
// // //       ) : null,
// // //     nextArrow:
// // //       selectedCard && selectedCard.images.length > 1 ? (
// // //         <CustomNextArrow />
// // //       ) : null,
// // //   };

// // //   const formatDate = (dateString) => {
// // //     const options = {
// // //       day: "2-digit",
// // //       month: "long",
// // //       year: "numeric",
// // //     };
// // //     return new Intl.DateTimeFormat("en-GB", options).format(
// // //       new Date(dateString)
// // //     );
// // //   };

// // //   // Pagination logic for showing previous/next arrows
// // //   const handlePreviousPage = () => {
// // //     if (currentPage > 1) {
// // //       setCurrentPage(currentPage - 1);
// // //     }
// // //   };

// // //   const handleNextPage = () => {
// // //     if (currentPage < totalPages) {
// // //       setCurrentPage(currentPage + 1);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <div className="card-layout">
// // //         {currentCards.map((card) => (
// // //           <Card
// // //             key={card._id}
// // //             _id={card._id}
// // //             userId={card.user}
// // //             images={card.images}
// // //             location={card.location}
// // //             subLocation={card.subLocation}
// // //             description={card.description}
// // //             date={card.date}
// // //             postedAt={card.postedAt}
// // //             locationUrl={card.locationUrl}
// // //             onFavoriteToggle={
// // //               onFavoriteToggle ? () => onFavoriteToggle(card._id) : null
// // //             }
// // //             onDelete={onDelete}
// // //             onAdminDelete={onAdminDelete ? () => onAdminDelete(card._id) : null}
// // //             onCardClick={() => openModal(card)}
// // //             isProfile={isProfile}
// // //             isAdminContext={isAdminContext}
// // //           />
// // //         ))}

// // //         {selectedCard && (
// // //           <div className="modal-backdrop" onClick={closeModal}>
// // //             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// // //               <span className="close-button" onClick={closeModal}>
// // //                 &times;
// // //               </span>

// // //               <div className="modal-slider">
// // //                 <Slider {...sliderSettings}>
// // //                   {selectedCard.images.length > 0 ? (
// // //                     selectedCard.images.map((img, index) => (
// // //                       <img
// // //                         key={index}
// // //                         className="modal-slider-image"
// // //                         src={img.url}
// // //                         alt={`Slide ${index + 1}`}
// // //                       />
// // //                     ))
// // //                   ) : (
// // //                     <img
// // //                       className="modal-slider-image"
// // //                       src="https://placehold.co/600x400"
// // //                       alt="Placeholder"
// // //                     />
// // //                   )}
// // //                 </Slider>
// // //               </div>
// // //               <p> {selectedCard.location}</p>
// // //               <p> {selectedCard.subLocation}</p>
// // //               <p> {selectedCard.description}</p>
// // //               <p> {formatDate(selectedCard.date)}</p>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {showPopup && (
// // //           <Popup
// // //             showPopup={showPopup}
// // //             onClose={handlePopupClose}
// // //             onConfirm={handlePopupConfirm}
// // //             confirmText={popupConfirmText}
// // //             message={popupMessage}
// // //           />
// // //         )}
// // //       </div>
// // //       <div className="pagination">
// // //         <button
// // //           className="page-button arrow-button"
// // //           onClick={handlePreviousPage}
// // //           disabled={currentPage === 1}
// // //         >
// // //           &lt;
// // //         </button>
// // //         {Array.from({ length: totalPages }, (_, index) => (
// // //           <button
// // //             key={index}
// // //             className={`page-button ${
// // //               currentPage === index + 1 ? "active" : ""
// // //             }`}
// // //             onClick={() => paginate(index + 1)}
// // //           >
// // //             {index + 1}
// // //           </button>
// // //         ))}
// // //         <button
// // //           className="page-button arrow-button"
// // //           onClick={handleNextPage}
// // //           disabled={currentPage === totalPages}
// // //         >
// // //           &gt;
// // //         </button>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default CardLayout;

// // // import React, { useState, useEffect } from "react";
// // // import Card from "../Card/card";
// // // import Slider from "react-slick";
// // // import "slick-carousel/slick/slick.css";
// // // import "slick-carousel/slick/slick-theme.css";
// // // import "./CardLayout.css";
// // // import Popup from "../ErrorPages/PopupCard";
// // // import { useNavigate } from "react-router-dom";
// // // import { fetchUserDetailsById } from "../api-helpers/helpers";

// // // const CustomPrevArrow = ({ className, style, onClick }) => (
// // //   <div
// // //     className={`${className} custom-prev-arrow`}
// // //     style={{ ...style, display: "block" }}
// // //     onClick={(e) => {
// // //       e.stopPropagation();
// // //       onClick();
// // //     }}
// // //   />
// // // );

// // // const CustomNextArrow = ({ className, style, onClick }) => (
// // //   <div
// // //     className={`${className} custom-next-arrow`}
// // //     style={{ ...style, display: "block" }}
// // //     onClick={(e) => {
// // //       e.stopPropagation();
// // //       onClick();
// // //     }}
// // //   />
// // // );

// // // const CardLayout = ({
// // //   cardsData,
// // //   onFavoriteToggle,
// // //   onDelete,
// // //   onAdminDelete,
// // //   isProfile,
// // //   isAdminContext,
// // // }) => {
// // //   const [selectedCard, setSelectedCard] = useState(null);
// // //   const [showPopup, setShowPopup] = useState(false);
// // //   const [authorDetails, setAuthorDetails] = useState(false);
// // //   const [popupMessage, setPopupMessage] = useState({});
// // //   const [popupConfirmText, setPopupConfirmText] = useState("");

// // //   const isLoggedIn = localStorage.getItem("isLoggedIn");

// // //   // Pagination states
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const cardsPerPage = 12; // 4 rows * 2 cards per row

// // //   const totalCards = cardsData.length;
// // //   const totalPages = Math.ceil(totalCards / cardsPerPage);

// // //   const paginate = (pageNumber) => {
// // //     setCurrentPage(pageNumber);
// // //   };

// // //   const handlePopupClose = () => {
// // //     setShowPopup(false);
// // //   };

// // //   const navigate = useNavigate();

// // //   const openModal = (card) => {
// // //     setSelectedCard(card);
// // //   };

// // //   const closeModal = () => {
// // //     setSelectedCard(null);
// // //   };

// // //   const handlePopupConfirm = () => {
// // //     if (popupConfirmText === "Log In") {
// // //       navigate("/loginSignup");
// // //     } else if (popupConfirmText === "Delete") {
// // //       if (onAdminDelete) {
// // //         onAdminDelete(selectedCard._id);
// // //       } else if (onDelete) {
// // //         onDelete(selectedCard._id);
// // //       }
// // //     }
// // //     setShowPopup(false);
// // //   };

// // //   console.log(selectedCard);

// // //   if (!cardsData || !Array.isArray(cardsData)) {
// // //     return <div>No cards available.</div>;
// // //   }

// // //   // Calculate the current cards to display
// // //   const startIndex = (currentPage - 1) * cardsPerPage;
// // //   const endIndex = startIndex + cardsPerPage;
// // //   const currentCards = cardsData.slice(startIndex, endIndex);

// // //   const sliderSettings = {
// // //     dots: selectedCard && selectedCard.images.length > 1,
// // //     infinite: selectedCard && selectedCard.images.length > 1,
// // //     speed: 500,
// // //     slidesToShow: 1,
// // //     slidesToScroll: 1,
// // //     autoplay: selectedCard && selectedCard.images.length > 1,
// // //     autoplaySpeed: 3000,
// // //     customPaging: (i) => <div className="card-custom-dot" />,
// // //     dotsClass: "slick-dots card-custom-dots",
// // //     prevArrow:
// // //       selectedCard && selectedCard.images.length > 1 ? (
// // //         <CustomPrevArrow />
// // //       ) : null,
// // //     nextArrow:
// // //       selectedCard && selectedCard.images.length > 1 ? (
// // //         <CustomNextArrow />
// // //       ) : null,
// // //   };

// // //   const formatDate = (dateString) => {
// // //     const options = {
// // //       day: "2-digit",
// // //       month: "long",
// // //       year: "numeric",
// // //     };
// // //     return new Intl.DateTimeFormat("en-GB", options).format(
// // //       new Date(dateString)
// // //     );
// // //   };

// // //   // Pagination logic for showing previous/next arrows
// // //   const handlePreviousPage = () => {
// // //     if (currentPage > 1) {
// // //       setCurrentPage(currentPage - 1);
// // //     }
// // //   };

// // //   const handleNextPage = () => {
// // //     if (currentPage < totalPages) {
// // //       setCurrentPage(currentPage + 1);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <div className="card-layout">
// // //         {currentCards.map((card) => (
// // //           <Card
// // //             key={card._id}
// // //             _id={card._id}
// // //             userId={card.user}
// // //             images={card.images}
// // //             location={card.location}
// // //             subLocation={card.subLocation}
// // //             description={card.description}
// // //             date={card.date}
// // //             postedAt={card.postedAt}
// // //             locationUrl={card.locationUrl}
// // //             onFavoriteToggle={
// // //               onFavoriteToggle ? () => onFavoriteToggle(card._id) : null
// // //             }
// // //             onDelete={onDelete}
// // //             onAdminDelete={onAdminDelete ? () => onAdminDelete(card._id) : null}
// // //             onCardClick={() => openModal(card)}
// // //             isProfile={isProfile}
// // //             isAdminContext={isAdminContext}
// // //           />
// // //         ))}

// // //         {selectedCard && (
// // //           <div className="modal-backdrop" onClick={closeModal}>
// // //             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// // //               <span className="close-button" onClick={closeModal}>
// // //                 &times;
// // //               </span>

// // //               <div className="card-header">
// // //                 {isLoggedIn && (
// // //                   <>
// // //                     <img
// // //                       className="profile-image-card"
// // //                       src={
// // //                         authorDetails.profileImage ||
// // //                         "https://placehold.co/50x50"
// // //                       }
// // //                       alt="profilepic"
// // //                     />
// // //                     <div className="card-user-info">
// // //                       <div className="card-last-row">
// // //                         <p
// // //                           className="card-username"
// // //                           onClick={() =>
// // //                             navigate("/userProfile", {
// // //                               state: { userId: selectedCard.user },
// // //                             })
// // //                           }
// // //                         >
// // //                           {authorDetails.username ||
// // //                             "Login to view user details"}
// // //                         </p>
// // //                         <p className="card-role">
// // //                           {selectedCard.isAdmin ? "Admin" : "User"}
// // //                         </p>

// // //                         <p className="card-date">
// // //                           {formatDate(selectedCard.postedAt)}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                   </>
// // //                 )}
// // //               </div>

// // //               <div className="modal-slider">
// // //                 <Slider {...sliderSettings}>
// // //                   {selectedCard.images.length > 0 ? (
// // //                     selectedCard.images.map((img, index) => (
// // //                       <img
// // //                         key={index}
// // //                         className="modal-slider-image"
// // //                         src={img.url}
// // //                         alt={`Slide ${index + 1}`}
// // //                       />
// // //                     ))
// // //                   ) : (
// // //                     <img
// // //                       className="modal-slider-image"
// // //                       src="https://placehold.co/600x400"
// // //                       alt="Placeholder"
// // //                     />
// // //                   )}
// // //                 </Slider>
// // //               </div>
// // //               <p> {selectedCard.location}</p>
// // //               <p> {selectedCard.subLocation}</p>
// // //               <p> {selectedCard.description}</p>
// // //               <p> {formatDate(selectedCard.date)}</p>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {showPopup && (
// // //           <Popup
// // //             showPopup={showPopup}
// // //             onClose={handlePopupClose}
// // //             onConfirm={handlePopupConfirm}
// // //             confirmText={popupConfirmText}
// // //             message={popupMessage}
// // //           />
// // //         )}
// // //       </div>
// // //       <div className="pagination">
// // //         <button
// // //           className="page-button arrow-button"
// // //           onClick={handlePreviousPage}
// // //           disabled={currentPage === 1}
// // //         >
// // //           &lt;
// // //         </button>
// // //         {Array.from({ length: totalPages }, (_, index) => (
// // //           <button
// // //             key={index}
// // //             className={`page-button ${
// // //               currentPage === index + 1 ? "active" : ""
// // //             }`}
// // //             onClick={() => paginate(index + 1)}
// // //           >
// // //             {index + 1}
// // //           </button>
// // //         ))}
// // //         <button
// // //           className="page-button arrow-button"
// // //           onClick={handleNextPage}
// // //           disabled={currentPage === totalPages}
// // //         >
// // //           &gt;
// // //         </button>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default CardLayout;

// import React, { useState, useEffect } from "react";
// import Card from "../Card/card";
// import Popup from "../ErrorPages/PopupCard";
// import { useNavigate } from "react-router-dom";
// import "./CardLayout.css";

// const CardLayout = ({
//   cardsData,
//   onFavoriteToggle,
//   onDelete,
//   onAdminDelete,
//   isProfile,
//   isAdminContext,
// }) => {
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState({});
//   const [popupConfirmText, setPopupConfirmText] = useState("");
//   const [refreshTrigger, setRefreshTrigger] = useState(false);
//   const navigate = useNavigate();

//   const isLoggedIn = localStorage.getItem("isLoggedIn");

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const cardsPerPage = 12; // 4 rows * 2 cards per row
//   const totalCards = cardsData.length;
//   const totalPages = Math.ceil(totalCards / cardsPerPage);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false);
//   };

//   const openModal = (card) => {
//     setSelectedCard(card);
//   };

//   const closeModal = () => {
//     setSelectedCard(null);
//   };

//   const handlePopupConfirm = () => {
//     if (popupConfirmText === "Log In") {
//       navigate("/loginSignup");
//     } else if (popupConfirmText === "Delete") {
//       if (onAdminDelete) {
//         onAdminDelete(selectedCard._id);
//       } else if (onDelete) {
//         onDelete(selectedCard._id);
//       }
//     }
//     setShowPopup(false);
//   };

//   // useEffect(() => {
//   //   // Refresh cardsData based on current page
//   //   // This could involve a new fetch or recalculating the slice of cardsData
//   //   // Example: fetchCardsData();
//   // }, [refreshTrigger]);

//   // const handleFavoriteToggle = () => {
//   //   setRefreshTrigger((prev) => !prev);
//   // };

//   if (!cardsData || !Array.isArray(cardsData)) {
//     return <div>No cards available.</div>;
//   }

//   // Calculate the current cards to display
//   const startIndex = (currentPage - 1) * cardsPerPage;
//   const endIndex = startIndex + cardsPerPage;
//   const currentCards = cardsData.slice(startIndex, endIndex);

//   // Pagination logic for showing previous/next arrows
//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handleFavoriteToggle = (cardId) => {
//     if (onFavoriteToggle) {
//       onFavoriteToggle(cardId);
//     }

//     // Update the state of the selectedCard if it's the one being toggled
//     if (selectedCard && selectedCard._id === cardId) {
//       setSelectedCard({
//         ...selectedCard,
//         isFavorite: !selectedCard.isFavorite,
//       });
//     }
//   };

//   return (
//     <>
//       <div className="card-layout">
//         {currentCards.map((card) => (
//           <Card
//             key={card._id}
//             _id={card._id}
//             userId={card.user}
//             images={card.images}
//             location={card.location}
//             subLocation={card.subLocation}
//             description={card.description}
//             date={card.date}
//             postedAt={card.postedAt}
//             locationUrl={card.locationUrl}
//             // onFavoriteToggle={handleFavoriteToggle} // Refresh after toggle
//             onFavoriteToggle={() => handleFavoriteToggle(card._id)}
//             onDelete={onDelete}
//             onAdminDelete={onAdminDelete ? () => onAdminDelete(card._id) : null}
//             onCardClick={() => openModal(card)}
//             isProfile={isProfile}
//             isAdminContext={isAdminContext}
//             isModal={false}
//           />
//         ))}

//         {selectedCard && (
//           <div className="modal-backdrop" onClick={closeModal}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//               <span className="close-button" onClick={closeModal}>
//                 &times;
//               </span>
//               <Card
//                 _id={selectedCard._id}
//                 userId={selectedCard.user}
//                 images={selectedCard.images}
//                 location={selectedCard.location}
//                 subLocation={selectedCard.subLocation}
//                 description={selectedCard.description}
//                 date={selectedCard.date}
//                 postedAt={selectedCard.postedAt}
//                 locationUrl={selectedCard.locationUrl}
//                 // onFavoriteToggle={handleFavoriteToggle} // Refresh after toggle
//                 onFavoriteToggle={() => handleFavoriteToggle(selectedCard._id)}
//                 onDelete={onDelete}
//                 onAdminDelete={
//                   onAdminDelete ? () => onAdminDelete(selectedCard._id) : null
//                 }
//                 isProfile={isProfile}
//                 isAdminContext={isAdminContext}
//                 onCardClick={null} // Disable clicking inside modal to open another modal
//                 isModal={true}
//               />
//             </div>
//           </div>
//         )}

//         {showPopup && (
//           <Popup
//             showPopup={showPopup}
//             onClose={handlePopupClose}
//             onConfirm={handlePopupConfirm}
//             confirmText={popupConfirmText}
//             message={popupMessage}
//           />
//         )}
//       </div>
//       <div className="pagination">
//         <button
//           className="page-button arrow-button"
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1}
//         >
//           &lt;
//         </button>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             className={`page-button ${
//               currentPage === index + 1 ? "active" : ""
//             }}
//             onClick={() => paginate(index + 1)`}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button
//           className="page-button arrow-button"
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//         >
//           &gt;
//         </button>
//       </div>
//     </>
//   );
// };

// export default CardLayout;

import React, { useState, useEffect } from "react";
import Card from "../Card/card";
import { useNavigate } from "react-router-dom";
import "./CardLayout.css";

const CardLayout = ({
  cardsData,
  onFavoriteToggle,
  onDelete,
  onAdminDelete,
  isProfile,
  isAdminContext,
}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [shouldReload, setShouldReload] = useState(false); // New state to trigger reload
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12; // 4 rows * 2 cards per row
  const totalCards = cardsData.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFavoriteToggle = (cardId) => {
    if (onFavoriteToggle) {
      onFavoriteToggle(cardId);
    }
    setShouldReload(true); // Set to reload after modal is closed
  };

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
    if (shouldReload) {
      window.location.reload(); // Reload the page after closing the modal
    }
  };

  // Close modal on clicking outside of the modal content
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalContent = document.querySelector(".modal-content");
      if (modalContent && !modalContent.contains(event.target)) {
        setSelectedCard(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shouldReload]);

  if (!cardsData || !Array.isArray(cardsData)) {
    return <div>No cards available.</div>;
  }

  // Calculate the current cards to display
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = cardsData.slice(startIndex, endIndex);

  // Pagination logic for showing previous/next arrows
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
      <div className="card-layout">
        {currentCards.map((card) => (
          <Card
            key={card._id}
            _id={card._id}
            userId={card.user}
            images={card.images}
            location={card.location}
            subLocation={card.subLocation}
            description={card.description}
            date={card.date}
            postedAt={card.postedAt}
            locationUrl={card.locationUrl}
            onFavoriteToggle={() => handleFavoriteToggle(card._id)} // Pass cardId
            onDelete={onDelete}
            onAdminDelete={onAdminDelete ? () => onAdminDelete(card._id) : null}
            onCardClick={() => openModal(card)}
            isProfile={isProfile}
            isAdminContext={isAdminContext}
            isModal={false}
          />
        ))}

        {selectedCard && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <Card
                _id={selectedCard._id}
                userId={selectedCard.user}
                images={selectedCard.images}
                location={selectedCard.location}
                subLocation={selectedCard.subLocation}
                description={selectedCard.description}
                date={selectedCard.date}
                postedAt={selectedCard.postedAt}
                locationUrl={selectedCard.locationUrl}
                onFavoriteToggle={() => handleFavoriteToggle(selectedCard._id)} // Pass cardId
                onDelete={onDelete}
                onAdminDelete={
                  onAdminDelete ? () => onAdminDelete(selectedCard._id) : null
                }
                isProfile={isProfile}
                isAdminContext={isAdminContext}
                onCardClick={null} // Disable clicking inside modal to open another modal
                isModal={true}
                selectedCard={true}
                closeModal={closeModal}
              />
            </div>
          </div>
        )}
      </div>
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
    </>
  );
};

export default CardLayout;
