import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


const ForgotPassword = () => {
  document.title = 'Forgot Password| LinkHub';
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [succeeds, setsucceds]= useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your API to send the reset password email
      const response = await fetch(`${backendUrl}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setError(null);
        alert('reset password through link sent on gmail');
        navigate('/');
        
      } else {
        setError('Error sending reset password email');
      }
    } catch (error) {
      setError('Error sending reset password email');
    }
  };

  return (
    <div className="fg_pass_container">
      <div className='container'>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        {/* <label>Email:</label> */}
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
        />
        <button type="submit">Send Reset Password Email</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {succeeds && <div style={{ color: 'green' }}>Email Sent successfully</div>}

      </form>
      <p>
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </div>
    </div>
  );
};

export default ForgotPassword;