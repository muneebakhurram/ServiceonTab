import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../styles/consumersignup.css'; 
import csignupImage from '../assests/images/csignup.jpeg'; 
import axios from 'axios'; 

export const RegisterPageConsumer = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const formData = {
      name,
      email,
      phonenumber,
      address,
      password,
      confirmpassword
    };

    try {
      const response = await axios.post('http://localhost:5000/api/Auth/createuser', formData);
      if (response.data.success) {
        setSuccess("Consumer created successfully!");
        setError(''); 
        // Navigate to login page after successful signup
        navigate('/login'); // Add this line
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred. Please try again.");
      setSuccess(''); 
    }
  };

  return (
    <div className="register-page-consumer">
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
      <div className="register-page-content">
        {/* Left Section */}
        <div className="register-left-section">
          <img src={csignupImage} alt="Register Illustration" className="register-image" />
        </div>

        {/* Right Section */}
        <div className="register-right-section">
          <div className="register-form-container">
            <h2 className="register-title">Ready to Continue? Sign Up Here!</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input 
                  className="input" 
                  placeholder="Name" 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  className="input" 
                  placeholder="Email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  className="input" 
                  placeholder="Phone number" 
                  type="tel" 
                  value={phonenumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  className="input" 
                  placeholder="Address" 
                  type="text" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  className="input" 
                  placeholder="Password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  className="input" 
                  placeholder="Confirm Password" 
                  type="password" 
                  value={confirmpassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="register-button">Signup</button>
            </form>
            <p className="account-exists-text">
              Already have an account? <a href="/login" className="register-link">Log In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPageConsumer;
