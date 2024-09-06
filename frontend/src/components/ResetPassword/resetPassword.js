import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = ({ onClose, onResetPassword, loading, error }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setPasswordError("");
    setSuccessMessage("");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Clear previous messages
  //   setPasswordError("");
  //   setSuccessMessage("");
  //   setPasswordError("");

  //   // Password validation criteria
  //   const isValid = validatePassword(newPassword);
  //   if (!isValid) {
  //     setPasswordError(
  //       "Password must have an uppercase, lowercase letter, number,special character, and be over 8 characters."
  //     );
  //     return;
  //   }

  //   if (newPassword !== confirmPassword) {
  //     setPasswordError("New passwords do not match");
  //     return;
  //   }

  //   // Attempt to reset the password
  //   const success = await onResetPassword(oldPassword, newPassword);
  //   if (success) {
  //     setSuccessMessage("Password successfully reset! Redirecting...");
  //     setTimeout(() => {
  //       navigate("/loginSignup"); // Navigate to the login/signup page after success
  //     }, 1500); // 1.5-second delay before redirect
  //   } else {
  //     setPasswordError(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setSuccessMessage("");

    const isValid = validatePassword(newPassword);
    if (!isValid) {
      setPasswordError(
        "Password must have an uppercase, lowercase letter, number, special character, and be over 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    const { success, message } = await onResetPassword(
      oldPassword,
      newPassword
    );
    if (success) {
      setSuccessMessage("Password successfully reset! Redirecting...");
      setTimeout(() => {
        navigate("/loginSignup");
      }, 1500);
    } else {
      setPasswordError(message || "An error occurred. Please try again.");
    }
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  return (
    <div>
      <div className="reset-password-backdrop" onClick={onClose}></div>

      <div className="reset-password-modal">
        <form onSubmit={handleSubmit}>
          <h2 className="reset-heading">Reset Password</h2>
          {passwordError && (
            <p className="reset-error-message">{passwordError}</p>
          )}
          {error && !successMessage && (
            <p className="reset-error-message">{error}</p>
          )}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}

          <div className="reset-group">
            <label htmlFor="oldPassword">Old Password:</label>
            <div className="password-wrapper">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                value={oldPassword}
                onChange={handleInputChange(setOldPassword)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="reset-group">
            <label htmlFor="newPassword">New Password:</label>
            <div className="password-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={handleInputChange(setNewPassword)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="reset-group">
            <label htmlFor="confirmPassword">Confirm New Password:</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange(setConfirmPassword)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="button-row">
            <button type="submit" disabled={loading} className="button-1">
              {loading ? "Processing..." : "Save"}
            </button>
            <button className="button-2" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
