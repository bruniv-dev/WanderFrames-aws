import React from "react";
import "./Loading.css"; // Create appropriate CSS for styling

const Loading = () => (
  <div className="loading-overlay">
    <div className="dot-loader">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  </div>
);

export default Loading;
