import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import '../styles/login.css'; // Ensure your CSS has the necessary styles
import loginImage from '../assests/images/login.jpeg'; // Corrected path
import axios from 'axios'; // Import Axios for API calls
import HeaderLogin from "../component/HeaderLogin"; // Import the Header component
import Footer from "../component/Footer"; // Import the Footer component

export const LoginPageConsumer = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State for loading status

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(""); // Reset error message
    setLoading(true); // Set loading to true

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      setLoading(false); // Reset loading state
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
      // Redirect to HomePage on successful login
      if (response.data.success) {
        navigate('/Homepage'); // Adjust this path if needed
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Handle error response
      if (error.response) {
        // Check for specific error messages from the backend
        if (error.response.data.message === "Email not verified or not registered.") {
          setErrorMessage("Please verify your email before logging in.");
        } else {
          setErrorMessage(error.response.data.message || "Login failed. Please try again.");
        }
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-page-consumer">
      {/* Header Section */}
      <HeaderLogin />
      <br />
      <br />
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
                <label>Email</label>
                <input
                  className="input"
                  placeholder="Enter your email"
                  type="email"
                  value={email} // Controlled input
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  className="input"
                  placeholder="Enter your password"
                  type="password"
                  value={password} // Controlled input
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  required
                />
              </div>
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default LoginPageConsumer;
