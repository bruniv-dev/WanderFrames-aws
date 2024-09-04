import React from "react";
import "./footer.css"; // Assuming your CSS is named Footer.css

const Footer = ({ customClass }) => {
  return (
    <footer className={`footer ${customClass}`}>
      <div className="footer__container">
        <div className="footer__logo-col">
          <a href="/" className="footer__logo">
            <img
              className="logo"
              src={`${process.env.PUBLIC_URL}/Logo_black_Green.svg`}
              alt="Wander Frames Logo"
            />
          </a>
          <ul className="footer__social-links">
            <li>
              <a className="footer__social-link" href="/">
                <ion-icon
                  className="footer__social-icon"
                  name="logo-instagram"
                ></ion-icon>
              </a>
            </li>
            <li>
              <a className="footer__social-link" href="/">
                <ion-icon
                  className="footer__social-icon"
                  name="logo-facebook"
                ></ion-icon>
              </a>
            </li>
            <li>
              <a className="footer__social-link" href="/">
                <ion-icon
                  className="footer__social-icon"
                  name="logo-twitter"
                ></ion-icon>
              </a>
            </li>
          </ul>
          <p className="footer__copyright">
            Copyright &copy; <span className="footer__year">2024</span> by
            Wander Frames, Inc. All rights reserved.
          </p>
        </div>

        <div className="footer__address-col">
          <p className="footer__heading">Contact Us</p>
          <address className="footer__contacts">
            <p className="footer__address">
              1608 Abcdef St., 2nd Floor, Ghijkel 635-110
            </p>
            <p>
              <a className="footer__link" href="tel:123-456-7890">
                123-456-7890
              </a>
              <br />
              <a className="footer__link" href="mailto:hello@omnifood.com">
                hello@wanderframes.com
              </a>
            </p>
          </address>
        </div>

        <nav className="footer__nav-col">
          <p className="footer__heading">Account</p>
          <ul className="footer__nav">
            <li>
              <a className="footer__link" href="/loginSignup">
                Create Account
              </a>
            </li>
            <li>
              <a className="footer__link" href="/loginSignup">
                Log In
              </a>
            </li>
            <li>
              <a className="footer__link" href="/">
                iOS App
              </a>
            </li>
            <li>
              <a className="footer__link" href="/">
                Android App
              </a>
            </li>
          </ul>
        </nav>

        <nav className="footer__nav-col">
          <p className="footer__heading">Company</p>
          <ul className="footer__nav">
            <li>
              <a className="footer__link" href="/">
                About WanderFrames
              </a>
            </li>
            <li>
              <a className="footer__link" href="/">
                For Business
              </a>
            </li>
            <li>
              <a className="footer__link" href="/">
                Business Partners
              </a>
            </li>
            <li>
              <a className="footer__link" href="/">
                Invest
              </a>
            </li>
          </ul>
        </nav>

        <nav className="footer__nav-col">
          <p className="footer__heading">Resources</p>
          <ul className="footer__nav">
            <li>
              <a className="footer__link" href="/">
                Travel Directory
              </a>
            </li>
            <li>
              <a className="footer__link" href="/">
                Help Centre
              </a>
            </li>
            <li>
              <a className="footer__link" href="/">
                Privacy & Terms
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
