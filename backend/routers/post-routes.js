import { Router } from "express";
import multer from "multer";
import {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post-controllers.js";
import { authenticateToken } from "../middleware/jwt.js";
import { checkPostOwnershipAndAdminPrivileges } from "../middleware/jwt.js";

const storage = multer.memoryStorage();
const uploadMultiple = multer({ storage }).array("images", 3);

const postRouter = Router();

postRouter.get("/", getAllPosts);
postRouter.post("/addPost", authenticateToken, uploadMultiple, addPost);
postRouter.get("/:id", authenticateToken, getPostById);
postRouter.put(
  "/:id",
  authenticateToken,
  checkPostOwnershipAndAdminPrivileges,
  updatePost
);
postRouter.delete(
  "/:id",
  authenticateToken,
  checkPostOwnershipAndAdminPrivileges,
  deletePost
);

export default postRouter;
