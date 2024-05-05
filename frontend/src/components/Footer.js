// Footer.js

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer_pageview">
      <div className="footer-content">
        <div>
        <p className="footer-text">
          LinkHub is a platform that allows you to share your links with the world. You can share your social media profiles, websites, blogs, and much more with just one link.
        </p>
        <p className="footer-text">
          Create your free account today!
        </p>
        </div>
        <div className="footer-links">
        <a href="https://www.yourwebsite.com" target="_blank" rel="noopener noreferrer" className="goto-website-btn">
          Go to Website
        </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
