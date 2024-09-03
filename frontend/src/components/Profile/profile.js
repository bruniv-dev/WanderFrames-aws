// // // // // import React, { useState, useEffect } from "react";
// // // // // import {
// // // // //   fetchUserProfile,
// // // // //   fetchUserPosts,
// // // // //   deleteUserAccount,
// // // // //   resetPassword,
// // // // // } from "../api-helpers/helpers";
// // // // // import CardLayout from "../Card-layout/cardLayout";
// // // // // import "./Profile.css";
// // // // // import Header from "../Header/header";
// // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // import { useDispatch } from "react-redux";
// // // // // import { authActions } from "../../store/authSlice";
// // // // // import ResetPassword from "../ResetPassword/resetPassword";
// // // // // import { MdDeleteForever, MdEdit } from "react-icons/md";
// // // // // import Loading from "../Loading/Loading";

// // // // // const Profile = () => {
// // // // //   const [user, setUser] = useState(null);
// // // // //   const [posts, setPosts] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [isResettingPassword, setIsResettingPassword] = useState(false);
// // // // //   const location = useLocation();
// // // // //   const navigate = useNavigate();
// // // // //   const dispatch = useDispatch();

// // // // //   const fetchUserDetails = async () => {
// // // // //     try {
// // // // //       const userId = localStorage.getItem("userId");
// // // // //       if (!userId) {
// // // // //         throw new Error("User not authenticated");
// // // // //       }
// // // // //       const userData = await fetchUserProfile(userId);
// // // // //       setUser(userData.user);
// // // // //       const userPosts = await fetchUserPosts(userId);
// // // // //       setPosts(userPosts);
// // // // //     } catch (err) {
// // // // //       console.error("Error fetching user details or posts:", err);
// // // // //       setError(
// // // // //         err.response?.data?.message || "Failed to fetch user details or posts"
// // // // //       );
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchUserDetails();
// // // // //   }, [location.state?.refresh]);

// // // // //   const handlePostDelete = async (postId) => {
// // // // //     try {
// // // // //       setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
// // // // //       await fetchUserDetails();
// // // // //     } catch (err) {
// // // // //       console.error("Error deleting post:", err);
// // // // //       setError("Failed to delete post.");
// // // // //     }
// // // // //   };

