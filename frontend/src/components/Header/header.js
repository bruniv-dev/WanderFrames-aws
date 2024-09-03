// // // // // import React from "react";
// // // // // import { NavLink, useNavigate } from "react-router-dom";
// // // // // import { useDispatch, useSelector } from "react-redux";
// // // // // import { authActions } from "../../store/authSlice"; // Ensure correct import path
// // // // // import "./Header.css";
// // // // // import { Link } from "react-router-dom";

// // // // // const Header = ({
// // // // //   classNameheader,
// // // // //   classNamelogo,
// // // // //   classNamenav,
// // // // //   classNamesignin,
// // // // // }) => {
// // // // //   const authState = useSelector((state) => state.auth);
// // // // //   const { isLoggedIn, isAdmin } = authState || {
// // // // //     isLoggedIn: false,
// // // // //     isAdmin: false,
// // // // //   };

// // // // //   const dispatch = useDispatch();
// // // // //   const navigate = useNavigate();

// // // // //   const handleLogout = async () => {
// // // // //     try {
// // // // //       // Clear auth state in Redux
// // // // //       dispatch(authActions.logout());

// // // // //       // Clear localStorage
// // // // //       localStorage.removeItem("token");
// // // // //       localStorage.removeItem("isLoggedIn");
// // // // //       localStorage.removeItem("isAdmin");

// // // // //       // Redirect to login/signup page
// // // // //       navigate("/loginSignup");
// // // // //     } catch (error) {
// // // // //       console.error("Logout failed:", error);
// // // // //     }
// // // // //   };

// // // // //   const generalLinks = [
// // // // //     { name: "Home", id: "home", path: "/" },
// // // // //     { name: "Inspirations", id: "inspirations", path: "/inspirations" },
// // // // //   ];

// // // // //   const loggedInLinks = [
// // // // //     { name: "Home", id: "home", path: "/" },
// // // // //     { name: "Profile", id: "profile", path: "/profile" },
// // // // //     { name: "Upload", id: "upload", path: "/upload" },
// // // // //     { name: "Inspirations", id: "inspirations", path: "/inspirations" },
// // // // //     { name: "Favorites", id: "favorites", path: "/favorites" },
// // // // //   ];

// // // // //   const adminLink = [
// // // // //     {
// // // // //       name: "User Actions",
// // // // //       id: "user-actions",
// // // // //       path: "/user-actions",
// // // // //     },
// // // // //     {
// // // // //       name: "Post Actions",
// // // // //       id: "post-actions",
// // // // //       path: "/post-actions",
// // // // //     },
// // // // //   ];

// // // // //   const navLinks = isLoggedIn
// // // // //     ? isAdmin
// // // // //       ? [...loggedInLinks, ...adminLink]
// // // // //       : loggedInLinks
// // // // //     : generalLinks;

// // // // //   return (
// // // // //     <div className={`header ${classNameheader}`}>
// // // // //       <Link to="/" className="logo-nav">
// // // // //         <h3 className={`logo ${classNamelogo}`}>BRUNIV</h3>
// // // // //       </Link>
// // // // //       <nav className={`nav ${classNamenav}`}>
// // // // //         {navLinks.map((link) => (
// // // // //           <NavLink
// // // // //             key={link.id}
// // // // //             to={link.path}
// // // // //             className={({ isActive }) => (isActive ? "active" : "")}
// // // // //           >
// // // // //             {link.name}
// // // // //           </NavLink>
// // // // //         ))}
// // // // //       </nav>
// // // // //       {isLoggedIn ? (
// // // // //         <button className="sign-out" onClick={handleLogout}>
// // // // //           Log Out
// // // // //         </button>
// // // // //       ) : (
// // // // //         <button
// // // // //           className={`sign-in ${classNamesignin}`}
// // // // //           onClick={() => navigate("/loginSignup")}
// // // // //         >
// // // // //           Log In
// // // // //         </button>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Header;

