import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/authSlice";

const TOKEN_CHECK_INTERVAL = 3600000;

const useTokenChecker = (isLoggedIn, setShowPopup) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;

    const checkTokenValidity = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.post(
            "/user/validate-token",
            { token },
            { withCredentials: true }
          );

          if (!response.data.isValid) {
            localStorage.removeItem("token");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("isAdmin");
            dispatch(authActions.logout());
            setShowPopup(true);
          }
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("isAdmin");
          dispatch(authActions.logout());
          setShowPopup(true);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          dispatch(authActions.logout());
          localStorage.removeItem("token");
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("isAdmin");
          setShowPopup(true);
        }
      }
    };

    const intervalId = setInterval(checkTokenValidity, TOKEN_CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [dispatch, isLoggedIn, setShowPopup]);
};

export default useTokenChecker;
