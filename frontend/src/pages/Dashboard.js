import React, { useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import logo from "../images/linkhub-high-resolution-logo-transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faPlus,faUserCircle  } from "@fortawesome/free-solid-svg-icons";
import Linkcard from "../components/Linkcard";

export default function Dashboard(props) {
  const [data, setData] = React.useState(null);
  useEffect(() => {
    document.title = "Dashboard | LinkHub";
    async function fetchData() {
      // Fetch data from the backend endpoint with Authorization header
      const response = await fetch("http://localhost:4500/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`, // Include Bearer token
        },
      });

      // Parse the JSON response
      const data = await response.json();
      console.log(data);
      setData(data);
      if (data.status === "failed") {
        // Redirect to login if token is invalid or expired
        window.location.href = "/signin";
      }
      // Handle the fetched data here (e.g., update state)
    }
    if (localStorage.getItem("token") === null) {
      window.location.href = "/signin";
    }
    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleLogout = () => {
    props.logoutfun();
  };
  return (
    <div className="dashboard_div">
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
      <main className="dashboard_container">
        <div className="header">
          {/* Profile icon */}
          <div className="profile_icon">
            {/* Replace 'profile_icon_url' with the URL of your profile icon image */}
            <span>Hello! {
              data && data.user.name.trim().split(" ")[0].toUpperCase()
              }</span>
            <Link to="/profile"  >
            <FontAwesomeIcon icon={faUserCircle} />
            </Link>
          </div>
          
          
        </div>
        <h1 className="dashboard_title">Dashboard</h1>
        
        {/* Dashboard text in top left corner */}
        {/* <div className="title">Dashboard</div>
        {/* Create button on the left side */}
        <div className="div_create_button">
        <Link to="/create">
        <button className="create_button">
          <FontAwesomeIcon icon={faPlus} /> Create
        </button>
        </Link>
        </div>
        
        {/* Your Links text */}
        <div className="div_content">
          <h1>Your Links </h1>
          <Linkcard data={data} />
        </div> 
        
      </main>
    </div>
  );
}
