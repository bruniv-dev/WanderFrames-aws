import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditPost.css";
import Header from "../Header/header";
import { fetchPostById, updatePost } from "../api-helpers/helpers";
import Footer from "../footer/footer";

const EditPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.state?.postId;

  const [formData, setFormData] = useState({
    images: [],
    location: "",
    subLocation: "",
    description: "",
    date: "",
    locationUrl: "",
  });

  const [post, setPost] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!postId) {
      console.error("No postId found in state");
      navigate("/error");
      return;
    }

    fetchPostById(postId)
      .then((data) => {
        const post = data.post;
        setPost(post);
        setFormData({
          images: post.images || [],
          location: post.location,
          subLocation: post.subLocation,
          description: post.description,
          date: new Date(post.date).toISOString().split("T")[0],
          locationUrl: post.locationUrl || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching post details:", err);
        navigate("/error");
      });
  }, [postId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPost = {
      ...formData,
    };

    updatePost(postId, updatedPost)
      .then((response) => {
        console.log("Post updated successfully:", response);
        setSuccess("Post Updated Sucessfully!");
        setTimeout(() => {
          navigate("/profile", { state: { refresh: true } });
        }, 2000);
      })
      .catch((err) => {
        console.error("Error updating post:", err);
        setError("Failed to update post");
      });
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? formData.images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === formData.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <Header
        classNameheader="edit-header"
        classNamelogo="edit-logo"
        classNamenav="edit-nav"
        classNamesignin="edit-signin"
        logoSrc={`Logo_black_green.svg`}
      />

      <div className="edit-container">
        {error ? (
          <div className="notif error-message">{error}</div>
        ) : success ? (
          <div className="notif success-message">{success}</div>
        ) : null}
        {post && (
          <form className="edit-form" onSubmit={handleSubmit}>
            <div className="left-section">
              <p className="edit-label images">Images:</p>
              <div className="image-slider">
                {formData.images.length > 0 && (
                  <>
                    {formData.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="editpost-slider-button prev"
                          onClick={goToPreviousImage}
                        >
                          &#10094;
                        </button>
                        <button
                          type="button"
                          className="editpost-slider-button next"
                          onClick={goToNextImage}
                        >
                          &#10095;
                        </button>
                      </>
                    )}
                    <div className="slider-image-container">
                      <img
                        src={formData.images[currentImageIndex].url}
                        alt={`Slide ${currentImageIndex + 1}`}
                        className="slider-image"
                      />
                    </div>
                  </>
                )}
                {formData.images.length > 1 && (
                  <div className="editpost-slider-dots">
                    {formData.images.map((_, index) => (
                      <span
                        key={index}
                        className={`editpost-dot ${
                          currentImageIndex === index ? "active" : ""
                        }`}
                        onClick={() => handleDotClick(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <label htmlFor="date" className="edit-label date">
                Date
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  className="edit-input"
                  required
                  disabled
                />
              </label>
            </div>
            <div className="right-section">
              <label htmlFor="location" className="edit-label">
                Location
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="edit-input"
                  required
                />
              </label>
              <label htmlFor="subLocation" className="edit-label">
                Sub-Location
                <input
                  type="text"
                  id="subLocation"
                  name="subLocation"
                  value={formData.subLocation}
                  onChange={handleInputChange}
                  className="edit-input"
                  required
                />
              </label>
              <label htmlFor="locationUrl" className="edit-label">
                Google Maps URL
                <input
                  type="url"
                  id="locationUrl"
                  name="locationUrl"
                  value={formData.locationUrl}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              </label>
              <label htmlFor="description" className="edit-label">
                Description
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="edit-input"
                  required
                />
              </label>
            </div>
            <div className="editPost-buttons">
              <button type="submit" className="submit-button">
                Update
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EditPost;
