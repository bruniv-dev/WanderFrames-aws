import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const authenticateToken = async (req, res, next) => {
  console.log("Cookies:", req.cookies); // Add this line to debug
  const token = req.cookies["token"];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const user = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    const dbUser = await User.findById(user.userId);
    if (!dbUser) {
      return res
        .status(403)
        .json({ message: "User not found, authentication failed." });
    }

    req.user = user;
    console.log(req.user);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please log in again." });
    }
    return res.status(403).json({ message: "Invalid token." });
  }
};

export const checkPostOwnershipAndAdminPrivileges = async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user.userId;
  const isAdmin = req.user.isAdmin;
  console.log(`userID from token put ${userId}`);
  try {
    const post = await Post.findById(postId); // Replace with your ORM or DB query
    if (!post) {
      return res.sendStatus(404); // Post not found
    }
    console.log(`user id from fetched post ${post.user}`);
    if (post.user.toString() !== userId.toString() && !isAdmin) {
      return res.sendStatus(403); // Forbidden if not the owner and not an admin
    }

    next(); // Proceed to the controller if ownership or admin check passes
  } catch (error) {
    console.error("Error checking ownership:", error);
    res.sendStatus(500); // Internal server error
  }
};

export const checkProfileOwnershipAndAdminPrivileges = async (
  req,
  res,
  next
) => {
  const userIdFromParams = req.params.userId; // ID from the URL params
  const userIdFromToken = req.user.userId; // ID from the authenticated token
  const isAdmin = req.user.isAdmin;
  console.log(
    `token-userid ${userIdFromToken}, params ${userIdFromParams}, ${isAdmin}`
  );
  try {
    if (
      userIdFromParams.toString() !== userIdFromToken.toString() &&
      !isAdmin
    ) {
      return res.status(403).json({
        message: "You do not have permission to update this profile.",
      });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error checking profile ownership:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const checkAdminPrivileges = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next(); // Proceed if the user is an admin
  }
  return res.status(403).json({ message: "Forbidden: Admins only." }); // Respond with forbidden if not an admin
};

export const validateToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(400)
      .json({ isValid: false, message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // Check if the error is due to token expiry
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ isValid: false, message: "Token expired" });
      }

      // Handle other JWT errors (e.g., signature issues)
      return res.status(401).json({ isValid: false, message: "Invalid token" });
    }

    // Token is valid
    res.status(200).json({
      isValid: true,
      userId: decoded.userId,
      isAdmin: decoded.isAdmin,
    });
  });
};

// export const refreshToken = (req, res) => {
//   const { refreshToken } = req.body;

//   if (!refreshToken)
//     return res.status(401).json({ message: "No refresh token provided" });

//   jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid refresh token" });

//     const accessToken = jwt.sign(
//       { userId: user.userId },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" } // Access token expires in 1 hour
//     );

//     res.status(200).json({
//       accessToken,
//       message: "Access token refreshed successfully",
//     });
//   });
// };
