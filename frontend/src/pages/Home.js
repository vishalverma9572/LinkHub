import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/linkhub-high-resolution-logo-transparent.png";
import women from "../images/Woman.png";
import laptop from "../images/lapto2.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "./Home.css";

function Home() {
  const [showText, setShowText] = useState(false);
  const [showBorder, setShowBorder] = useState(false);

  useEffect(() => {
    document.title="Home | LinkHub"
    // Simulate typing effect after a delay
    const typingTimeout = setTimeout(() => {
      setShowText(true);
    }, 500);

    // Trigger border animation after typing animation completes
    const borderTimeout = setTimeout(() => {
      setShowBorder(true);
    }, 2500); // Adjust timing based on typing animation duration

    // Cleanup timeouts to prevent memory leaks
    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(borderTimeout);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="logo" className="logo" />
            <h1 className="logo-text">LinkHub</h1>
          </Link>
          <Link to='/signin'>
            <button className="hidden">Sign In</button>
          </Link>
        </div>
      </nav>
      <div className="Home-container">
        <div className="image_container">
          <img src={women} alt="img" className="women_img" />
        </div>
        <div className="Home-content">
          <h1>LinkHub</h1>
          <p>
            LinkHub is a platform that allows you to share your links with the
            world. You can share your social media profiles, websites, blogs,
            and much more with just one link. Create your free account today!
          </p>
          {showText && (
            <Link to="/signup" className={`Home_btn ${showBorder ? 'bordered' : ''}`}>
              <TypingAnimation text="Get Started" />
              &nbsp;<FontAwesomeIcon icon={faArrowRight} />
            </Link>
          )}
        </div>
      </div>
      <div className="laptop_img">
        <img src={laptop} alt="img" />
      </div>
    </>
  );
}

// TypingAnimation component to simulate typing effect
const TypingAnimation = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    // Split text into characters and simulate typing effect
    const chars = text.split("");
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= chars.length) {
        setDisplayText(chars.slice(0, currentIndex).join(""));
        currentIndex++;
      } else {
        clearInterval(interval); // Stop the interval when text is fully displayed
      }
    }, 100); // Adjust typing speed (in milliseconds)

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [text]);

  return <span>{displayText}</span>;
};

export default Home;
