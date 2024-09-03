// // import React from "react";
// // import { Navigate } from "react-router-dom";
// // import { useSelector } from "react-redux";

// // const ProtectedRoute = ({ element: Component }) => {
// //   const isloggedIn = useSelector((state) => state.isloggedIn); // Fetch the logged-in status from Redux

// //   return isloggedIn ? <Component /> : <Navigate to="/please-login" />;
// // };

// // export default ProtectedRoute;

// // import React from "react";
// // import { Navigate } from "react-router-dom";
// // import { useSelector } from "react-redux";

// // const ProtectedRoute = ({ element: Component, ...rest }) => {
// //   const { isloggedIn, isAdmin } = useSelector((state) => state.auth);

// //   if (!isloggedIn) {
// //     return <Navigate to="/loginSignup" />;
// //   }

// //   if (!isAdmin) {
// //     return <Navigate to="/unauthorized" />;
// //   }

// //   return <Component {...rest} />;
// // };

// // export default ProtectedRoute;

// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ element }) => {
//   const authState = useSelector((state) => state.auth);
//   const { isLoggedIn } = authState || {};

//   if (!isLoggedIn) {
//     // Redirect to login if not authenticated
//     return <Navigate to="/loginSignup" />;
//   }

//   return element;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const authState = useSelector((state) => state.auth);
  const { isLoggedIn } = authState || {};

  // Add a loading state check if authentication status is still being determined
  if (isLoggedIn === undefined) {
    // Optionally, return a loading spinner or placeholder while checking auth status
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    // Redirect to login if not authenticated
    return <Navigate to="/loginSignup" />;
  }

  // Render the protected component if authenticated
  return element;
};

export default ProtectedRoute;
