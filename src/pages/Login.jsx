import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderLogin from "../component/HeaderLogin";
import Footer from "../component/Footer";
import "../styles/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginPageConsumer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationError, setVerificationError] = useState(""); // To display the verification status
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); 

  // Check for token in the URL and verify email
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      axios.get('http://localhost:5000/api/Authuser/verifyemail', { params: { token } })
        .then((response) => {
          if (response.data.success) {
            setVerificationError('Verification successful! You can now log in.');
          } else {
            setVerificationError("Verification failed. Please try again.");
          }
        })
        .catch(() => {
          setVerificationError("Verification failed. Please try again.");
        });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");  // Reset error message on new attempt
  
    try {
      const response = await axios.post('http://localhost:5000/api/Authuser/login', { email, password });
      console.log(response); // Check the response here
      
      if (response.data.success) {
        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password); // Save password (Not secure, just for example)
        } else {
          localStorage.removeItem("email"); // Clear email if "Remember Me" is unchecked
          localStorage.removeItem("password"); // Clear password if "Remember Me" is unchecked
        }


        navigate('/home-page'); // Redirect to homepage if login is successful
      } else {
        setErrorMessage(response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(error); // Log the error details here
      setErrorMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  
  

    // Special case for admin login
    if (email === "37925@riphah.edu.pk" && password === "JSM123@") {
      navigate('/home'); // Navigate to Admin page
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
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
                {verificationError && (
                  <p className={verificationError.includes('successful') ? "success-message" : "error-message"}>
                    {verificationError}
                  </p>
                )}

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
                  <div className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={togglePasswordVisibility}
                      className="eye-icon"
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="form1Example3"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      Remember me
                    </label>
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