// // // // //   const handleDeleteProfile = async () => {
// // // // //     const confirmDelete = window.confirm(
// // // // //       "Are you sure you want to delete your account? This action cannot be undone."
// // // // //     );
// // // // //     if (confirmDelete) {
// // // // //       try {
// // // // //         const userId = localStorage.getItem("userId");
// // // // //         if (!userId) {
// // // // //           throw new Error("User not authenticated");
// // // // //         }
// // // // //         await deleteUserAccount(userId);
// // // // //         localStorage.removeItem("userId");
// // // // //         dispatch(authActions.logout());
// // // // //         navigate("/loginSignup");
// // // // //       } catch (err) {
// // // // //         console.error("Error deleting user profile:", err);
// // // // //         setError("Failed to delete profile.");
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleResetPassword = async (oldPassword, newPassword) => {
// // // // //     try {
// // // // //       const userId = localStorage.getItem("userId");
// // // // //       if (!userId) {
// // // // //         throw new Error("User ID not found. Please log in again.");
// // // // //       }
// // // // //       await resetPassword(userId, oldPassword, newPassword);
// // // // //       // Don't show alert; let ResetPassword handle the success message
// // // // //       return true;
// // // // //     } catch (err) {
// // // // //       console.error("Error resetting password:", err);
// // // // //       setError(
// // // // //         err.response?.data?.message ||
// // // // //           "Failed to reset password. Please try again."
// // // // //       );
// // // // //       return false;
// // // // //     }
// // // // //   };

// // // // //   const formatDate = (dateString) => {
// // // // //     const options = { day: "2-digit", month: "long", year: "numeric" };
// // // // //     return new Intl.DateTimeFormat("en-GB", options).format(
// // // // //       new Date(dateString)
// // // // //     );
// // // // //   };

// // // // //   if (loading) {
// // // // //     return <Loading />;
// // // // //   }

// // // // //   return (
// // // // //     <>
// // // // //       <Header
// // // // //         classNameheader="profile-header"
// // // // //         classNamelogo="profile-logo"
// // // // //         classNamenav="profile-nav"
// // // // //         classNamesignin="profile-signin"
// // // // //       />
// // // // //       <div className="profile-container">
// // // // //         <h2 className="profile-heading">Profile</h2>
// // // // //         {user ? (
// // // // //           <div className="profile-details">
// // // // //             <div className="profile-image">
// // // // //               <img src={user.profileImage} alt="Profile" />
// // // // //             </div>
// // // // //             <div className="profile-info">
// // // // //               <h2 className="username">{user.username}</h2>
// // // // //               <h3 className="name">{`${user.firstName} ${user.lastName}`}</h3>
// // // // //               <p>{user.email}</p>
// // // // //               <p>{user.bio || "Hi, I'm excited to share my travel diaries."}</p>
// // // // //               <p
// // // // //                 className="role"
// // // // //                 style={{ color: user.isAdmin ? "red" : "black" }}
// // // // //               >
// // // // //                 {user.isAdmin ? "Admin" : "User"}
// // // // //               </p>
// // // // //               <p>Joined: {formatDate(user.createdAt)}</p>
// // // // //               <div className="profile-header-buttons">
// // // // //                 <MdEdit
// // // // //                   onClick={() =>
// // // // //                     navigate("/editProfile", { state: { userId: user._id } })
// // // // //                   }
// // // // //                   className="profile-edit-button"
// // // // //                 />
// // // // //                 <MdDeleteForever
// // // // //                   onClick={handleDeleteProfile}
// // // // //                   className="profile-delete-button"
// // // // //                 />
// // // // //                 <button
// // // // //                   onClick={() => setIsResettingPassword(true)}
// // // // //                   className="reset-password-button"
// // // // //                 >
// // // // //                   Reset Password
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         ) : (
// // // // //           <p>No user data available</p>
// // // // //         )}
// // // // //         <div className="posts-section">
// // // // //           <h2>Posts</h2>
// // // // //           {posts.length > 0 ? (
// // // // //             <CardLayout
// // // // //               cardsData={posts}
// // // // //               onDelete={handlePostDelete}
// // // // //               isProfile={true}
// // // // //             />
// // // // //           ) : (
// // // // //             <p className="no-posts-message">No posts available</p>
// // // // //           )}
// // // // //         </div>
// // // // //         {isResettingPassword && (
// // // // //           <ResetPassword
// // // // //             onClose={() => setIsResettingPassword(false)}
// // // // //             onResetPassword={handleResetPassword}
// // // // //             loading={loading}
// // // // //             error={error}
// // // // //           />
// // // // //         )}
// // // // //         {error && <div className="error-message">{error}</div>}
// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // };

// // // // // export default Profile;

// // // // import React, { useState, useEffect } from "react";
// // // // import {
// // // //   fetchUserDetailsByToken,
// // // //   fetchUserPosts,
// // // //   deleteUserAccount,
// // // //   resetPassword,
// // // // } from "../api-helpers/helpers";
// // // // import CardLayout from "../Card-layout/cardLayout";
// // // // import "./Profile.css";
// // // // import Header from "../Header/header";
// // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // import { useDispatch } from "react-redux";
// // // // import { authActions } from "../../store/authSlice";
// // // // import ResetPassword from "../ResetPassword/resetPassword";
// // // // import { MdDeleteForever, MdEdit } from "react-icons/md";
// // // // import Loading from "../Loading/Loading";

// // // // const Profile = () => {
// // // //   const [user, setUser] = useState(null);
// // // //   const [posts, setPosts] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [isResettingPassword, setIsResettingPassword] = useState(false);
// // // //   const location = useLocation();
// // // //   const navigate = useNavigate();
// // // //   const dispatch = useDispatch();

// // // //   const fetchUserDetails = async () => {
// // // //     try {
// // // //       const userData = await fetchUserDetailsByToken(); // Fetch user details with token
// // // //       setUser(userData.user);
// // // //       const userPosts = await fetchUserPosts(userData.user._id);
// // // //       setPosts(userPosts);
// // // //     } catch (err) {
// // // //       console.error("Error fetching user details or posts:", err);
// // // //       setError(
// // // //         err.response?.data?.message || "Failed to fetch user details or posts"
// // // //       );
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchUserDetails();
// // // //   }, [location.state?.refresh]);

// // // //   const handlePostDelete = async (postId) => {
// // // //     try {
// // // //       setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
// // // //       await fetchUserDetails();
// // // //     } catch (err) {
// // // //       console.error("Error deleting post:", err);
// // // //       setError("Failed to delete post.");
// // // //     }
// // // //   };

// // // //   const handleDeleteProfile = async () => {
// // // //     const confirmDelete = window.confirm(
// // // //       "Are you sure you want to delete your account? This action cannot be undone."
// // // //     );
// // // //     if (confirmDelete) {
// // // //       try {
// // // //         await deleteUserAccount(); // No need for userId, the token is used for auth
// // // //         dispatch(authActions.logout());
// // // //         navigate("/loginSignup");
// // // //       } catch (err) {
// // // //         console.error("Error deleting user profile:", err);
// // // //         setError("Failed to delete profile.");
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleResetPassword = async (oldPassword, newPassword) => {
// // // //     try {
// // // //       await resetPassword(oldPassword, newPassword); // Token is used for auth
// // // //       return true;
// // // //     } catch (err) {
// // // //       console.error("Error resetting password:", err);
// // // //       setError(
// // // //         err.response?.data?.message ||
// // // //           "Failed to reset password. Please try again."
// // // //       );
// // // //       return false;
// // // //     }
// // // //   };

// // // //   const formatDate = (dateString) => {
// // // //     const options = { day: "2-digit", month: "long", year: "numeric" };
// // // //     return new Intl.DateTimeFormat("en-GB", options).format(
// // // //       new Date(dateString)
// // // //     );
// // // //   };

// // // //   if (loading) {
// // // //     return <Loading />;
// // // //   }

// // // //   return (
// // // //     <>
// // // //       <Header
// // // //         classNameheader="profile-header"
// // // //         classNamelogo="profile-logo"
// // // //         classNamenav="profile-nav"
// // // //         classNamesignin="profile-signin"
// // // //       />
// // // //       <div className="profile-container">
// // // //         <h2 className="profile-heading">Profile</h2>
// // // //         {user ? (
// // // //           <div className="profile-details">
// // // //             <div className="profile-image">
// // // //               <img src={user.profileImage} alt="Profile" />
// // // //             </div>
// // // //             <div className="profile-info">
// // // //               <h2 className="username">{user.username}</h2>
// // // //               <h3 className="name">{`${user.firstName} ${user.lastName}`}</h3>
// // // //               <p>{user.email}</p>
// // // //               <p>{user.bio || "Hi, I'm excited to share my travel diaries."}</p>
// // // //               <p
// // // //                 className="role"
// // // //                 style={{ color: user.isAdmin ? "red" : "black" }}
// // // //               >
// // // //                 {user.isAdmin ? "Admin" : "User"}
// // // //               </p>
// // // //               <p>Joined: {formatDate(user.createdAt)}</p>
// // // //               <div className="profile-header-buttons">
// // // //                 <MdEdit
// // // //                   onClick={() =>
// // // //                     navigate("/editProfile", { state: { userId: user._id } })
// // // //                   }
// // // //                   className="profile-edit-button"
// // // //                 />
// // // //                 <MdDeleteForever
// // // //                   onClick={handleDeleteProfile}
// // // //                   className="profile-delete-button"
// // // //                 />
// // // //                 <button
// // // //                   onClick={() => setIsResettingPassword(true)}
// // // //                   className="reset-password-button"
// // // //                 >
// // // //                   Reset Password
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         ) : (
// // // //           <p>No user data available</p>
// // // //         )}
// // // //         <div className="posts-section">
// // // //           <h2>Posts</h2>
// // // //           {posts.length > 0 ? (
// // // //             <CardLayout
// // // //               cardsData={posts}
// // // //               onDelete={handlePostDelete}
// // // //               isProfile={true}
// // // //             />
// // // //           ) : (
// // // //             <p className="no-posts-message">No posts available</p>
// // // //           )}
// // // //         </div>
// // // //         {isResettingPassword && (
// // // //           <ResetPassword
// // // //             onClose={() => setIsResettingPassword(false)}
// // // //             onResetPassword={handleResetPassword}
// // // //             loading={loading}
// // // //             error={error}
// // // //           />
// // // //         )}
// // // //         {error && <div className="error-message">{error}</div>}
// // // //       </div>
// // // //     </>
// // // //   );
// // // // };

// // // // export default Profile;

// // // import React, { useState, useEffect } from "react";
// // // import {
// // //   fetchUserDetailsByToken,
// // //   fetchUserPosts,
// // //   deleteUserAccount,
// // //   resetPassword,
// // // } from "../api-helpers/helpers";
// // // import CardLayout from "../Card-layout/cardLayout";
// // // import "./Profile.css";
// // // import Header from "../Header/header";
// // // import { useLocation, useNavigate } from "react-router-dom";
// // // import { useDispatch } from "react-redux";
// // // import { authActions } from "../../store/authSlice";
// // // import ResetPassword from "../ResetPassword/resetPassword";
// // // import { MdDeleteForever, MdEdit } from "react-icons/md";
// // // import Loading from "../Loading/Loading";

// // // const Profile = () => {
// // //   const [user, setUser] = useState(null);
// // //   const [posts, setPosts] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [isResettingPassword, setIsResettingPassword] = useState(false);
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const dispatch = useDispatch();

// // //   const fetchUserDetails = async () => {
// // //     try {
// // //       const userData = await fetchUserDetailsByToken();
// // //       console.log("Fetched User Data:", userData); // Debugging: log user data

// // //       // Handle both cases: where user data is nested under `user` or directly in `userData`
// // //       const userInfo = userData.user || userData;

// // //       if (!userInfo) {
// // //         throw new Error("User data is undefined");
// // //       }

// // //       setUser(userInfo);

// // //       // Ensure userInfo._id exists before fetching posts
// // //       if (userInfo._id) {
// // //         const userPosts = await fetchUserPosts(userInfo._id);
// // //         setPosts(userPosts);
// // //       } else {
// // //         throw new Error("User ID is undefined");
// // //       }
// // //     } catch (err) {
// // //       console.error("Error fetching user details or posts:", err);
// // //       setError(
// // //         err.response?.data?.message || "Failed to fetch user details or posts"
// // //       );
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchUserDetails();
// // //   }, [location.state?.refresh]);

// // //   const handlePostDelete = async (postId) => {
// // //     try {
// // //       setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
// // //       await fetchUserDetails();
// // //     } catch (err) {
// // //       console.error("Error deleting post:", err);
// // //       setError("Failed to delete post.");
// // //     }
// // //   };

// // //   const handleDeleteProfile = async () => {
// // //     const confirmDelete = window.confirm(
// // //       "Are you sure you want to delete your account? This action cannot be undone."
// // //     );
// // //     if (confirmDelete) {
// // //       try {
// // //         await deleteUserAccount(); // No need for userId, the token is used for auth
// // //         dispatch(authActions.logout());
// // //         navigate("/loginSignup");
// // //       } catch (err) {
// // //         console.error("Error deleting user profile:", err);
// // //         setError("Failed to delete profile.");
// // //       }
// // //     }
// // //   };

// // //   const handleResetPassword = async (oldPassword, newPassword) => {
// // //     try {
// // //       await resetPassword(oldPassword, newPassword); // Token is used for auth
// // //       return true;
// // //     } catch (err) {
// // //       console.error("Error resetting password:", err);
// // //       setError(
// // //         err.response?.data?.message ||
// // //           "Failed to reset password. Please try again."
// // //       );
// // //       return false;
// // //     }
// // //   };

// // //   const formatDate = (dateString) => {
// // //     const options = { day: "2-digit", month: "long", year: "numeric" };
// // //     return new Intl.DateTimeFormat("en-GB", options).format(
// // //       new Date(dateString)
// // //     );
// // //   };

// // //   if (loading) {
// // //     return <Loading />;
// // //   }

// // //   return (
// // //     <>
// // //       <Header
// // //         classNameheader="profile-header"
// // //         classNamelogo="profile-logo"
// // //         classNamenav="profile-nav"
// // //         classNamesignin="profile-signin"
// // //       />
// // //       <div className="profile-container">
// // //         <h2 className="profile-heading">Profile</h2>
// // //         {user ? (
// // //           <div className="profile-details">
// // //             <div className="profile-image">
// // //               <img src={user.profileImage} alt="Profile" />
// // //             </div>
// // //             <div className="profile-info">
// // //               <h2 className="username">{user.username}</h2>
// // //               <h3 className="name">{`${user.firstName} ${user.lastName}`}</h3>
// // //               <p>{user.email}</p>
// // //               <p>{user.bio || "Hi, I'm excited to share my travel diaries."}</p>
// // //               <p
// // //                 className="role"
// // //                 style={{ color: user.isAdmin ? "red" : "black" }}
// // //               >
// // //                 {user.isAdmin ? "Admin" : "User"}
// // //               </p>
// // //               <p>Joined: {formatDate(user.createdAt)}</p>
// // //               <div className="profile-header-buttons">
// // //                 <MdEdit
// // //                   onClick={() =>
// // //                     navigate("/editProfile", { state: { userId: user._id } })
// // //                   }
// // //                   className="profile-edit-button"
// // //                 />
// // //                 <MdDeleteForever
// // //                   onClick={handleDeleteProfile}
// // //                   className="profile-delete-button"
// // //                 />
// // //                 <button
// // //                   onClick={() => setIsResettingPassword(true)}
// // //                   className="reset-password-button"
// // //                 >
// // //                   Reset Password
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <p>No user data available</p>
// // //         )}
// // //         <div className="posts-section">
// // //           <h2>Posts</h2>
// // //           {posts.length > 0 ? (
// // //             <CardLayout
// // //               cardsData={posts}
// // //               onDelete={handlePostDelete}
// // //               isProfile={true}
// // //             />
// // //           ) : (
// // //             <p className="no-posts-message">No posts available</p>
// // //           )}
// // //         </div>
// // //         {isResettingPassword && (
// // //           <ResetPassword
// // //             onClose={() => setIsResettingPassword(false)}
// // //             onResetPassword={handleResetPassword}
// // //             loading={loading}
// // //             error={error}
// // //           />
// // //         )}
// // //         {error && <div className="error-message">{error}</div>}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default Profile;

// // import React, { useState, useEffect } from "react";
// // import {
// //   fetchUserDetailsByToken,
// //   fetchUserPosts,
// //   deleteUserAccount,
// //   resetPassword,
// // } from "../api-helpers/helpers";
// // import CardLayout from "../Card-layout/cardLayout";
// // import "./Profile.css";
// // import Header from "../Header/header";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { authActions } from "../../store/authSlice";
// // import ResetPassword from "../ResetPassword/resetPassword";
// // import { MdDeleteForever, MdEdit } from "react-icons/md";
// // import Loading from "../Loading/Loading";

// // const Profile = () => {
// //   const [user, setUser] = useState(null);
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isResettingPassword, setIsResettingPassword] = useState(false);
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const fetchUserDetails = async () => {
// //     try {
// //       const userData = await fetchUserDetailsByToken();
// //       console.log("Fetched User Data:", userData); // Debugging: log user data

// //       // Handle both cases: where user data is nested under `user` or directly in `userData`
// //       const userInfo = userData.user || userData;

// //       if (!userInfo) {
// //         throw new Error("User data is undefined");
// //       }

// //       setUser(userInfo);

// //       // Ensure userInfo._id exists before fetching posts
// //       if (userInfo._id) {
// //         const userPosts = await fetchUserPosts(userInfo._id);
// //         setPosts(userPosts);
// //       } else {
// //         throw new Error("User ID is undefined");
// //       }
// //     } catch (err) {
// //       console.error("Error fetching user details or posts:", err);
// //       setError(
// //         err.response?.data?.message || "Failed to fetch user details or posts"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUserDetails();
// //   }, [location.state?.refresh]);

// //   const handlePostDelete = async (postId) => {
// //     try {
// //       setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
// //       await fetchUserDetails();
// //     } catch (err) {
// //       console.error("Error deleting post:", err);
// //       setError("Failed to delete post.");
// //     }
// //   };

// //   const handleDeleteProfile = async () => {
// //     const confirmDelete = window.confirm(
// //       "Are you sure you want to delete your account? This action cannot be undone."
// //     );
// //     if (confirmDelete) {
// //       try {
// //         await deleteUserAccount(); // No need for userId, the token is used for auth
// //         dispatch(authActions.logout());
// //         navigate("/loginSignup");
// //       } catch (err) {
// //         console.error("Error deleting user profile:", err);
// //         setError("Failed to delete profile.");
// //       }
// //     }
// //   };

// //   const handleResetPassword = async (oldPassword, newPassword) => {
// //     try {
// //       await resetPassword(oldPassword, newPassword); // Token is used for auth
// //       return true;
// //     } catch (err) {
// //       console.error("Error resetting password:", err);
// //       setError(
// //         err.response?.data?.message ||
// //           "Failed to reset password. Please try again."
// //       );
// //       return false;
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) {
// //       return "Date not available"; // Fallback if the date is invalid or undefined
// //     }

// //     const date = new Date(dateString);
// //     if (isNaN(date.getTime())) {
// //       return "Invalid date"; // Handle cases where dateString cannot be converted to a valid date
// //     }

// //     const options = { day: "2-digit", month: "long", year: "numeric" };
// //     return new Intl.DateTimeFormat("en-GB", options).format(date);
// //   };

// //   if (loading) {
// //     return <Loading />;
// //   }

// //   return (
// //     <>
// //       <Header
// //         classNameheader="profile-header"
// //         classNamelogo="profile-logo"
// //         classNamenav="profile-nav"
// //         classNamesignin="profile-signin"
// //       />
// //       <div className="profile-container">
// //         <h2 className="profile-heading">Profile</h2>
// //         {user ? (
// //           <div className="profile-details">
// //             <div className="profile-image">
// //               <img src={user.profileImage} alt="Profile" />
// //             </div>
// //             <div className="profile-info">
// //               <h2 className="username">{user.username}</h2>
// //               <h3 className="name">{`${user.firstName} ${user.lastName}`}</h3>
// //               <p>{user.email}</p>
// //               <p>{user.bio || "Hi, I'm excited to share my travel diaries."}</p>
// //               <p
// //                 className="role"
// //                 style={{ color: user.isAdmin ? "red" : "black" }}
// //               >
// //                 {user.isAdmin ? "Admin" : "User"}
// //               </p>
// //               <p>Joined: {formatDate(user.createdAt)}</p>{" "}
// //               {/* Safe date formatting */}
// //               <div className="profile-header-buttons">
// //                 <MdEdit
// //                   onClick={() =>
// //                     navigate("/editProfile", { state: { userId: user._id } })
// //                   }
// //                   className="profile-edit-button"
// //                 />
// //                 <MdDeleteForever
// //                   onClick={handleDeleteProfile}
// //                   className="profile-delete-button"
// //                 />
// //                 <button
// //                   onClick={() => setIsResettingPassword(true)}
// //                   className="reset-password-button"
// //                 >
// //                   Reset Password
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         ) : (
// //           <p>No user data available</p>
// //         )}
// //         <div className="posts-section">
// //           <h2>Posts</h2>
// //           {posts.length > 0 ? (
// //             <CardLayout
// //               cardsData={posts}
// //               onDelete={handlePostDelete}
// //               isProfile={true}
// //             />
// //           ) : (
// //             <p className="no-posts-message">No posts available</p>
// //           )}
// //         </div>
// //         {isResettingPassword && (
// //           <ResetPassword
// //             onClose={() => setIsResettingPassword(false)}
// //             onResetPassword={handleResetPassword}
// //             loading={loading}
// //             error={error}
// //           />
// //         )}
// //         {error && <div className="error-message">{error}</div>}
// //       </div>
// //     </>
// //   );
// // };

// // export default Profile;

// import React, { useState, useEffect } from "react";
// import {
//   fetchUserDetailsByToken,
//   fetchUserDetailsById,
//   fetchUserPosts,
//   deleteUserById,
//   resetPassword,
// } from "../api-helpers/helpers";
// import CardLayout from "../Card-layout/cardLayout";
// import "./Profile.css";
// import Header from "../Header/header";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { authActions } from "../../store/authSlice";
// import ResetPassword from "../ResetPassword/resetPassword";
// import { MdDeleteForever, MdEdit } from "react-icons/md";
// import Loading from "../Loading/Loading";

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isResettingPassword, setIsResettingPassword] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const fetchUserDetails = async () => {
//     try {
//       // Fetch user details using the token
//       const tokenData = await fetchUserDetailsByToken();
//       console.log("Token Data:", JSON.stringify(tokenData, null, 2));
//       const userId = tokenData.userId; // Adjust according to actual response structure

//       if (!userId) {
//         throw new Error("User ID is not available from the token.");
//       }

//       // Fetch user details by user ID
//       const userData = await fetchUserDetailsById(userId);
//       setUser(userData);

//       // Fetch user posts
//       const userPosts = await fetchUserPosts(userId);
//       setPosts(userPosts);
//     } catch (err) {
//       console.error("Error fetching user details or posts:", err);
//       setError(
//         err.response?.data?.message || "Failed to fetch user details or posts"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

//   const handlePostDelete = async (postId) => {
//     try {
//       setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
//       await fetchUserDetails();
//     } catch (err) {
//       console.error("Error deleting post:", err);
//       setError("Failed to delete post.");
//     }
//   };

//   const handleDeleteProfile = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete your account? This action cannot be undone."
//     );
//     if (confirmDelete) {
//       try {
//         if (!user || !user._id) {
//           throw new Error("User ID is not available.");
//         }
//         await deleteUserById(user._id);
//         dispatch(authActions.logout());
//         navigate("/loginSignup");
//       } catch (err) {
//         console.error("Error deleting user profile:", err);
//         setError("Failed to delete profile.");
//       }
//     }
//   };

//   const handleResetPassword = async (oldPassword, newPassword) => {
//     try {
//       if (!user || !user._id) {
//         throw new Error("User ID is not available.");
//       }
//       await resetPassword(user._id, oldPassword, newPassword);
//       return true;
//     } catch (err) {
//       console.error("Error resetting password:", err);
//       setError(
//         err.response?.data?.message ||
//           "Failed to reset password. Please try again."
//       );
//       return false;
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) {
//       return "Date not available"; // Fallback if the date is invalid or undefined
//     }

//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return "Invalid date"; // Handle cases where dateString cannot be converted to a valid date
//     }

//     const options = { day: "2-digit", month: "long", year: "numeric" };
//     return new Intl.DateTimeFormat("en-GB", options).format(date);
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   return (
//     <>
//       <Header
//         classNameheader="profile-header"
//         classNamelogo="profile-logo"
//         classNamenav="profile-nav"
//         classNamesignin="profile-signin"
//       />
//       <div className="profile-container">
//         {/* <h2 className="profile-heading">Profile</h2> */}
//         {user ? (
//           <div className="profile-details">
//             <div className="profile-image">
//               <img src={user.profileImage} alt="Profile" />
//             </div>
//             <div className="profile-info">
//               <h2 className="username">{user.username}</h2>
//               <p className="name">{`${user.firstName} ${user.lastName}`}</p>
//               {/* <p className="email">{user.email}</p> */}
//               <p className="bio">
//                 {user.bio || "Hi, I'm excited to share my travel diaries."}
//               </p>
//               <p className="role">{user.isAdmin ? "Admin" : "User"}</p>
//               <p className="joined">Joined: {formatDate(user.createdAt)}</p>
//             </div>
//             <div className="profile-header-buttons">
//               <button
//                 onClick={() =>
//                   navigate("/editProfile", { state: { userId: user._id } })
//                 }
//                 className="profile-edit-button"
//               >
//                 Edit Profile
//               </button>

//               <button
//                 onClick={() => setIsResettingPassword(true)}
//                 className="reset-password-button"
//               >
//                 Reset Password
//               </button>
//               <button
//                 onClick={handleDeleteProfile}
//                 className="profile-delete-button"
//               >
//                 Delete Account{" "}
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p>No user data available</p>
//         )}
//         <div className="posts-section">
//           {/* <h2>Posts</h2> */}
//           {posts.length > 0 ? (
//             <CardLayout
//               cardsData={posts}
//               onDelete={handlePostDelete}
//               isProfile={true}
//             />
//           ) : (
//             <p className="no-posts-message">No posts available</p>
//           )}
//         </div>
//         {isResettingPassword && (
//           <ResetPassword
//             onClose={() => setIsResettingPassword(false)}
//             onResetPassword={handleResetPassword}
//             loading={loading}
//             error={error}
//           />
//         )}
//         {error && <div className="error-message">{error}</div>}
//       </div>
//     </>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import {
  fetchUserDetailsByToken,
  fetchUserDetailsById,
  fetchUserPosts,
  deleteUserById,
  resetPassword,
} from "../api-helpers/helpers";
import CardLayout from "../Card-layout/cardLayout";
import "./Profile.css";
import Header from "../Header/header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import ResetPassword from "../ResetPassword/resetPassword";
import Popup from "../ErrorPages/PopupCard";
import Loading from "../Loading/Loading";
import Footer from "../footer/footer";
import { MdDelete, MdEdit } from "react-icons/md";
import { RiKey2Fill } from "react-icons/ri";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      // Fetch user details using the token
      const tokenData = await fetchUserDetailsByToken();
      console.log("Token Data:", JSON.stringify(tokenData, null, 2));
      const userId = tokenData.userId; // Adjust according to actual response structure

      if (!userId) {
        throw new Error("User ID is not available from the token.");
      }

      // Fetch user details by user ID
      const userData = await fetchUserDetailsById(userId);
      setUser(userData);

      // Fetch user posts
      const userPosts = await fetchUserPosts(userId);
      setPosts(userPosts);
    } catch (err) {
      console.error("Error fetching user details or posts:", err);
      setError(
        err.response?.data?.message || "Failed to fetch user details or posts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handlePostDelete = async (postId) => {
    try {
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      await fetchUserDetails();
      setSuccessMessage("Post Deleted Successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Failed to delete post.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      if (!user || !user._id) {
        throw new Error("User ID is not available.");
      }
      await deleteUserById(user._id);
      setSuccessMessage("Profile Deleted Successfully! Logging you out..");
      setTimeout(() => {
        dispatch(authActions.logout());
        navigate("/loginSignup");
      }, 2000);
    } catch (err) {
      console.error("Error deleting user profile:", err);
      setError("Failed to delete profile.");
    }
  };

  // const handleResetPassword = async (oldPassword, newPassword) => {
  //   try {
  //     if (!user || !user._id) {
  //       throw new Error("User ID is not available.");
  //     }
  //     await resetPassword(user._id, oldPassword, newPassword);
  //     return true;
  //   } catch (err) {
  //     console.error("Error resetting password:", err);
  //     setError(
  //       err.response?.data?.message ||
  //         "Failed to reset password. Please try again."
  //     );
  //     return false;
  //   }
  // };

  const handleResetPassword = async (oldPassword, newPassword) => {
    try {
      if (!user || !user._id) {
        throw new Error("User ID is not available.");
      }
      await resetPassword(user._id, oldPassword, newPassword);
      return { success: true };
    } catch (err) {
      console.error("Error resetting password:", err);
      return {
        success: false,
        message:
          err.response?.data?.message ||
          "Failed to reset password. Please try again.",
      };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Date not available"; // Fallback if the date is invalid or undefined
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date"; // Handle cases where dateString cannot be converted to a valid date
    }

    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  const handleConfirmDelete = () => {
    setShowDeletePopup(false);
    handleDeleteProfile();
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header
        classNameheader="profile-header"
        classNamelogo="profile-logo"
        classNamenav="profile-nav"
        classNamesignin="profile-signin"
        logoSrc={`Logo_black_Green.svg`}
      />
      <div className="profile-container">
        {error ? (
          <div className="notif error-message">{error}</div>
        ) : successMessage ? (
          <div className="notif success-message">{successMessage}</div>
        ) : null}
        {user ? (
          <div className="profile-details">
            <div className="profile-image">
              <img src={user.profileImage} alt="Profile" />
            </div>
            <div className="profile-info">
              <h2 className="username">{user.username}</h2>
              <p className="name">{`${user.firstName} ${user.lastName}`}</p>
              <p className="bio">
                {user.bio || "Hi, I'm excited to share my travel diaries."}
              </p>
              <p className="role">{user.isAdmin ? "Admin" : "User"}</p>
              <p className="joined">Joined: {formatDate(user.createdAt)}</p>
            </div>
            <div className="profile-header-buttons">
              <button
                onClick={() =>
                  navigate("/editProfile", { state: { userId: user._id } })
                }
                className="profile-edit-button"
              >
                <MdEdit className="mdedit" />
                Edit Profile
              </button>

              <button
                onClick={() => setIsResettingPassword(true)}
                className="reset-password-button"
              >
                <RiKey2Fill className="resetpasswordicon" />
                Reset Password
              </button>
              <button
                onClick={() => setShowDeletePopup(true)}
                className="profile-delete-button"
              >
                <MdDelete className="mddelete" />
                Delete Account
              </button>
            </div>
          </div>
        ) : (
          <p>No user data available</p>
        )}
        <div className="posts-section">
          {posts.length > 0 ? (
            <CardLayout
              cardsData={posts}
              onDelete={handlePostDelete}
              isProfile={true}
            />
          ) : (
            <p className="no-posts-message">No posts yet</p>
          )}
        </div>

        {isResettingPassword && (
          <ResetPassword
            onClose={() => setIsResettingPassword(false)}
            onResetPassword={handleResetPassword}
            loading={loading}
            error={error}
          />
        )}
        {error && <div className="error-message">{error}</div>}
        <Popup
          showPopup={showDeletePopup}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          confirmBtnText="Delete"
          message={{
            title: "Confirm Deletion",
            body: "Are you sure you want to delete your account? This action cannot be undone.",
          }}
        />
      </div>
      <Footer />
    </>
  );
};

export default Profile;
