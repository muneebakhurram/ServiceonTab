import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/consumersignup.css";
import csignupImage from "../assests/images/signup2.jpg"; // Corrected spelling
import axios from "axios";
import Header from "../component/Header";
import Footer from "../component/Footer";

export const ConsumerSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    companyCode: '+92',
    phone: '',
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
    const formData = {
      name: form.name,
      email: form.email,
      phonenumber: `${form.companyCode}${form.phone}`,
      address: form.address,
      password: form.password,
      confirmpassword: form.confirmpassword
    };

    const newErrors = {};
    const nameRegex = /^[A-Za-z]{3,15}$/;
    if (!nameRegex.test(form.name)) newErrors.name = "Name should be 3-15 letters.";
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    if (!passwordRegex.test(form.password)) newErrors.password = "Password must include one uppercase and one special character.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) newErrors.email = "Invalid email format.";
    const phoneRegex = /^\d{7}$/;
    if (!phoneRegex.test(form.phone)) newErrors.phone = "Phone must be 7 digits.";
    if (form.address.length < 10) newErrors.address = "Address must be at least 10 characters.";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/Auth/createuser', formData);
      if (response.data.success) {
        setSuccess("Signup successful! Please verify your email.");
        setError({});
        setTimeout(() => {
          navigate('/login');
        }, 3000);
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
      <section className="container py-5 h-100 flex-grow-1">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={csignupImage} className="img-fluid" alt="Sign Up Illustration" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <div className="form-container shadow p-4">
              <form onSubmit={handleSubmit}>
                {success && <p className="success-message">{success}</p>}
                {error.general && <p className="error-message">{error.general}</p>}

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" className="form-control form-control-lg"
                         value={form.name} onChange={handleChange}
                         placeholder="Enter your name" required />
                  {error.name && <p className="error-message">{error.name}</p>}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email">Email address</label>
                  <input type="email" id="email" name="email" className="form-control form-control-lg"
                         value={form.email} onChange={handleChange}
                         placeholder="Enter your email" required />
                  {error.email && <p className="error-message">{error.email}</p>}
                </div>

                <div className="form-outline mb-0">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <div className="phone-input">
                    <select name="companyCode" value={form.companyCode} onChange={handleChange} className="phone-code" required>
                      <option value="+92">+92 (Pakistan)</option>
                      <option value="+92300">+92 300 (Mobilink)</option>
                      <option value="+92345">+92 345 (Telenor)</option>
                      <option value="+92321">+92 321 (Warid)</option>
                      <option value="+92301">+92 301 (Zong)</option>
                    </select>
                    <input type="text" id="phone" name="phone" className="form-control form-control-lg"
                           value={form.phone} onChange={handleChange}
                           placeholder="Phone Number" required />
                  </div>
                  {error.phone && <p className="error-message">{error.phone}</p>}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="address">Address</label>
                  <input type="text" id="address" name="address" className="form-control form-control-lg"
                         value={form.address} onChange={handleChange}
                         placeholder="Enter your address" required />
                  {error.address && <p className="error-message">{error.address}</p>}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" className="form-control form-control-lg"
                         value={form.password} onChange={handleChange}
                         placeholder="Password" required />
                  {error.password && <p className="error-message">{error.password}</p>}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="confirmpassword">Confirm Password</label>
                  <input type="password" id="confirmpassword" name="confirmpassword" className="form-control form-control-lg"
                         value={form.confirmpassword} onChange={handleChange}
                         placeholder="Confirm Password" required />
                </div>

                <br />
                <button type="submit" className="btn btn-primary btn-lg btn-block">Sign Up</button>
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
