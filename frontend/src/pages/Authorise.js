import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Authorise.css";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Authorise(props) {
  const navigate = useNavigate(); // Access the history object for navigation
  const [isSignUp, setIsSignUp] = useState(props.up || false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errrormsg, setErrorMsg] = useState(null);
  

  useEffect(() => {
    // Navigate to the appropriate route when isSignUp changes
    if (isSignUp) {
      navigate("/signup");
    } else {
      navigate("/signin");
    }
    setErrorMsg(null); // Clear error message when isSignUp changes
  }, [isSignUp]); // Re-run effect when isSignUp or history changes

  const toggleForm = () => {
    setIsSignUp((prev) => !prev); // Toggle between 'Sign Up' and 'Sign In'
  };

  const loginFunction = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        // Redirect to /dashboard after successful login
        navigate("/dashboard");
      } else {
        setErrorMsg(data.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };



  const isEmailValid = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isPasswordValid = (password) => {
    // Regular expression for password validation
    // Password must contain at least one special character and one numeric character
    const regex = /^(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
    return regex.test(password);
  };

  const registerFunction = async (e) => {
    e.preventDefault();
    if (!isEmailValid(newEmail)) {
        setErrorMsg("Please enter a valid email address.");
        return;
      }
  
    if (!isPasswordValid(newPassword)) {
    setErrorMsg(
        "Password must be at least 6 characters long and contain at least one special character and one numeric character."
    );
    return;
    }
  
    try {
      const response = await fetch("http://localhost:4500/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword,
        }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setIsSignUp(false); // Switch to sign-in mode after successful registration
      } else {
        setErrorMsg(data.error);
      }
      console.log(data);
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMsg("Something went Wrong");
    }
  };

  return (
    <div className={`container ${isSignUp ? "active" : ""}`}>
      <div className="form-container sign-up">
        <form onSubmit={registerFunction}>
          <h1>Create Account</h1>
          <div className="input-group">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
            {errrormsg && (<p className="errormsg">* {errrormsg} *</p>)}
            
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={loginFunction}>
          <h1>Sign In</h1>
          <div className="input-group">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
         </div>
         <div className="input-group">
            <FontAwesomeIcon icon={faLock} className="icon" />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
         </div>
          {errrormsg && (<p className="errormsg">* {errrormsg} *</p>)}
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" onClick={toggleForm}>
              Sign In
            </button>
            {/* //for mobile view only */}

            <p className="Home_btn">Don't Have Account?</p>
            <button
              className="Home_btn"
              onClick={toggleForm}
            >
              Sign Up
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome!</h1>
            <p>Register with your personal details to use all site features</p>
            <button className="hidden" onClick={toggleForm}>
              Sign Up
            </button>
            {/* //for mobile view only */}
            <p className="Home_btn">Already an User?</p>
            <button
              className="Home_btn"
              onClick={toggleForm}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authorise;