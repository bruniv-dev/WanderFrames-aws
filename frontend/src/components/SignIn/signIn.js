import React, { useState, useEffect } from "react";
import "./SignIn.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import {
  sendAuthRequest,
  checkUsernameAvailability,
} from "../api-helpers/helpers";
import Loading from "../Loading/Loading";
import { useRef } from "react";

const SignInSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [successFinal, setSuccessFinal] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
    identifier: "",
  });
  const [usernameStatus, setUsernameStatus] = useState("");

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    securityQuestion: "",
    securityAnswer: "",
    identifier: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const debounceTimeout = useRef(null);
  const [mobileLogin, setMobileLogin] = useState(false);

  useEffect(() => {
    setInputs({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      securityQuestion: "",
      securityAnswer: "",
      identifier: "",
    });
    setErrors({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      securityQuestion: "",
      securityAnswer: "",
      identifier: "",
    });

    setUsernameStatus("");
    setSubmitted(false);
  }, [isSignUp]);

  useEffect(() => {
    const checkAvailability = async () => {
      const usernameRegex = /^[a-zA-Z0-9._]{6,}$/;

      if (isSignUp && inputs.username) {
        if (!usernameRegex.test(inputs.username)) {
          setUsernameStatus(
            "Username can only contain letters, numbers, underscores (_), and periods (.) and be over 6 characters"
          );
          return;
        }

        try {
          const isAvailable = await checkUsernameAvailability(inputs.username);
          setUsernameStatus(
            isAvailable
              ? "Username is available."
              : "Username is already taken."
          );
        } catch (err) {
          setUsernameStatus("Error checking username availability.");
        }
      } else {
        setUsernameStatus("");
      }
    };

    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(checkAvailability, 300);

    return () => clearTimeout(debounceTimeout.current);
  }, [inputs.username, isSignUp]);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    handleMobileOverlayForLogin();
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validateInputs = () => {
    const newErrors = {};

    if (isSignUp) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (inputs.password && !passwordRegex.test(inputs.password)) {
        newErrors.password =
          "Password must have uppercase, lowercase letter, digit, special character, and be over 8 characters.";
      } else {
        delete newErrors.password;
      }

      // if (!inputs.password && !inputs.password) {
      //   newErrors.password = "Password is required.";
      // } else if (!passwordRegex.test(inputs.password)) {
      //   newErrors.password =
      //     "Password must include an uppercase letter, lowercase letter, digit, special character, and be over 8 characters.";
      // }

      if (inputs.email && !emailRegex.test(inputs.email)) {
        newErrors.email = "Please enter a valid email address.";
      } else {
        delete newErrors.email;
      }

      if (submitted && !inputs.securityQuestion) {
        newErrors.securityQuestion = "Please select a security question.";
      } else {
        delete newErrors.securityQuestion;
      }

      if (submitted && !inputs.firstName) {
        newErrors.firstName = "Required";
      } else {
        delete newErrors.firstName;
      }

      if (submitted && !inputs.lastName) {
        newErrors.lastName = "Required";
      } else {
        delete newErrors.lastName;
      }

      if (submitted && !inputs.securityAnswer) {
        newErrors.securityAnswer = "Required";
      } else {
        delete newErrors.securityAnswer;
      }
    } else {
      if (submitted && !inputs.identifier) {
        newErrors.identifier = "Please enter your username or email.";
      } else {
        delete newErrors.identifier;
      }

      if (submitted && !inputs.password) {
        newErrors.password = "Please enter your password.";
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleContentLoad = () => {
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateInputs()) {
      setError("Please fix the errors before submitting.");
      return;
    }

    try {
      const data = await sendAuthRequest(isSignUp, inputs);

      if (isSignUp) {
        console.log("Sign-up successful:", data);

        const { userId, isAdmin, token } = data || {};

        if (userId && token) {
          localStorage.setItem("token", token);
          localStorage.setItem("isAdmin", isAdmin);
          localStorage.setItem("isLoggedIn", "true");

          console.log(token, isAdmin);
          dispatch(authActions.login({ isAdmin, token }));
          setSuccessFinal("Sign Up Successfull. Logging you in...");

          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          setError("Sign-up was successful, but auto-login failed.");
        }
      } else {
        const { userId, isAdmin, token, isLoggedIn } = data || {};
        if (userId && isLoggedIn) {
          setSuccessFinal("All Set! Logging you in...");
          localStorage.setItem("token", token);
          localStorage.setItem("isAdmin", isAdmin);
          localStorage.setItem("isLoggedIn", isLoggedIn.toString());

          dispatch(authActions.login({ isAdmin, token }));
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setError("Failed to Log In. Try Again Later");
          throw new Error("Failed to retrieve user information.");
        }
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message || "An unknown error occurred.");
    } finally {
      // setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedValue = name === "email" ? value.toLowerCase() : value;

    setInputs((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));

    if (error) {
      setError("");
    }

    validateInputs();
  };

  const handleVideoLoad = () => {
    setLoading(false);
  };

  const handleMobileOverlayForLogin = () => {
    setMobileLogin(!mobileLogin);
  };

  return (
    <div className="loginSignup-container">
      {successFinal && (
        <div className="notif success-message">{successFinal}</div>
      )}

      {loading && <Loading />}
      <img
        className="signup-logo"
        src={`${process.env.PUBLIC_URL}/Logo_white.svg`}
        alt="Wander Frames Logo"
        onClick={() => navigate("/")}
        onLoadedData={handleContentLoad}
      />
      <video
        autoPlay
        muted
        loop
        className="loginSignup-background-video"
        preload="auto"
        playsInline
        onLoadedData={handleContentLoad}
      >
        <source src="beach3.mp4" type="video/mp4" />
      </video>
      <div className="loginSignup-form-container ">
        <div className={`loginSignup-overlay ${isSignUp ? "signup" : "login"}`}>
          <video
            autoPlay
            muted
            playsInline
            loop
            onLoadedData={handleContentLoad}
          >
            <source src="road.mp4" type="video/mp4" preload="auto" />
          </video>
          <div
            className="loginSignup-overlay-content"
            onLoadedData={handleContentLoad}
          >
            {!isSignUp ? (
              <>
                <h2 className="overlay-line-1">Hello There!</h2>
                <h3 className="overlay-line-2">
                  Start your journey with us by creating an account
                </h3>
                <button
                  onClick={() => {
                    setIsSignUp(true);
                    setError("");
                    setSuccess("");
                  }}
                  className="login"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <h2 className="overlay-line-1">Welcome Back!</h2>
                <h3 className="overlay-line-2">
                  To stay connected, please log in to your account.
                </h3>
                <button
                  onClick={() => {
                    setIsSignUp(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="signup"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
        <div className="loginSignup-forms">
          <div
            className={`loginSignup-login-form ${mobileLogin ? "hidden" : ""}`}
          >
            <h2>Log In</h2>
            {/* {error && (
              <div className="loginSignup-main-error-message login">
                {error}
              </div>
            )} */}
            {error ? (
              <div className="loginSignup-main-error-message login">
                {error}
              </div>
            ) : success ? (
              <div className="loginSignup-main-success-message login">
                {success}
              </div>
            ) : null}
            <div className="loginSignup-form-group">
              <label htmlFor="identifier">Username or Email:</label>
              <input
                name="identifier"
                value={inputs.identifier || ""}
                onChange={handleChange}
                type="text"
                id="identifier"
                required
              />
            </div>
            <div className="loginSignup-form-group">
              <label htmlFor="password">Password:</label>
              <div className="loginSignup-password-container">
                <input
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="loginSignup-password"
                  required
                />
                <span
                  className="loginSignup-toggle-password"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <button
                className="forgot-password"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              className="loginSignup-auth-btn login"
              disabled={loading}
              onClick={handleSubmit}
            >
              Log In
            </button>
            <div className="mobile-overlay-alternative">
              <p className="mobile-overlay-text">Don't have an account?</p>
              <button
                type="button"
                className="mobile-overlay-btn"
                onClick={() => {
                  handleMobileOverlayForLogin();
                  setIsSignUp(true);
                  setError("");
                  setSuccess("");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
          <div
            className={`loginSignup-signup-form ${
              !mobileLogin ? "hidden" : ""
            }`}
          >
            <h2>Create An Account</h2>
            {/* {error && (
              <div className="loginSignup-main-error-message signup">
                {error}
              </div>
            )} */}
            {error ? (
              <div className="loginSignup-main-error-message signup">
                {error}
              </div>
            ) : success ? (
              <div className="loginSignup-main-success-message signup">
                {success}
              </div>
            ) : null}
            <div className="loginSignup-form-group">
              <div className="loginSignup-first-last">
                <div>
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    name="firstName"
                    value={inputs.firstName}
                    onChange={handleChange}
                    type="text"
                    id="firstName"
                    className="loginSignup-firstName"
                    required
                  />
                  {errors.firstName && (
                    <p className="loginSignup-error-message">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    name="lastName"
                    value={inputs.lastName}
                    onChange={handleChange}
                    type="text"
                    id="lastName"
                    className="loginSignup-lastName"
                    required
                  />
                  {errors.lastName && (
                    <p className="loginSignup-error-message">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="loginSignup-form-group">
              <label htmlFor="username">Username:</label>
              <input
                name="username"
                value={inputs.username}
                onChange={handleChange}
                type="text"
                id="username"
                required
                className="loginSignup-userName"
              />
              <p
                className={`loginSignup-username-status ${
                  usernameStatus.includes("available")
                    ? "available"
                    : "unavailable"
                }`}
              >
                {usernameStatus}
              </p>
            </div>
            <div className="loginSignup-form-group">
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                value={inputs.email}
                onChange={handleChange}
                type="email"
                id="email"
                className="loginSignup-email"
                required
              />
              {errors.email && (
                <p className="loginSignup-error-message">{errors.email}</p>
              )}
            </div>
            <div className="loginSignup-form-group">
              <label htmlFor="password">Password:</label>
              <div className="loginSignup-password-container">
                <input
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="loginSignup-password"
                  required
                />
                <span
                  className="loginSignup-toggle-password"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {errors.password && (
                <p className="loginSignup-error-message">{errors.password}</p>
              )}
            </div>
            <div className="loginSignup-security-first-last">
              <div className="loginSignup-form-group">
                <label htmlFor="securityQuestion">Security Question:</label>
                <select
                  name="securityQuestion"
                  onChange={handleChange}
                  value={inputs.securityQuestion}
                  id="securityQuestion"
                  className="loginSignup-securityQuestion"
                  required
                >
                  <option value="">Select a question</option>
                  <option value="What is your pet's name?">
                    What is your pet's name?
                  </option>
                  <option value="What is your mother's maiden name?">
                    What is your mother's maiden name?
                  </option>
                  <option value="What was the name of your first school?">
                    What was the name of your first school?
                  </option>
                  <option value="What is your favorite book?">
                    What is your favorite book?
                  </option>
                </select>
                {errors.securityQuestion && (
                  <p className="loginSignup-error-message">
                    {errors.securityQuestion}
                  </p>
                )}
              </div>
              <div className="loginSignup-form-group">
                <label htmlFor="securityAnswer">Answer:</label>
                <input
                  name="securityAnswer"
                  value={inputs.securityAnswer}
                  onChange={handleChange}
                  type="text"
                  id="securityAnswer"
                  className="loginSignup-securityAnswer"
                  required
                />
                {errors.securityAnswer && (
                  <p className="loginSignup-error-message">
                    {errors.securityAnswer}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="loginSignup-auth-btn signup"
              disabled={loading}
              onClick={handleSubmit}
            >
              Sign Up
            </button>
            <div className="mobile-overlay-alternative">
              <p className="mobile-overlay-text">Already have an account?</p>
              <button
                type="button"
                className="mobile-overlay-btn"
                onClick={() => {
                  handleMobileOverlayForLogin();
                  setIsSignUp(false);
                  setError("");
                  setSuccess("");
                }}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;

//FOR MANUAL LOGIN AFTER SIGNUP
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setSubmitted(true);

//   if (!validateInputs()) {
//     setError("Please fix the errors before submitting.");
//     return;
//   }

//   try {
//     setLoading(true);
//     const data = await sendAuthRequest(isSignUp, inputs);

//     if (isSignUp) {
//       // const { isAdmin, token } = data || {};
//       console.log("Sign-up successful:", data);
//       setSuccess("Signed Up Sucessfully. Please Log In");
//       setTimeout(() => {
//         toggleForm();
//       }, 2000);
//     } else {
//       const { userId, isAdmin, token, isLoggedIn } = data || {};
//       if (userId && isLoggedIn) {
//         // Store token and isLoggedIn in localStorage
//         setSuccess("Logged In Sucessfully");
//         localStorage.setItem("token", token);
//         localStorage.setItem("isAdmin", isAdmin);
//         localStorage.setItem("isLoggedIn", isLoggedIn.toString()); // Convert to string

//         dispatch(authActions.login({ isAdmin, token }));
//         setTimeout(() => {
//           navigate("/");
//         }, 2000);
//       } else {
//         setError("Failed to Log In. Try Again Later");
//         throw new Error("Failed to retrieve user information.");
//       }
//     }
//   } catch (err) {
//     console.error("Authentication error:", err);
//     setError(err.message || "An unknown error occurred.");
//   } finally {
//     setLoading(false);
//   }
// };
