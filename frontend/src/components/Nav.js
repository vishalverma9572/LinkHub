import React, { useEffect } from "react";
import "../pages/Dashboard.css";
import { Link } from "react-router-dom";
import logo from "../images/linkhub-high-resolution-logo-transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faHome,faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Nav(props) {
    const logoutfun = props.logoutfun;
    const handleLogout = () => {
        logoutfun();
    };
  return (
    <nav className="dashboard_nav">
        <div className="dashboard_nav_logo">
          <img src={logo} alt="logo" className="logo" />
          <h1>LinkHub</h1>
          {/* horizontal line  */}
        </div>
        <hr className="horizontal_line"></hr>
        <div className="dashboard_nav_links">
          <div className="dashboard_nav_menu">
            <Link to="/dashboard" className="nav_link">
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </Link>
            <Link to="/profile" className="nav_link">
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </Link>
            <Link to="/create" className="nav_link">
              <FontAwesomeIcon icon={faPlus} />
              <span>Create</span>
            </Link>
          </div>
        </div>
        <div className="dashboard_nav_logout">
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
  )
}
