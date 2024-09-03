import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, // Use the default export here
  },
});

export default store;
