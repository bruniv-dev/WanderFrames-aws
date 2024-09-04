// dotenv to configure path for .env which holds secure credentials
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// dotenv.config({
//   path: path.resolve(fileURLToPath(import.meta.url), "..", "config.env"),
// });

// basic node and express setup
import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an uploads directory if it doesn't exist
export const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

dotenv.config({
  path: path.resolve(__dirname, "config.env"),
});

// Serve static files from "uploads" directory
const app = express();
app.use("/uploads", express.static(uploadDir));

// Import routes - middleware
import userRouter from "./routers/user-routes.js"; // http://localhost:3000/user
import postRouter from "./routers/post-routes.js"; // http://localhost:3000/post

const allowedOrigins = [
  "http://localhost:3000", // Development frontend
  "https://wanderframes.onrender.com", // Production frontend
  "https://wanderframes.netlify.app",
];

// Middleware setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials
  })
);

app.use(cookieParser());

app.use(express.json()); // to process JSON data sent from requests

// Routes
app.use("/user", userRouter); // User-based routes
app.use("/post", postRouter); // Post-based routes

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export function deleteFile(fileName) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

export async function uploadFile(fileBuffer, fileName, mimetype) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };

  const data = await s3Client.send(new PutObjectCommand(uploadParams));
  console.log("Upload data:", data); // Check what is returned
  return {
    Key: fileName, // Return the Key used for the upload
  };
}

export async function getObjectSignedUrl(key) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);
  const seconds = 3600;
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url;
}

// mongoose setup

const mongoUri = `mongodb+srv://brunivdev:${process.env.MONGODB_PASSWORD}@cluster0.4xivc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connection Successful with MongoDB Cloud"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
