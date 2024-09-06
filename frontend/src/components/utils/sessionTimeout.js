import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../ErrorPages/PopupCard";
import useTokenChecker from "./TokenChecker";
import { useSelector } from "react-redux";

const SessionTimeout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useTokenChecker(isLoggedIn, setShowPopup);

  const handleConfirm = () => {
    setShowPopup(false);
    navigate("/loginSignup");
  };

  const handleClose = () => {
    setShowPopup(false);
    navigate("/");
  };

  return (
    <Popup
      showPopup={showPopup}
      onClose={handleClose}
      onConfirm={handleConfirm}
      confirmBtnText="Log In"
      message={{
        title: "Session Expired",
        body: "Your session has expired. Please log in again to continue.",
      }}
    />
  );
};

export default SessionTimeout;