// // // // import React from "react";
// // // // import { NavLink, useNavigate } from "react-router-dom";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import { authActions } from "../../store/authSlice"; // Ensure correct import path
// // // // import "./Header.css";
// // // // import { Link } from "react-router-dom";
// // // // import axios from "axios";

// // // // const Header = ({
// // // //   classNameheader,
// // // //   classNamelogo,
// // // //   classNamenav,
// // // //   classNamesignin,
// // // // }) => {
// // // //   const authState = useSelector((state) => state.auth);
// // // //   const { isLoggedIn, isAdmin } = authState || {
// // // //     isLoggedIn: false,
// // // //     isAdmin: false,
// // // //   };

// // // //   const dispatch = useDispatch();
// // // //   const navigate = useNavigate();

// // // //   const handleLogout = async () => {
// // // //     try {
// // // //       // Make an API call to logout the user on the server
// // // //       await axios.post("/user/logout", {}, { withCredentials: true });

// // // //       // Clear auth state in Redux
// // // //       dispatch(authActions.logout());

// // // //       // Clear localStorage
// // // //       localStorage.removeItem("token");
// // // //       localStorage.removeItem("isLoggedIn");
// // // //       localStorage.removeItem("isAdmin");

// // // //       // Redirect to login/signup page
// // // //       navigate("/loginSignup");
// // // //     } catch (error) {
// // // //       console.error("Logout failed:", error);
// // // //     }
// // // //   };

// // // //   const generalLinks = [
// // // //     { name: "Home", id: "home", path: "/" },
// // // //     { name: "Inspirations", id: "inspirations", path: "/inspirations" },
// // // //   ];

// // // //   const loggedInLinks = [
// // // //     { name: "Home", id: "home", path: "/" },
// // // //     { name: "Profile", id: "profile", path: "/profile" },
// // // //     { name: "Upload", id: "upload", path: "/upload" },
// // // //     { name: "Inspirations", id: "inspirations", path: "/inspirations" },
// // // //     { name: "Favorites", id: "favorites", path: "/favorites" },
// // // //   ];

// // // //   const adminLink = [
// // // //     {
// // // //       name: "User Actions",
// // // //       id: "user-actions",
// // // //       path: "/user-actions",
// // // //     },
// // // //     {
// // // //       name: "Post Actions",
// // // //       id: "post-actions",
// // // //       path: "/post-actions",
// // // //     },
// // // //   ];

// // // //   const navLinks = isLoggedIn
// // // //     ? isAdmin
// // // //       ? [...loggedInLinks, ...adminLink]
// // // //       : loggedInLinks
// // // //     : generalLinks;

// // // //   return (
// // // //     <div className={`header ${classNameheader}`}>
// // // //       <Link to="/" className="logo-nav">
// // // //         <h3 className={`logo ${classNamelogo}`}>BRUNIV</h3>
// // // //       </Link>
// // // //       <nav className={`nav ${classNamenav}`}>
// // // //         {navLinks.map((link) => (
// // // //           <NavLink
// // // //             key={link.id}
// // // //             to={link.path}
// // // //             className={({ isActive }) => (isActive ? "active" : "")}
// // // //           >
// // // //             {link.name}
// // // //           </NavLink>
// // // //         ))}
// // // //       </nav>
// // // //       {isLoggedIn ? (
// // // //         <button className="sign-out" onClick={handleLogout}>
// // // //           Log Out
// // // //         </button>
// // // //       ) : (
// // // //         <button
// // // //           className={`sign-in ${classNamesignin}`}
// // // //           onClick={() => navigate("/loginSignup")}
// // // //         >
// // // //           Log In
// // // //         </button>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Header;

// // // import React, { useState } from "react";
// // // import { NavLink, useNavigate } from "react-router-dom";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { authActions } from "../../store/authSlice";
// // // import "./Header.css";
// // // import { Link } from "react-router-dom";
// // // import axios from "axios";

