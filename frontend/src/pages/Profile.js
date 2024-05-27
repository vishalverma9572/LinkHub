import React, { useState,useEffect } from 'react';

import './Profile.css'; // Import CSS for styling
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Nav from '../components/Nav';
import Loader from '../components/Loader';
import { RxHamburgerMenu } from "react-icons/rx";


const backendUrl = process.env.REACT_APP_BACKEND_URL;

const ProfilePage = (props) => {
    const [data, setData] = React.useState(null);
    const [Loading, setLoading] = React.useState(true);
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleNav = () => {
      document.querySelector('.dashboard_div nav').classList.toggle('open');
    };
    useEffect(() => {
        document.title = "Profile | LinkHub";
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
          setLoading(false);
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
  const user = data && data.user;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  


  const isPasswordValid = (password) => {
    // Regular expression for password validation
    // Password must contain at least one special character and one numeric character
    const regex = /^(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = () => {
    if (newPassword === '' || confirmPassword === '') {
      setError('Please enter both new password and confirm password.');
      setSuccessMessage('');
    } else if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setSuccessMessage('');
    }
    else if (!isPasswordValid(newPassword)) {
        setError(
            'Password must be at least 6 characters long and contain at least one special character and one numeric character.'
        );
        setSuccessMessage('');
    }else {
      // Logic to handle password change (e.g., call backend API)
      // Simulating a success message (replace with actual API call)
      const data = fetch(`${backendUrl}/update-password`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
           Authorization: `${localStorage.getItem("token")}`, // Include Bearer token
        },
        body: JSON.stringify({
            newPassword: newPassword,
            }),
      }).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Error in request');

        }
      }).then((data) => {
        console.log(data);
        if (data.status === 'success') {
          setSuccessMessage('Password changed successfully.');
          setError('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          setError('Error changing password. Please try again.');
          setSuccessMessage('');
        }
        
      }).catch((error) => {
        console.error(error);
        setError('Error changing password. Please try again.');
      });



      
    }
  };

  return (
    <div className="dashboard_div">
    <div className={`hamburger`} onClick={toggleNav}><RxHamburgerMenu/></div>
    <Nav logoutfun={props.logoutfun} />
    <main className="profile-container dashboard_container">
      <h1 className='dashboard_title'>Profile Information</h1>
      {Loading && <div style={{marginLeft: '50px', height:'60px' }}><Loader /></div>}
      {!Loading && 
      <div className="profile-details">
        <div className="profile-item">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span className="label">Name:</span>
          <span>{user && user.name}</span>
        </div>
        <div className="profile-item">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <span className="label">Email:</span>
          <span>{user && user.email}</span>
        </div>
      </div>
      }
      <div className="password-change">
        <h2>Change Password</h2>
        
        <div className="password-input">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="password-input">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">*{error}*</p>}
        {successMessage && <p className="success-message">*{successMessage}*</p>}
        <button className="change-password-btn" onClick={handlePasswordChange}>
          Change Password
        </button>
      </div>
    </main>
    </div>
  );
};

export default ProfilePage;
