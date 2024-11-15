import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/consumersignup.css"; // Ensure you have the updated CSS file
import csignupImage from "../assests/images/signup2.jpg";
import axios from "axios";
import Header from "../component/Header";
import Footer from "../component/Footer";

export const ConsumerSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    companyCode: '+92', // Default country code
    phonenumber: '', // Phone number field starts as empty
    address: '',
    password: '',
    confirmpassword: ''
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Concatenate companyCode and phonenumber into phoneNumber
    const phoneNumber = form.companyCode + form.phonenumber;

    if (!phoneNumber) {
      setError({ general: 'Please provide a valid phone number.' });
      return;
    }

    const formData = {
      name: form.name,
      email: form.email,
      phoneNumber:phoneNumber,  
      address: form.address,
      password: form.password,
    };

    console.log("Form data is: ", formData);

    try {
      const response = await axios.post('http://localhost:5000/api/Authuser/signup', formData);
  
      if (response.data.success) {
        setSuccess("Signup successful! Please verify your email.");
        setError({});
  
        // Redirect to login page after a delay
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
      setError({ general: errorMessage });
      setSuccess('');
    }
  };

  return (
    <div className="vh-100 d-flex flex-column">
      <Header />
      <section className="container py-5 flex-center">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={csignupImage} className="img-fluid" alt="Sign Up Illustration" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div className="form-container shadow p-4">
              <form onSubmit={handleSubmit}>
                {success && <p className="success-message">{success}</p>}
                {error.general && <p className="error-message">{error.general}</p>}

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control form-control-lg"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                  {error.name && <p className="error-message">{error.name}</p>}
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {error.email && <p className="error-message">{error.email}</p>}
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="phonenumber">Phone Number</label>
                  <div className="phone-input">
                    <select
                      name="companyCode"
                      value={form.companyCode}
                      onChange={handleChange}
                      className="phone-code"
                    >
                      <option value="+92">+92 (Pakistan)</option>
                      <option value="+92300">+92 300 (Mobilink)</option>
                      <option value="+92345">+92 345 (Telenor)</option>
                      <option value="+92321">+92 321 (Warid)</option>
                      <option value="+92301">+92 301 (Zong)</option>
                    </select>
                    <input
                      type="tel"
                      id="phonenumber"
                      name="phonenumber"
                      className="form-control form-control-lg phone-number"
                      value={form.phonenumber}
                      onChange={handleChange}
                      placeholder="Enter 7-digit phone number"
                    />
                  </div>
                  {error.phonenumber && <p className="error-message">{error.phonenumber}</p>}
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form-control form-control-lg"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                  {error.address && <p className="error-message">{error.address}</p>}
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  {error.password && <p className="error-message">{error.password}</p>}
                </div>

                <div className="form-outline mb-2">
                  <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    className="form-control form-control-lg"
                    value={form.confirmpassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                  {error.confirmpassword && <p className="error-message">{error.confirmpassword}</p>}
                </div>

                <button type="submit" className="btn btn-primary mt-3">Sign Up</button>

                <p className="login-link">
                  Already have an account? <a href="/login" className="register-link">Login here</a>
                </p>
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