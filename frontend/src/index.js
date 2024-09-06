import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";

// Optional: Set default base URL for Axios if required globally
// axios.defaults.baseURL = "http://localhost:5000";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://wanderframes-aws.onrender.com"
    : "http://localhost:5000";

// const baseUrl = "https://wanderframes-aws.onrender.com";

axios.defaults.baseURL = baseUrl;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
