// import React, { useEffect, useRef } from "react";
import "./PopupCard.css";

const Popup = ({ showPopup, onClose, onConfirm, confirmBtnText, message }) => {
  // const popupRef = useRef();

  // const handleClickOutside = (event) => {
  //   if (popupRef.current && !popupRef.current.contains(event.target)) {
  //     onClose();
  //   }
  // };

  // useEffect(() => {
  //   if (showPopup) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [showPopup]);

  if (!showPopup) return null;

  return (
    <div className="popup-overlay">
      {/* <div className="popup-content" ref={popupRef}> */}
      <div className="popup-content">
        <h2>{message.title}</h2>
        <p>{message.body}</p>
        <div className="popup-buttons">
          <button onClick={onConfirm} className="popup-button btn1">
            {confirmBtnText}
          </button>
          <button onClick={onClose} className="popup-button btn2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
