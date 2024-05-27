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
            <br></br>
            It may be because of this page is not <b style={{fontWeight:600}} >Published</b> yet or <b style={{fontWeight:600}} >Deleted</b> or <b style={{fontWeight:600}} >Never Created.</b>
          </p>
          <Link to={'/'}>GO Home</Link>
        </div>
      </div>
    </div>
  );
}
