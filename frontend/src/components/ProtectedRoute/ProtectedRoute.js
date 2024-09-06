import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const authState = useSelector((state) => state.auth);
  const { isLoggedIn } = authState || {};

  if (isLoggedIn === undefined) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/loginSignup" />;
  }

  return element;
};

export default ProtectedRoute;
