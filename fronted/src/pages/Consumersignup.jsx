import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/consumersignup.css'; 
import csignupImage from '../assests/images/csignup.jpeg'; // Ensure the correct path here
import axios from 'axios'; 
import Header from "../component/Header"; // Import the Header component
import Footer from "../component/Footer"; // Import the Footer component


export const ConsumerSignup = () => {
  const navigate = useNavigate(); 
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
        setSuccess("Consumer created successfully! Please check your email for verification.");
        setError(''); 
        navigate('/login'); // Redirect to login page after successful signup
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred. Please try again.");
      setSuccess(''); 
    }
  };

  return (
    <div className="register-page-consumer">
      <Header />
      <br />
      <br />
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
              {[ 
                { label: "Name", type: "text", value: name, setter: setName },
                { label: "Email", type: "email", value: email, setter: setEmail },
                { label: "Phone number", type: "tel", value: phonenumber, setter: setPhoneNumber },
                { label: "Address", type: "text", value: address, setter: setAddress },
                { label: "Password", type: "password", value: password, setter: setPassword },
                { label: "Confirm Password", type: "password", value: confirmpassword, setter: setConfirmPassword },
              ].map(({ label, type, value, setter }) => (
                <div className="form-group" key={label}>
                  <label>{label}</label>
                  <input 
                    className="input" 
                    placeholder={`Enter your ${label.toLowerCase()}`} 
                    type={type} 
                    value={value} 
                    onChange={(e) => setter(e.target.value)} 
                    required 
                  />
                </div>
              ))}
              <button type="submit" className="register-button">Signup</button>
            </form>
            <p className="account-exists-text">
              Already have an account? <a href="/login" className="register-link">Log In</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConsumerSignup; // Ensure you export it as default
