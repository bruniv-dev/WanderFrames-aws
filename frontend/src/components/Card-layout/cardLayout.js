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
  const [shouldReload, setShouldReload] = useState(false);
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
    setShouldReload(true);
  };

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
    if (shouldReload) {
      window.location.reload();
    }
  };

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

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = cardsData.slice(startIndex, endIndex);

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
            onFavoriteToggle={() => handleFavoriteToggle(card._id)}
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
                onFavoriteToggle={() => handleFavoriteToggle(selectedCard._id)}
                onDelete={onDelete}
                onAdminDelete={
                  onAdminDelete ? () => onAdminDelete(selectedCard._id) : null
                }
                isProfile={isProfile}
                isAdminContext={isAdminContext}
                onCardClick={null}
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
