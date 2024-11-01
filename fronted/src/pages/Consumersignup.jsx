import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/consumersignup.css"; 
import csignupImage from "../assests/images/signup2.jpg"; // Ensure the correct path here
import axios from "axios"; 
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
        setSuccess("Consumer created successfully!");
        setError('');
        navigate('/login'); // Redirect to login page after successful signup
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred. Please try again.");
      setSuccess('');
    }
  };

  return (
    <div className="vh-100 d-flex flex-column">
      <Header />
      <section className="container py-5 h-100 flex-grow-1">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={csignupImage} className="img-fluid" alt="Sign Up Illustration" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div className="form-container shadow p-4">
              <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <div className="form-outline mb-4">
                  <input type="text" id="name" className="form-control form-control-lg" 
                         value={name} onChange={(e) => setName(e.target.value)} 
                         placeholder="Enter your name" required />
                  <label className="form-label" htmlFor="name">Name</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="email" className="form-control form-control-lg" 
                         value={email} onChange={(e) => setEmail(e.target.value)} 
                         placeholder="Enter your email" required />
                  <label className="form-label" htmlFor="email">Email address</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="tel" id="phonenumber" className="form-control form-control-lg" 
                         value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} 
                         placeholder="Enter your phone number" required />
                  <label className="form-label" htmlFor="phonenumber">Phone number</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="text" id="address" className="form-control form-control-lg" 
                         value={address} onChange={(e) => setAddress(e.target.value)} 
                         placeholder="Enter your address" required />
                  <label className="form-label" htmlFor="address">Address</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="password" className="form-control form-control-lg" 
                         value={password} onChange={(e) => setPassword(e.target.value)} 
                         placeholder="Enter your password" required />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="confirmpassword" className="form-control form-control-lg" 
                         value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} 
                         placeholder="Confirm your password" required />
                  <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block">Sign Up</button>

                <p className="text-center mt-3">Already have an account? <a href="/login" className="register-link">Log In</a></p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ConsumerSignup;
