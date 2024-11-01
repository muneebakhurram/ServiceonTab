// src/pages/LoginPageConsumer.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderLogin from "../component/HeaderLogin";
import Footer from "../component/Footer";
import "../styles/login.css";

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

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format.");
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting login with email:", email); // Debug statement
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("API response:", response.data); // Debug statement

      if (response.data.success) {
        // Navigate to homepage on successful login
        navigate("/homepage");
      } else {
        setErrorMessage(response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error); // Debug statement
      if (error.response) {
        // Displaying the error message from server response
        setErrorMessage(error.response.data.message || "Login failed. Please try again.");
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
            <img 
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" 
              className="img-fluid login-image" 
              alt="Phone illustration" 
            />
          </div>
          <div className="col-md-6">
            <div className="login-form-shadow">
              <form onSubmit={handleLogin}>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

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
                    <input className="form-check-input" type="checkbox" id="form1Example3" />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                  </div>
                  <a href="/consumersignup">Create Account?</a>
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block login-btn" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
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
