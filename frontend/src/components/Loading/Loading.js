import React from "react";
import "./Loading.css";

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
