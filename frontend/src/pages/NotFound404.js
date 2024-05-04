import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound404.css';
import penguin from "../images/uDlbQ9ezCY.png";

export default function NotFound404() {
  return (
    <div className="container404page">
      <div className="container">
        <div className="header">
          {/* <h1>404</h1> */}
          <h3>Page Not Found!</h3>
        </div>

        <img src={penguin} alt="not found" />

        <div className="footer">
          <p>
            We're sorry, the page you requested could not be found. Please go
            back to the homepage!
          </p>
          <Link to={'/'}>GO Home</Link>
        </div>
      </div>
    </div>
  );
}
