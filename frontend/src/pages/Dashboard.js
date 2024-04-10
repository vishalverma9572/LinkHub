import React, { useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import logo from "../images/linkhub-high-resolution-logo-transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faPlus,faUserCircle  } from "@fortawesome/free-solid-svg-icons";
import Nav from "../components/Nav";
import CardList from "../components/CardsList";

export default function Dashboard(props) {
  const [data, setData] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
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

  
  return (
    <div className="dashboard_div">
      <Nav logoutfun={props.logoutfun}/>
      
      <main className="dashboard_container">
        <div className="header">
          {/* Profile icon */}
          <div className="profile_icon">
            {/* Replace 'profile_icon_url' with the URL of your profile icon image */}
            {/* <span>Hello! {
              data && data.user.name.trim().split(" ")[0].toUpperCase()
              }</span> */}
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
          <form className="search-form">
          <h1>Your Links </h1>
          <input
            type="text"
            placeholder="Search Links"
            className="search-bar"

            onChange={(e) => setSearchQuery(e.target.value)}
          />
          </form>
          
          <CardList userLinks={data && data.user.userLinks} searchQuery={searchQuery}/>
        </div> 
        
      </main>
    </div>
  );
}


