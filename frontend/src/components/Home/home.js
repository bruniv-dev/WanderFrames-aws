import React, { useState } from "react";
import "./Home.css";
import Header from "../Header/header.js";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading.js";
import Popup from "../ErrorPages/PopupCard.js";
import Footer from "../footer/footer.js";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [confirmBtnText, setConfirmBtnText] = useState("");
  const handleShareJourneyClick = () => {
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    if (isLoggedIn) {
      navigate("/upload");
    } else {
      setShowPopup(true);
      setConfirmBtnText("Log In");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleLoginRedirect = () => {
    handleClosePopup();
    navigate("/loginSignup");
  };

  const handleVideoLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <Header
        classNameheader="home-header"
        classNamelogo="home-logo"
        classNamenav="home-nav"
        classNamesignin="home-signin"
        classNameHamburger="home-ham"
        logoSrc={`Logo_white.svg`}
      />
      <div className="home-container">
        <video autoPlay loop muted playsInline onLoadedData={handleVideoLoad}>
          <source
            src={`${process.env.PUBLIC_URL}/beach3.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="home-flex">
          <h1 className="heading">WANDER FRAMES</h1>
          <h4 className="sub-heading">
            From your lens to the world: let your adventures inspire.
          </h4>

          <div className="home-hero-buttons">
            <Link
              to="/inspirations"
              className="home-hero-btn home-hero-button-1"
            >
              Explore Inspirations
            </Link>
            <button
              onClick={handleShareJourneyClick}
              className="home-hero-btn home-hero-button-2"
            >
              Share Your Journey
            </button>
          </div>
          <p className="slogan">
            CAPTURE <span className="dots slogan-dot-1">.</span> SHARE{" "}
            <span className="dots slogan-dot-2">.</span> INSPIRE
          </p>
        </div>

        <Popup
          showPopup={showPopup}
          onClose={handleClosePopup}
          onConfirm={handleLoginRedirect}
          confirmBtnText={confirmBtnText}
          message={{
            title: "Please Log In.",
            body: "You need to be signed in to add posts.",
          }}
        />
      </div>
      <Footer customClass="home" />
    </>
  );
};

export default Home;
