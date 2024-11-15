import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'; // Updated CSS file
import axios from 'axios';
import HeaderLogin from "../component/HeaderLogin";
import Footer from "../component/Footer";

const Providerlogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [verificationError, setVerificationError] = useState(""); 
    
    const navigate = useNavigate();
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
       
        axios.post('http://localhost:5000/api/Admin/verify-email', { token })
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
    }, [navigate]);
    
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
  

      try {
        const response = await axios.post('http://localhost:5000/api/Provider/Providerlogin', { email, password });
        if (response.data.success) {
          navigate('/serviceproviderdashboard'); // Redirect to service provider dashboard upon successful login
        }
      } catch (error) {
        setErrorMessage("Login failed. Please check your email and password.");
      } finally {
        setLoading(false);
      }

      if (email === "37925@riphah.edu.pk" && password === "JSM123@") {
        navigate('/dashboard'); // Navigate to Admin page
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
                {verificationError && <p className={verificationError.includes('successful') ? "success-message" : "error-message"}>{verificationError}</p>}
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

export default Providerlogin;
