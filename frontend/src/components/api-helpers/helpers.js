import axios from "axios";
import { authActions } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

// export const sendAuthRequest = async (signup, data) => {
//   const endpoint = signup ? "/user/signup" : "/user/login"; // Adjust based on your API

//   const payload = signup
//     ? {
//         email: data.email,
//         password: data.password,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         username: data.username,
//         securityQuestion: data.securityQuestion,
//         securityAnswer: data.securityAnswer,
//         isAdmin: data.isAdmin,
//       }
//     : {
//         identifier: data.identifier,
//         password: data.password,
//       };

//   try {
//     const { status, data: responseData } = await axios.post(endpoint, payload, {
//       withCredentials: true,
//     });

//     if (status === 200 || status === 201) {
//       return responseData;
//     }

//     throw new Error(`Unexpected status code: ${status}`);
//   } catch (error) {
//     console.error(
//       "Error during authentication:",
//       error.response ? error.response.data : error.message
//     );
//     throw error;
//   }
// };

export const sendAuthRequest = async (signup, data) => {
  const endpoint = signup ? "/user/signup" : "/user/login"; // Adjust based on your API

  const payload = signup
    ? {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        securityQuestion: data.securityQuestion,
        securityAnswer: data.securityAnswer,
        isAdmin: data.isAdmin,
      }
    : {
        identifier: data.identifier,
        password: data.password,
      };

  try {
    const response = await axios.post(endpoint, payload, {
      withCredentials: true,
    });

    const { status, data: responseData } = response;

    if (status >= 200 && status < 300) {
      const token = responseData.token;

      if (token) {
        localStorage.setItem("token", token);
      } else {
        throw new Error("Token not found in response.");
      }
      return {
        ...responseData,
        isLoggedIn: responseData.isLoggedIn,
        token: responseData.token,
      };
    } else {
      throw new Error(`Unexpected status code: ${status}`);
    }
    // } catch (error) {
    //   const errorMessage = error.response
    //     ? `Error: ${error.response.data.message || error.response.data}`
    //     : `Error: ${error.message}`;

    //   console.error("Error during authentication:", errorMessage);
    //   throw new Error(errorMessage);
    // }
    // const errorMessage = error.response?.data?.message || error.message;
    // console.error("Error during authentication:", errorMessage);
    // throw new Error(errorMessage);
    // }
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error.response && error.response.data) {
      // Check if response.data has a 'message' field
      errorMessage = error.response.data.message || error.message;
    } else if (error.request) {
      // No response received from the server
      errorMessage = "No response received from the server";
    } else {
      // Error setting up the request
      errorMessage = error.message;
    }

    console.error("Error during authentication:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const checkUsernameAvailability = async (
  username,
  includeCredentials = true
) => {
  try {
    const response = await axios.get(`/user/check-username/${username}`, {
      withCredentials: includeCredentials, // Control credentials based on the parameter
    });
    return response.data.isAvailable;
  } catch (error) {
    console.error("Error checking username availability:", error);
    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post("/user/logout", {}, { withCredentials: true });

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");

    // Update Redux state
    dispatch(authActions.logout());
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const getAllPosts = async () => {
  try {
    const res = await axios.get("/post");
    if (res.status !== 200) {
      console.log("Error Occurred");
    }
    const data = res.data;
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get("/user");
    if (res.status !== 200) {
      console.log("Error Occurred");
    }
    const data = res.data;
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
};

export const fetchUserDetailsById = async (userId) => {
  try {
    // Ensure cookies are sent with the request
    const response = await axios.get(`/user/${userId}`, {
      withCredentials: true, // This ensures that cookies, including HTTP-only cookies, are sent with the request
    });

    return response.data; // Return the entire user object
  } catch (err) {
    console.error("Error fetching user details:", err);
    throw err;
  }
};

export const fetchUserDetailsByToken = async () => {
  try {
    const response = await axios.get("/user/by-token/me", {
      withCredentials: true, // Ensure cookies are included
    });

    return response.data; // Return the entire user object
  } catch (err) {
    if (err.response && err.response.status === 401) {
      // Token is invalid or expired
      console.error("Token expired or invalid");
      const navigate = useNavigate;
      navigate("/loginSignup");
      // Optionally, redirect to login page or clear user session
    }
    throw err;
  }
};

export const fetchPostById = async (postId) => {
  const res = await axios
    .get(`/post/${postId}`, { withCredentials: true })
    .catch((err) => {
      console.log(err);
    });
  if (res.status !== 200) {
    return console.log("Error fetching post data");
  }
  const resData = await res.data;
  return resData;
};

// export const addPost = async (data) => {
//   try {
//     const response = await axios.post("/post/addPost", data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       withCredentials: true,
//     });

//     // Check if response status is 201 (Created)
//     if (response.status === 201) {
//       return response.data;
//     } else {
//       throw new Error(`Unexpected response status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error("Error occurred while adding post:", error);
//     throw new Error("Failed to add post. Please try again later.");
//   }
// };

export const addPost = async (data) => {
  try {
    const response = await axios.post("/post/addPost", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    // Check if response status is 201 (Created)
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    // Check if the error is an AxiosError and handle accordingly
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(
        "Server responded with an error:",
        error.response.status,
        error.response.data
      );
      throw new Error(
        `Failed to add post. Server responded with status: ${error.response.status}.`
      );
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received from server:", error.request);
      throw new Error("Failed to add post. No response from the server.");
    } else {
      // Something else caused the error
      console.error("Error occurred while adding post:", error.message);
      throw new Error("Failed to add post. Please try again later.");
    }
  }
};

export const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(`/user/profile/${userId}`, {
      withCredentials: true,
    });
    return response.data; // Ensure this matches the API response
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const fetchUserPosts = async (userId) => {
  try {
    const response = await axios.get(`/user/posts/${userId}`, {
      withCredentials: true,
    });
    return response.data.posts;
  } catch (err) {
    console.error("Error fetching user posts:", err);
    throw err;
  }
};

// export const updatePost = async (id, data) => {
//   try {
//     const response = await axios.put(
//       `/post/${id}`,
//       {
//         location: data.location,
//         subLocation: data.subLocation,
//         description: data.description,
//         locationUrl: data.locationUrl || "",
//       },
//       {
//         withCredentials: true, // Ensure cookies are sent with the request
//       }
//     );

//     if (response.status !== 200) {
//       throw new Error("Failed to update the post");
//     }

//     const resData = await response.data;
//     return resData;
//   } catch (error) {
//     console.error("Error updating post:", error.message);
//     throw error;
//   }
// };

// export const updatePost = async (id, data) => {
//   try {
//     const response = await axios.put(
//       `/post/${id}`,
//       {
//         location: data.location,
//         subLocation: data.subLocation,
//         description: data.description,
//         locationUrl: data.locationUrl || "",
//       },
//       {
//         withCredentials: true, // Ensure cookies are sent with the request
//       }
//     );

//     // Check if the response indicates a successful update
//     if (response.status === 200) {
//       return response.data;
//     } else if (response.status === 403) {
//       throw new Error("Unauthorized access - redirect to /unauthorized");
//     } else {
//       throw new Error("Failed to update the post");
//     }
//   } catch (error) {
//     console.error("Error updating post:", error.message);
//     throw error;
//   }
// };

export const updatePost = async (id, data) => {
  try {
    const response = await axios.put(
      `/post/${id}`,
      {
        location: data.location,
        subLocation: data.subLocation,
        description: data.description,
        locationUrl: data.locationUrl || "",
      },
      {
        withCredentials: true, // Ensure cookies are sent with the request
      }
    );

    // Handle the response status
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 403) {
      throw new Error("Unauthorized access"); // Specific error message for 403
    } else {
      throw new Error("Failed to update the post");
    }
  } catch (error) {
    console.error("Error updating post:", error.message);
    throw error;
  }
};

export const updateUserProfile = async (userId, formData) => {
  try {
    const response = await axios.put(`/user/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error.response
      ? error.response.data
      : new Error("Error updating user profile");
  }
};

// export const deletePostById = async (id) => {
//   try {
//     const response = await axios.delete(`/post/${id}`, {
//       withCredentials: true,
//     });
//     return response.data; // Ensure this matches the API response structure
//   } catch (error) {
//     console.error("Error deleting post by ID:", error);
//     throw error;
//   }
// };

export const deletePostById = async (id) => {
  try {
    const response = await axios.delete(`/post/${id}`, {
      withCredentials: true, // Ensures cookies are sent with the request
    });

    if (response.status === 200) {
      return response.data; // Return the API response data if the delete is successful
    } else if (response.status === 403) {
      throw new Error("Unauthorized access"); // Throw a specific error if the status is 403
    } else {
      throw new Error("Failed to delete the post"); // Handle any other non-success status codes
    }
  } catch (error) {
    console.error("Error deleting post by ID:", error.message);
    throw error; // Re-throw the error so it can be handled by the calling function
  }
};

//actions -- admin
export const deleteUserById = async (userId) => {
  try {
    const response = await axios.delete(`/user/${userId}`, {
      withCredentials: true,
    });
    return response.data; // Ensure this matches the API response structure
  } catch (error) {
    console.error("Error deleting post by ID:", error);
    throw error;
  }
};

// // API call to delete user account
// export const deleteUserAccount = async (userId) => {
//   try {
//     const response = await axios.delete(`/user/${userId}`, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error deleting user account:", error.message);
//     throw error;
//   }
// };

export const updateUserOrAdminRole = async (userId, isAdmin, role) => {
  try {
    const response = await axios.put(
      `/user/${userId}/isAdmin`,
      {
        isAdmin,
        role, // Send role along with isAdmin
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

export const resetPassword = async (userId, oldPassword, newPassword) => {
  const response = await axios.post(
    `/user/reset-password/${userId}`,
    {
      oldPassword,
      newPassword,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

//forgotpassword
export const sendResetPasswordRequest = async (identifier) => {
  try {
    const response = await axios.post("/user/requestReset", { identifier });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(
        "Error requesting password reset:",
        error.response.data.message
      );
      throw new Error(error.response.data.message); // Throw custom error message for 404
    }
    console.error("Error requesting password reset:", error);
    throw new Error("Failed to request password reset"); // General error message for other errors
  }
};

export const verifySecurityAnswer = async (identifier, securityAnswer) => {
  const response = await axios.post("/user/verifySecurityAnswer", {
    identifier,
    securityAnswer,
  });
  return response.data;
};

export const forgotPasswordReset = async (userId, newPassword) => {
  const response = await axios.post(`/user/forgot-password-reset/${userId}`, {
    newPassword,
  });
  return response.data;
};

export const toggleFavorite = async (postId, userId) => {
  if (!userId || !postId) {
    throw new Error("User ID or Post ID is missing");
  }

  try {
    const res = await axios.post(
      "/user/toggleFavorite",
      {
        userId,
        postId,
      },
      {
        withCredentials: true,
      }
    );
    return res.data; // Data should include the updated favorites list
  } catch (error) {
    console.error("Error toggling favorite:", error.message);
    throw error;
  }
};

// Fetch favorites for the logged-in user
export const fetchFavorites = async (userId) => {
  if (!userId) {
    throw new Error("User ID is missing");
  }

  try {
    const response = await axios.get(`/user/favorites/${userId}`, {
      withCredentials: true,
    });
    return response.data; // Data should include the favorites list
  } catch (err) {
    console.error("Error fetching favorites:", err);
    throw err;
  }
};

export const checkAuth = async () => {
  try {
    // Make a GET request to the /user/check-auth endpoint
    const response = await axios.get("/user/check-auth", {
      withCredentials: true, // Ensure cookies are sent with the request
    });

    // If the response status is 200, consider the user as authenticated
    if (response.status === 200) {
      return { success: true, user: response.data.user }; // Return user data if needed
    } else {
      return { success: false }; // Not authenticated
    }
  } catch (error) {
    console.error("Error checking authentication:", error.message);
    return { success: false }; // If an error occurs, assume not authenticated
  }
};
