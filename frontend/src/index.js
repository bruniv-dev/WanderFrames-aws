// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import axios from "axios";
// import { Provider } from "react-redux";
// import store from "./store/store";
// axios.defaults.baseURL = "http://localhost:5000";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { store } from "./store"; // Assuming the store is exported from a `store.js` file
// import App from "./App"; // Assuming your main App component is in `App.js`
// import { checkAuthStatus } from "./store/authSlice";

// // Check the user's authentication status when the app loads
// store.dispatch(checkAuthStatus());

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
// import axios from "axios";
// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router } from "react-router-dom";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./store/authSlice"; // Import the default export
// import App from "./App"; // Adjust the import path as necessary
// axios.defaults.baseURL = "http://localhost:5000";
// // Create the Redux store
// const store = configureStore({
//   reducer: {
//     auth: authReducer, // Use the default export here
//   },
// });

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Router>
//         <App />
//       </Router>
//     </Provider>
//   </React.StrictMode>
// );

import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App"; // Ensure correct import path
import store from "./store/store";

// Optional: Set default base URL for Axios if required globally
// axios.defaults.baseURL = "http://localhost:5000";

// Example environment variables
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api-wanderframes.onrender.com"
    : "http://localhost:5000";

// const baseUrl = "https://api-wanderframes.onrender.com";

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
