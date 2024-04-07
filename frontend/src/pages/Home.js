import { Link } from "react-router-dom";
import logo from "../images/linkhub-high-resolution-logo-transparent.png"; // Import the logo image
import "./Home.css"; // Import the CSS file
import women from "../images/Woman.png";
import laptop from "../images/lapto2.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Home() {

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="logo" className="logo" />
            <h1 className="logo-text">LinkHub</h1>
          </Link>

          <Link to='/signin'> <button className="hidden">Sign In</button> </Link>
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
          <Link to="/signup" className="Home_btn">
            Get Started <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
      <div className="laptop_img">
        <img src={laptop} alt="img" />
      </div>
    </>
  );
};

export default Home;
