// import { useEffect } from "react";

// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const TOKEN_CHECK_INTERVAL = 60000; // Check every minute

// const useTokenChecker = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkTokenValidity = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (token) {
//           const response = await axios.post(
//             "/user/validate-token",
//             { token },
//             { withCredentials: true }
//           );

//           if (!response.data.isValid) {
//             // Token is invalid or expired
//             localStorage.removeItem("token");
//             localStorage.removeItem("isLoggedIn");
//             localStorage.removeItem("isAdmin");
//             navigate("/loginSignup"); // Redirect to login page
//           }
//         } else {
//           navigate("/loginSignup"); // Redirect if no token is found
//         }
//       } catch (err) {
//         if (err.response && err.response.status === 401) {
//           // Token is invalid or expired
//           localStorage.removeItem("token");
//           localStorage.removeItem("isLoggedIn");
//           localStorage.removeItem("isAdmin");
//           navigate("/loginSignup"); // Redirect to login page
//         }
//       }
//     };

//     // Set interval to check token validity
//     const intervalId = setInterval(checkTokenValidity, TOKEN_CHECK_INTERVAL);

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [navigate]);
// };

// export default useTokenChecker;

// // import { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const TOKEN_CHECK_INTERVAL = 60000; // Check every minute

// // const useTokenChecker = () => {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const checkTokenValidity = async () => {
// //       try {
// //         const token = localStorage.getItem("token");

// //         if (token) {
// //           const response = await axios.post(
// //             "/user/validate-token",
// //             { token },
// //             { withCredentials: true }
// //           );

// //           if (!response.data.isValid) {
// //             // Token is invalid or expired
// //             localStorage.removeItem("token");
// //             localStorage.removeItem("isLoggedIn");
// //             localStorage.removeItem("isAdmin");
// //             navigate("/loginSignup"); // Redirect to login page
// //           }
// //         } else {
// //           navigate("/loginSignup"); // Redirect if no token is found
// //         }
// //       } catch (err) {
// //         if (err.response && err.response.status === 401) {
// //           // Token is invalid or expired
// //           localStorage.removeItem("token");
// //           localStorage.removeItem("isLoggedIn");
// //           localStorage.removeItem("isAdmin");
// //           navigate("/loginSignup"); // Redirect to login page
// //         }
// //       }
// //     };

// //     const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

// //     if (isLoggedIn) {
// //       // Set interval to check token validity
// //       const intervalId = setInterval(checkTokenValidity, TOKEN_CHECK_INTERVAL);

// //       // Cleanup interval on component unmount
// //       return () => clearInterval(intervalId);
// //     }
// //   }, [navigate]);
// // };

// // export default useTokenChecker;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/authSlice";

const TOKEN_CHECK_INTERVAL = 60000; // Check every minute

const useTokenChecker = (isLoggedIn, setShowPopup) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) return; // Do not run if not logged in

    const checkTokenValidity = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.post(
            "/user/validate-token",
            { token },
            { withCredentials: true }
          );

          if (!response.data.isValid) {
            // Token is invalid or expired
            dispatch(authActions.logout()); // Update Redux store
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("isAdmin");

            setShowPopup(true); // Show popup
          }
        } else {
          dispatch(authActions.logout()); // Update Redux store if no token is found
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("isAdmin");

          setShowPopup(true); // Show popup
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Token is invalid or expired
          dispatch(authActions.logout()); // Update Redux store
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("isAdmin");

          setShowPopup(true); // Show popup
        }
      }
    };

    // Set interval to check token validity
    const intervalId = setInterval(checkTokenValidity, TOKEN_CHECK_INTERVAL);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch, isLoggedIn, setShowPopup]);
};

export default useTokenChecker;
