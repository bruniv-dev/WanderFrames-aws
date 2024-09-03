// // user-routes.js
// import { Router } from "express";
// import multer from "multer";

// import {
//   getAllUsers,
//   login,
//   signup,
//   deleteUser,
//   toggleFavorite,
//   getFavorites,
//   getUserProfile,
//   getUserPosts,
//   getUserById,
//   deleteUserAccount,
//   updateUserProfile,
//   verifySecurityAnswer,
//   resetPassword,
//   updateUserOrAdminRole,
//   checkUsernameAvailability,
//   requestReset,
//   forgotPasswordReset,
//   getUserByToken,
//   logoutUser,
// } from "../controllers/user-controllers.js";

// import {
//   authenticateToken,
//   checkProfileOwnershipAndAdminPrivileges,
//   checkAdminPrivileges,
//   validateToken,
// } from "../middleware/jwt.js";

// // Multer setup
// const storageSingle = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix =
//       new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname;
//     cb(null, uniqueSuffix);
//   },
// });
// const uploadSingle = multer({ storage: storageSingle });
// // const upload = multer({ dest: "uploads/" }); // Configure multer
// const userRouter = Router();
// // Define routes
// userRouter.get("/", getAllUsers);
// userRouter.post("/signup", signup);
// userRouter.post("/login", login);
// userRouter.get("/check-username/:username", checkUsernameAvailability);
// userRouter.get("/:userId", authenticateToken, getUserById);
// userRouter.get("/by-token/me", authenticateToken, getUserByToken);
// userRouter.post("/logout", authenticateToken, logoutUser);
// userRouter.get("/profile/:userId", authenticateToken, getUserProfile);
// userRouter.get("/posts/:userId", authenticateToken, getUserPosts);
// userRouter.put(
//   "/:userId",
//   uploadSingle.single("profileImage"),
//   authenticateToken,
//   checkProfileOwnershipAndAdminPrivileges,
//   updateUserProfile
// );

// // userRouter.delete("/:id", authenticateToken, deleteUserAccount);
// userRouter.delete(
//   "/:userId",
//   authenticateToken,
//   checkProfileOwnershipAndAdminPrivileges,
//   deleteUser
// );

// userRouter.post("/verifySecurityAnswer", verifySecurityAnswer);
// userRouter.post("/toggleFavorite", authenticateToken, toggleFavorite);
// userRouter.get("/favorites/:userId", authenticateToken, getFavorites);
// userRouter.post("/reset-password/:userId", authenticateToken, resetPassword);
// userRouter.put(
//   "/:userId/isAdmin",
//   authenticateToken,
//   checkAdminPrivileges,
//   updateUserOrAdminRole
// );
// userRouter.post("/requestReset", requestReset);
// userRouter.post("/forgot-password-reset/:userId", forgotPasswordReset);
// userRouter.post("/validate-token", validateToken);
// // userRouter.get("/check-auth", authenticateToken, checkAuth);
// export default userRouter;

import { Router } from "express";
import multer from "multer";
import path from "path";

import {
  getAllUsers,
  login,
  signup,
  deleteUser,
  toggleFavorite,
  getFavorites,
  getUserProfile,
  getUserPosts,
  getUserById,
  deleteUserAccount,
  updateUserProfile,
  verifySecurityAnswer,
  resetPassword,
  updateUserOrAdminRole,
  checkUsernameAvailability,
  requestReset,
  forgotPasswordReset,
  getUserByToken,
  logoutUser,
} from "../controllers/user-controllers.js";

import {
  authenticateToken,
  checkProfileOwnershipAndAdminPrivileges,
  checkAdminPrivileges,
  validateToken,
} from "../middleware/jwt.js";

// Multer setup for single file upload
const storageMemory = multer.memoryStorage();
const uploadSingle = multer({ storage: storageMemory });

const userRouter = Router();

// Define routes
userRouter.get("/", getAllUsers);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/check-username/:username", checkUsernameAvailability);
userRouter.get("/:userId", authenticateToken, getUserById);
userRouter.get("/by-token/me", authenticateToken, getUserByToken);
userRouter.post("/logout", authenticateToken, logoutUser);
userRouter.get("/profile/:userId", authenticateToken, getUserProfile);
userRouter.get("/posts/:userId", authenticateToken, getUserPosts);

// Route for updating user profile with profile image upload
userRouter.put(
  "/:userId",
  uploadSingle.single("profileImage"), // Handle single file upload
  authenticateToken,
  checkProfileOwnershipAndAdminPrivileges,
  updateUserProfile // Controller function handling profile update
);

// Route for deleting user account
userRouter.delete(
  "/:userId",
  authenticateToken,
  checkProfileOwnershipAndAdminPrivileges,
  deleteUser
);

userRouter.post("/verifySecurityAnswer", verifySecurityAnswer);
userRouter.post("/toggleFavorite", authenticateToken, toggleFavorite);
userRouter.get("/favorites/:userId", authenticateToken, getFavorites);
userRouter.post("/reset-password/:userId", authenticateToken, resetPassword);
userRouter.put(
  "/:userId/isAdmin",
  authenticateToken,
  checkAdminPrivileges,
  updateUserOrAdminRole
);
userRouter.post("/requestReset", requestReset);
userRouter.post("/forgot-password-reset/:userId", forgotPasswordReset);
userRouter.post("/validate-token", validateToken);

export default userRouter;
