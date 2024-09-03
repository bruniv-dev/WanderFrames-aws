import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import path from "path";
import { uploadFile } from "../app.js";

//get all posts
export const getAllPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find();
  } catch (err) {
    return console.log(err);
  }

  if (!posts) {
    res.status(500).json({ message: "Unexpected Error occured" });
  }

  return res.status(200).json({ posts });
};

//get post by id
export const getPostById = async (req, res) => {
  const id = req.params.id;

  let post;
  try {
    post = await Post.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!post) {
    res.status(404).json({ message: "No Post Found" });
  }

  return res.status(200).json({ post });
};

export const deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// // Define the base URL
// // const baseUrl = "https://wanderframes.onrender.com";
// const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? "https://wanderframes.onrender.com"
//     : "http://localhost:5000";

// // Your addPost controller function
// export const addPost = async (req, res) => {
//   const { subLocation, description, location, date, locationUrl, postedAt } =
//     req.body;
//   const user = req.user.userId;
//   console.log(user);
//   const imageFiles = req.files;

//   // Generate image URLs
//   const imageUrls = imageFiles.map(
//     (file) => `${baseUrl}/uploads/${path.basename(file.path)}`
//   );

//   try {
//     const post = new Post({
//       subLocation,
//       description,
//       location,
//       date: new Date(date),
//       user,
//       images: imageUrls.map((url) => ({ url })),
//       locationUrl,
//       postedAt,
//     });

//     const session = await mongoose.startSession();
//     session.startTransaction();
//     const existingUser = await User.findById(user);
//     existingUser.posts.push(post);
//     await existingUser.save({ session });
//     await post.save({ session });
//     await session.commitTransaction();
//     session.endSession();

//     return res.status(201).json({ post });
//   } catch (err) {
//     console.error("Error adding post:", err);
//     res.status(500).json({ message: "Unexpected Error Occurred" });
//   }
// };

export const addPost = async (req, res) => {
  try {
    const { subLocation, description, location, date, locationUrl, postedAt } =
      req.body;
    const user = req.user.userId;
    const imageFiles = req.files;

    console.log("Received request body:", req.body);
    console.log("Received files:", req.files);

    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ message: "No images provided" });
    }

    // Upload files to S3 with proper filenames
    const imageUploadPromises = imageFiles.map((file) => {
      // Use original name if available, otherwise default to a generated name
      const originalName = file.originalname || "unnamed-file";
      const uniqueFileName = `${Date.now()}-${originalName}`;
      return uploadFile(file.buffer, uniqueFileName, file.mimetype);
    });

    const uploadResults = await Promise.all(imageUploadPromises);

    const imageUrls = uploadResults.map(
      (result) =>
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${result.Key}`
    );

    const post = new Post({
      subLocation,
      description,
      location,
      date: new Date(date),
      user,
      images: imageUrls.map((url) => ({ url })),
      locationUrl,
      postedAt,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    const existingUser = await User.findById(user);

    if (!existingUser) {
      throw new Error("User not found");
    }

    existingUser.posts.push(post);
    await existingUser.save({ session });
    await post.save({ session });
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ post });
  } catch (err) {
    console.error("Error adding post:", err);
    res
      .status(500)
      .json({ message: "Unexpected Error Occurred", error: err.message });
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { subLocation, description, location, locationUrl } = req.body;
  const image = req.file ? req.file.path : undefined;

  console.log("Received update request with data:", {
    id,
    subLocation,
    description,
    location,
    locationUrl,
    image,
  });

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        subLocation,
        description,
        location,
        locationUrl,
        ...(image && { image: { url: image } }),
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ post: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
