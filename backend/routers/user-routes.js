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

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/check-username/:username", checkUsernameAvailability);
userRouter.get("/:userId", authenticateToken, getUserById);
userRouter.get("/by-token/me", authenticateToken, getUserByToken);
userRouter.post("/logout", authenticateToken, logoutUser);
userRouter.get("/profile/:userId", authenticateToken, getUserProfile);
userRouter.get("/posts/:userId", authenticateToken, getUserPosts);

userRouter.put(
  "/:userId",
  uploadSingle.single("profileImage"),
  authenticateToken,
  checkProfileOwnershipAndAdminPrivileges,
  updateUserProfile
);

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
