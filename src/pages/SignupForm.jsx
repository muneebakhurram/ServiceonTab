import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/consumersignup.css";
import csignupImage from "../assests/images/signup2.jpg";
import axios from "axios";
import Header from "../component/Header";
import Footer from "../component/Footer";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneCode: '+92', // Default country code
        phoneNumber: '',  // Ensure this matches the backend schema
        email: '',
        password: '',
        confirmPassword: '',
        address: ''
      });
      

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!/^[A-Za-z]{3,15}$/.test(formData.name)) {
      errors.name = 'Name should be unique, only alphabetic, and 3-15 characters long';
    }

    // Password validation
    if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/.test(formData.password)) {
      errors.password = 'Password must be 8-15 characters, with 1 special and 1 uppercase letter';
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Email validation
    if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    // Phone number validation (Check if phone number starts with the correct country code and contains exactly 7 digits)
    const phoneNumber = formData.phoneCode + formData.phoneNumber;
    if (!/^\+?\d{2,4}?\d{7}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must be valid with the country code';
    }

    // Address validation
    if (!/^[\w\s.,-]{10,}$/.test(formData.address)) {
      errors.address = 'Address must be at least 10 characters and contain valid symbols';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
// When sending the data to the backend, make sure it matches the schema
const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Combine the country code and phone number
        const fullPhoneNumber = formData.phoneCode + formData.phoneNumber;
  
        // Prepare the data to be sent to the backend
        const submissionData = { 
          ...formData, 
          phoneNumber: fullPhoneNumber  // Make sure 'phoneNumber' is used here
        };
  
        await axios.post('http://localhost:5000/api/Authuser/signup', submissionData);
  
        alert('Account created. Please check your email to verify your account.');
      } catch (error) {
        if (error.response && error.response.status === 500) {
          alert('Server error. Please try again later.');
        } else {
          alert('Error creating account');
        }
      }
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="signup-page">
      <Header />
      <div className="container mt-4 p-4 border rounded shadow-sm">
        <div className="row">
          <div className="col-md-6">
            <img src={csignupImage} className="img-fluid" alt="Sign Up Illustration" />
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control" />
              {errors.name && <p className="text-danger">{errors.name}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number:</label>
              <div className="phone-input d-flex">
                <select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleInputChange}
                  className="phone-code form-select me-2"
                >
                  <option value="+92">+92 (Pakistan)</option>
                  <option value="+92300">+92 300 (Mobilink)</option>
                  <option value="+92345">+92 345 (Telenor)</option>
                  <option value="+92321">+92 321 (Warid)</option>
                  <option value="+92301">+92 301 (Zong)</option>
                </select>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter 7-digit phone number"
                  maxLength="7"
                />
              </div>
              {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="form-control" />
              {errors.password && <p className="text-danger">{errors.password}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password:</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="form-control" />
              {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Address:</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="form-control" />
              {errors.address && <p className="text-danger">{errors.address}</p>}
            </div>

            <button onClick={handleSubmit} className="btn btn-primary w-100">Sign Up</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupForm;
