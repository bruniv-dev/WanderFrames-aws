// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Popup from "../ErrorPages/PopupCard";
// // import axios from "axios";
// // import { useSelector, useDispatch } from "react-redux"; // Import useDispatch to dispatch logout action
// // import { authActions } from "../../store/authSlice"; // Adjust the path as necessary

// // const SESSION_DURATION = 120000; // 1 hour in milliseconds
// // const WARNING_TIME = 60000; // 2 minutes before expiration

// // const SessionTimeout = () => {
// //   const [showPopup, setShowPopup] = useState(false);
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Access Redux state

// //   useEffect(() => {
// //     console.log("SessionTimeout component mounted");

// //     if (isLoggedIn) {
// //       const token = localStorage.getItem("token");
// //       console.log("Token:", token);

// //       if (token) {
// //         const sessionTimeout = setTimeout(() => {
// //           console.log("Showing popup...");
// //           setShowPopup(true); // Show the popup when session is about to expire
// //         }, SESSION_DURATION - WARNING_TIME);

// //         console.log("Setting session timeout...");

// //         return () => {
// //           console.log("SessionTimeout component unmounted, clearing timeout");
// //           clearTimeout(sessionTimeout); // Clear timeout if component unmounts
// //         };
// //       }
// //     } else {
// //       console.log("User not logged in, skipping session timeout...");
// //     }
// //   }, [isLoggedIn]); // Dependency array to trigger re-run if isLoggedIn changes

// //   const handleLogout = async () => {
// //     try {
// //       console.log("Attempting to log out...");

// //       // Make a request to the backend to remove the cookie
// //       await axios.post("/user/logout", {}, { withCredentials: true });

// //       console.log("Logged out successfully.");
// //       dispatch(authActions.logout()); // Dispatch the logout action to update Redux state
// //     } catch (error) {
// //       console.error("Logout failed:", error);
// //     }

// //     // Clear session data from localStorage
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("isLoggedIn");
// //     localStorage.removeItem("isAdmin");
// //   };

// //   const handleConfirm = async () => {
// //     await handleLogout();
// //     setShowPopup(false);
// //     navigate("/loginSignup");
// //   };

// //   const handleClose = async () => {
// //     await handleLogout();
// //     setShowPopup(false);
// //     navigate("/");
// //   };

// //   return (
// //     <Popup
// //       showPopup={showPopup}
// //       onClose={handleClose}
// //       onConfirm={handleConfirm}
// //       confirmText="Login"
// //       message={{
// //         title: "Session Expired",
// //         body: "Your session has expired. Please log in again to continue.",
// //       }}
// //     />
// //   );
// // };

// // export default SessionTimeout;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Popup from "../ErrorPages/PopupCard";
// import useTokenChecker from "./TokenChecker";
// import { useSelector } from "react-redux";

// const SessionTimeout = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

//   // Use the custom hook for token checking
//   const { isTokenValid } = useTokenChecker();

//   useEffect(() => {
//     if (isLoggedIn && !isTokenValid) {
//       // Token is invalid or expired
//       setShowPopup(true); // Show the popup
//     }
//   }, [isLoggedIn, isTokenValid]);

//   const handleConfirm = () => {
//     setShowPopup(false);
//     navigate("/loginSignup");
//   };

//   const handleClose = () => {
//     setShowPopup(false);
//     navigate("/");
//   };

//   return (
//     <Popup
//       showPopup={showPopup}
//       onClose={handleClose}
//       onConfirm={handleConfirm}
//       confirmText="Login"
//       message={{
//         title: "Session Expired",
//         body: "Your session has expired. Please log in again to continue.",
//       }}
//     />
//   );
// };

// export default SessionTimeout;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../ErrorPages/PopupCard";
import useTokenChecker from "./TokenChecker";
import { useSelector } from "react-redux";

const SessionTimeout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Use the custom hook for token checking, only when logged in
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
