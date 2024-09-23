import React from "react";
import '../styles/login.css'; // Ensure your CSS has the necessary styles
import loginImage from '../assests/images/login.jpeg'; // Adjust the path if necessary

export const LoginPageConsumer = () => {
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
            <div className="form-group">
              <input className="input" placeholder="Email" type="email" />
            </div>
            <div className="form-group">
              <input className="input" placeholder="Password" type="password" />
            </div>
            <button className="login-button">Login</button>
            <p className="account-exists-text">
              Already have an account? <a href="/login" className="login-link">Log In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageConsumer;
