import React, { useState } from "react";
import '../styles/login.css'; // Ensure your CSS has the necessary styles
import loginImage from '../assests/images/login.jpeg'; // Adjust the path if necessary
import axios from 'axios'; // Import Axios for API calls

export const LoginPageConsumer = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(""); // Reset error message

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      return;
    }

    try {
      // Make API call to login
      const response = await axios.post('http://localhost:5000/api/Auth/login', {
        email,  // Only email and password are required for login
        password,
      });

      // Handle successful login
      console.log(response.data);
      // Redirect or perform any action upon successful login
    } catch (error) {
      // Handle error response
      if (error.response) {
        // Check for specific error messages from the backend
        setErrorMessage(error.response.data.message || "Login failed. Please try again.");
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  return (
    <div className="login-page-consumer">
      {/* Header Section */}
      <header className="login-header">
        <div className="logo">
          <h1 style={{ margin: 0, fontSize: '24px' }}>
            <span style={{ color: 'black' }}>Service</span>
            <span style={{ color: 'black' }}> on </span>
            <span style={{ color: '#007bff' }}>Tab</span>
          </h1>
          <p style={{ margin: 0, fontSize: '16px', color: '#333' }}>Maintain and Repair</p>
        </div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">FAQ</a>
          <a href="#">Contact us</a>
          <a href="#">About us</a>
        </nav>
        <div className="search-container">
          <div className="search-bar-container">
            <input type="text" placeholder="Search here" className="search-bar" />
            <button className="search-button">
              <img src={require('../assests/images/search.png')} alt="Search" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="login-page-content">
        {/* Left Section */}
        <div className="login-left-section">
          <img src={loginImage} alt="Login Illustration" className="login-image" />
        </div>

        {/* Right Section */}
        <div className="login-right-section">
          <div className="login-form-container">
            <h2 className="login-title">Ready to Continue? Sign In Here!</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            <form onSubmit={handleLogin}> {/* Form submission handling */}
              <div className="form-group">
                <input
                  className="input"
                  placeholder="Email"
                  type="email"
                  value={email} // Controlled input
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                />
              </div>
              <div className="form-group">
                <input
                  className="input"
                  placeholder="Password"
                  type="password"
                  value={password} // Controlled input
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                />
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageConsumer;
