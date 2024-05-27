import React, { useEffect } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import logo from "../images/linkhub-high-resolution-logo-transparent.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faPlus,faUserCircle  } from "@fortawesome/free-solid-svg-icons";
import Nav from "../components/Nav";
import CardList from "../components/CardsList";
import Loader from "../components/Loader";
import { RxHamburgerMenu } from "react-icons/rx";


const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function Dashboard(props) {
  const [data, setData] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [Loading, setLoading] = React.useState(true);
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  useEffect(() => {
    document.title = "Dashboard | LinkHub";
    async function fetchData() {
      // Fetch data from the backend endpoint with Authorization header
      const response = await fetch(`${backendUrl}/dashboard`, {
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
      setLoading(false);
      // Handle the fetched data here (e.g., update state)
    }
    if (localStorage.getItem("token") === null) {
      window.location.href = "/signin";
      
    }
    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount
  const toggleNav = () => {
    document.querySelector('.dashboard_div nav').classList.toggle('open');
  };
  
  return (
    <div className="dashboard_div">
      <div className={`hamburger`} onClick={toggleNav}><RxHamburgerMenu/></div>
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
          
          {Loading && <center><Loader /></center>}
          <CardList userLinks={data && data.user.userLinks} searchQuery={searchQuery}/>
        </div> 
        
      </main>
    </div>
  );
}