// // // const Header = ({
// // //   classNameheader,
// // //   classNamelogo,
// // //   classNamenav,
// // //   classNamesignin,
// // //   classNameHamburger,
// // // }) => {
// // //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// // //   const authState = useSelector((state) => state.auth);
// // //   const { isLoggedIn, isAdmin } = authState || {
// // //     isLoggedIn: false,
// // //     isAdmin: false,
// // //   };

// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();

// // //   const handleLogout = async () => {
// // //     try {
// // //       await axios.post("/user/logout", {}, { withCredentials: true });
// // //       dispatch(authActions.logout());
// // //       localStorage.removeItem("token");
// // //       localStorage.removeItem("isLoggedIn");
// // //       localStorage.removeItem("isAdmin");
// // //       navigate("/loginSignup");
// // //     } catch (error) {
// // //       console.error("Logout failed:", error);
// // //     }
// // //   };

// // //   const generalLinks = [
// // //     { name: "Home", id: "home", path: "/" },
// // //     { name: "Inspirations", id: "inspirations", path: "/inspirations" },
// // //   ];

// // //   const loggedInLinks = [
// // //     { name: "Home", id: "home", path: "/" },
// // //     { name: "Profile", id: "profile", path: "/profile" },
// // //     { name: "Upload", id: "upload", path: "/upload" },
// // //     { name: "Inspirations", id: "inspirations", path: "/inspirations" },
// // //     { name: "Favorites", id: "favorites", path: "/favorites" },
// // //   ];

// // //   const adminLink = [
// // //     {
// // //       name: "User Actions",
// // //       id: "user-actions",
// // //       path: "/user-actions",
// // //     },
// // //     {
// // //       name: "Post Actions",
// // //       id: "post-actions",
// // //       path: "/post-actions",
// // //     },
// // //   ];

// // //   const navLinks = isLoggedIn
// // //     ? isAdmin
// // //       ? [...loggedInLinks, ...adminLink]
// // //       : loggedInLinks
// // //     : generalLinks;

// // //   const toggleMenu = () => {
// // //     setIsMenuOpen(!isMenuOpen);
// // //   };

// // //   return (
// // //     <div className={`header ${classNameheader}`}>
// // //       <div className={`hamburger ${classNameHamburger}`} onClick={toggleMenu}>
// // //         &#9776;
// // //       </div>
// // //       <Link to="/" className="logo-nav">
// // //         <h3 className={`logo ${classNamelogo}`}>BRUNIV</h3>
// // //       </Link>
// // //       <div className="white">
// // //         <nav className={`nav ${classNamenav} ${isMenuOpen ? "open" : ""}`}>
// // //           {navLinks.map((link) => (
// // //             <NavLink
// // //               key={link.id}
// // //               to={link.path}
// // //               className={({ isActive }) => (isActive ? "active" : "")}
// // //               onClick={toggleMenu}
// // //             >
// // //               {link.name}
// // //             </NavLink>
// // //           ))}
// // //         </nav>
// // //       </div>
// // //       {isLoggedIn ? (
// // //         <button className="sign-out" onClick={handleLogout}>
// // //           Log Out
// // //         </button>
// // //       ) : (
// // //         <button
// // //           className={`sign-in ${classNamesignin}`}
// // //           onClick={() => navigate("/loginSignup")}
// // //         >
// // //           Log In
// // //         </button>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Header;

