import axios from "axios";
import { authActions } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export const sendAuthRequest = async (signup, data) => {
  const endpoint = signup ? "/user/signup" : "/user/login";

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
  } catch (error) {
    let errorMessage = "An unknown error occurred";

    if (error.response && error.response.data) {
      errorMessage = error.response.data.message || error.message;
    } else if (error.request) {
      errorMessage = "No response received from the server";
    } else {
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
      withCredentials: includeCredentials,
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

    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");

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
    const response = await axios.get(`/user/${userId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    if (err.response) {
      console.error("Error response from server:", {
        status: err.response.status,
        data: err.response.data,
        headers: err.response.headers,
      });
    } else if (err.request) {
      console.error("No response received:", {
        request: err.request,
      });
    } else {
      console.error("Error setting up request:", err.message);
    }
    throw err;
  }
};

export const fetchUserDetailsByToken = async () => {
  try {
    const response = await axios.get("/user/by-token/me", {
      withCredentials: true,
    });

    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.error("Token expired or invalid");
      const navigate = useNavigate;
      navigate("/loginSignup");
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

export const addPost = async (data) => {
  try {
    const response = await axios.post("/post/addPost", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.error(
        "Server responded with an error:",
        error.response.status,
        error.response.data
      );
      throw new Error(
        `Failed to add post. Server responded with status: ${error.response.status}.`
      );
    } else if (error.request) {
      console.error("No response received from server:", error.request);
      throw new Error("Failed to add post. No response from the server.");
    } else {
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
    return response.data;
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
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 403) {
      throw new Error("Unauthorized access");
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

export const deletePostById = async (id) => {
  try {
    const response = await axios.delete(`/post/${id}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 403) {
      throw new Error("Unauthorized access");
    } else {
      throw new Error("Failed to delete the post");
    }
  } catch (error) {
    console.error("Error deleting post by ID:", error.message);
    throw error;
  }
};

export const deleteUserById = async (userId) => {
  try {
    const response = await axios.delete(`/user/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting post by ID:", error);
    throw error;
  }
};

export const updateUserOrAdminRole = async (userId, isAdmin, role) => {
  try {
    const response = await axios.put(
      `/user/${userId}/isAdmin`,
      {
        isAdmin,
        role,
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
      throw new Error(error.response.data.message);
    }
    console.error("Error requesting password reset:", error);
    throw new Error("Failed to request password reset");
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
    return res.data;
  } catch (error) {
    console.error("Error toggling favorite:", error.message);
    throw error;
  }
};

export const fetchFavorites = async (userId) => {
  if (!userId) {
    throw new Error("User ID is missing");
  }

  try {
    const response = await axios.get(`/user/favorites/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.error("Error fetching favorites:", err);
    throw err;
  }
};

export const checkAuth = async () => {
  try {
    const response = await axios.get("/user/check-auth", {
      withCredentials: true,
    });

    if (response.status === 200) {
      return { success: true, user: response.data.user };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error checking authentication:", error.message);
    return { success: false };
  }
};
