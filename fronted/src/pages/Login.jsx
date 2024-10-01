import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'; // Updated CSS file
import axios from 'axios';
import HeaderLogin from "../component/HeaderLogin";
import Footer from "../component/Footer";

export const LoginPageConsumer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/Auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        navigate('/homepage'); // Navigate to Homepage after successful login
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message === "Email not verified or not registered.") {
          setErrorMessage("Please verify your email before logging in.");
        } else {
          setErrorMessage(error.response.data.message || "Login failed. Please try again.");
        }
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="vh-100 login-page-consumer">
      <HeaderLogin />
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-6 d-none d-md-block">
            {/* Image parallel to the form */}
            <img 
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" 
              className="img-fluid login-image" 
              alt="Phone image" 
            />
          </div>
          <div className="col-md-6">
            <div className="login-form-shadow">
              <form onSubmit={handleLogin}>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {/* Email input */}
                <div className="form-outline mb-4">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="form1Example3"
                    />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                  </div>
                  <a href="/consumersignup">Create Account?</a> {/* Navigate to Consumer Signup */}
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block login-btn" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default LoginPageConsumer;