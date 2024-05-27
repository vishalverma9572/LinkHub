
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './passwordreset.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const PasswordReset = () => {
  document.title = 'Reset Password| LinkHub';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const passwordRegex = /^(?=.*[!@#$%^&])(?=.*[0-9]).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(' "Password must be at least 6 characters long and contain at least one special character and one numeric character."');
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/reset-password/${token}`, { newPassword });
      if (response.status === 200) {
        setSuccess(true);
        navigate('/signin');
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setError(error.message+" please try again or generate a new link");
    }
  };

  return (
    <div className="fg_pass_container">
    <div className="container">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        {/* <label>New Password:</label> */}
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder='Enter new password'
        />
        {/* <label>Confirm Password:</label> */}
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm new password'
        />
        <button type="submit">Reset Password</button>
      </form>
      {error && <div style={{ color: 'red',textAlign:"center",fontSize:"0.8rem", }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Password reset successfully!</div>}
    </div>
    </div>
  );
};

export default PasswordReset;