// // import React, { useState } from "react";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import { authActions } from "../../store/authSlice";
// // import "./Header.css";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const Header = ({
// //   classNameheader,
// //   classNamelogo,
// //   classNamenav,
// //   classNamesignin,
// //   classNameHamburger,
// // }) => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const authState = useSelector((state) => state.auth);
// //   const { isLoggedIn, isAdmin } = authState || {
// //     isLoggedIn: false,
// //     isAdmin: false,
// //   };

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleLogout = async () => {
// //     try {
// //       await axios.post("/user/logout", {}, { withCredentials: true });
// //       dispatch(authActions.logout());
// //       localStorage.removeItem("token");
// //       localStorage.removeItem("isLoggedIn");
// //       localStorage.removeItem("isAdmin");
// //       navigate("/loginSignup");
// //     } catch (error) {
// //       console.error("Logout failed:", error);
// //     }
// //   };

// //   const generalLinks = [
// //     { name: "Home", id: "home", path: "/" },
// //     { name: "Inspirations", id: "inspirations", path: "/inspirations" },
// //   ];

// //   const loggedInLinks = [
// //     { name: "Home", id: "home", path: "/" },
// //     { name: "Profile", id: "profile", path: "/profile" },
// //     { name: "Upload", id: "upload", path: "/upload" },
// //     { name: "Inspirations", id: "inspirations", path: "/inspirations" },
// //     { name: "Favorites", id: "favorites", path: "/favorites" },
// //   ];

// //   const adminLink = [
// //     {
// //       name: "User Actions",
// //       id: "user-actions",
// //       path: "/user-actions",
// //     },
// //     {
// //       name: "Post Actions",
// //       id: "post-actions",
// //       path: "/post-actions",
// //     },
// //   ];

// //   const navLinks = isLoggedIn
// //     ? isAdmin
// //       ? [...loggedInLinks, ...adminLink]
// //       : loggedInLinks
// //     : generalLinks;

// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };

// //   return (
// //     <div className={`header ${classNameheader}`}>
// //       <div className={`hamburger ${classNameHamburger}`} onClick={toggleMenu}>
// //         &#9776;
// //       </div>
// //       <Link to="/" className="logo-nav">
// //         <h3 className={`logo ${classNamelogo}`}>BRUNIV</h3>
// //       </Link>
// //       <div className={`white ${isMenuOpen ? "open" : ""}`}>
// //         <nav className={`nav ${classNamenav} ${isMenuOpen ? "open" : ""}`}>
// //           {navLinks.map((link) => (
// //             <NavLink
// //               key={link.id}
// //               to={link.path}
// //               className={({ isActive }) => (isActive ? "active" : "")}
// //               onClick={toggleMenu}
// //             >
// //               {link.name}
// //             </NavLink>
// //           ))}
// //         </nav>
// //       </div>
// //       {isLoggedIn ? (
// //         <button className="sign-out" onClick={handleLogout}>
// //           Log Out
// //         </button>
// //       ) : (
// //         <button
// //           className={`sign-in ${classNamesignin}`}
// //           onClick={() => navigate("/loginSignup")}
// //         >
// //           Log In
// //         </button>
// //       )}
// //     </div>
// //   );
// // };

// // export default Header;

// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "../../store/authSlice";
// import "./Header.css";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Header = ({
//   classNameheader,
//   classNamelogo,
//   classNamenav,
//   classNamesignin,
//   classNameHamburger,
//   logoSrc,
// }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const authState = useSelector((state) => state.auth);
//   const { isLoggedIn, isAdmin } = authState || {
//     isLoggedIn: false,
//     isAdmin: false,
//   };

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post("/user/logout", {}, { withCredentials: true });
//       dispatch(authActions.logout());
//       localStorage.removeItem("token");
//       localStorage.removeItem("isLoggedIn");
//       localStorage.removeItem("isAdmin");
//       navigate("/loginSignup");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const generalLinks = [
//     { name: "Home", id: "home", path: "/" },
//     { name: "Inspirations", id: "inspirations", path: "/inspirations" },
//   ];

//   const loggedInLinks = [
//     { name: "Home", id: "home", path: "/" },
//     { name: "Profile", id: "profile", path: "/profile" },
//     { name: "Upload", id: "upload", path: "/upload" },
//     { name: "Inspirations", id: "inspirations", path: "/inspirations" },
//     { name: "Favorites", id: "favorites", path: "/favorites" },
//   ];

//   const adminLink = [
//     {
//       name: "Users",
//       id: "user-actions",
//       path: "/user-actions",
//     },
//     {
//       name: "Posts",
//       id: "post-actions",
//       path: "/post-actions",
//     },
//   ];

//   const navLinks = isLoggedIn
//     ? isAdmin
//       ? [...loggedInLinks, ...adminLink]
//       : loggedInLinks
//     : generalLinks;

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className={`header ${classNameheader}`}>
//       <div className={`hamburger ${classNameHamburger}`} onClick={toggleMenu}>
//         &#9776;
//       </div>
//       <Link to="/" className="logo-nav">
//         <img
//           className={`logo ${classNamelogo}`}
//           src={`${process.env.PUBLIC_URL}/${logoSrc}`}
//           alt="Wander Frames Logo"
//         />
//       </Link>
//       <div className={`white ${isMenuOpen ? "open" : ""}`}>
//         <nav className={`nav ${classNamenav}`}>
//           {navLinks.map((link) => (
//             <NavLink
//               key={link.id}
//               to={link.path}
//               className={({ isActive }) => (isActive ? "active" : "")}
//               onClick={toggleMenu}
//             >
//               {link.name}
//             </NavLink>
//           ))}
//         </nav>
//       </div>
//       <div>
//         {isLoggedIn ? (
//           <button className="sign-out" onClick={handleLogout}>
//             Log Out
//           </button>
//         ) : (
//           <button
//             className={`sign-in ${classNamesignin}`}
//             onClick={() => navigate("/loginSignup")}
//           >
//             Log In
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import "./Header.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = ({
  classNameheader,
  classNamelogo,
  classNamenav,
  classNamesignin,
  classNameHamburger,
  logoSrc,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const authState = useSelector((state) => state.auth);
  const { isLoggedIn, isAdmin } = authState || {
    isLoggedIn: false,
    isAdmin: false,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/user/logout", {}, { withCredentials: true });
      dispatch(authActions.logout());
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isAdmin");
      navigate("/loginSignup");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const generalLinks = [
    { name: "Home", id: "home", path: "/" },
    { name: "Inspirations", id: "inspirations", path: "/inspirations" },
  ];

  const loggedInLinks = [
    { name: "Home", id: "home", path: "/" },
    { name: "Profile", id: "profile", path: "/profile" },
    { name: "Upload", id: "upload", path: "/upload" },
    { name: "Inspirations", id: "inspirations", path: "/inspirations" },
    { name: "Favorites", id: "favorites", path: "/favorites" },
  ];

  const adminLink = [
    {
      name: "Users",
      id: "user-actions",
      path: "/user-actions",
    },
    {
      name: "Posts",
      id: "post-actions",
      path: "/post-actions",
    },
  ];

  const navLinks = isLoggedIn
    ? isAdmin
      ? [...loggedInLinks, ...adminLink]
      : loggedInLinks
    : generalLinks;

  const toggleMenu = () => {
    setIsAnimating(true);

    if (isMenuOpen) {
      // Slide out
      setIsMenuOpen(false);
      setTimeout(() => setIsAnimating(false), 300); // Match the duration of the slide-out animation
    } else {
      // Slide in
      setIsMenuOpen(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <div className={`header ${classNameheader}`}>
      <div className={`hamburger ${classNameHamburger}`} onClick={toggleMenu}>
        &#9776;
      </div>
      <Link to="/" className="logo-nav">
        <img
          className={`logo ${classNamelogo}`}
          src={`${process.env.PUBLIC_URL}/${logoSrc}`}
          alt="Wander Frames Logo"
        />
      </Link>
      <div
        className={`white ${
          isMenuOpen ? "open slide-in" : isAnimating ? "slide-out" : ""
        }`}
      >
        <nav className={`nav ${classNamenav}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={toggleMenu}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div>
        {isLoggedIn ? (
          <button className="sign-out" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <button
            className={`sign-in ${classNamesignin}`}
            onClick={() => navigate("/loginSignup")}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
