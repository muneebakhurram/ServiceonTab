import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assests/images/logo.png';
import searchIcon from '../assests/images/icon.png';
import "./Header.css";

const Header = () => {
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const handleProtectedClick = () => {
        setShowMessage(true); // Show message when user clicks protected links
        setTimeout(() => setShowMessage(false), 2000); // Hide message after 3 seconds
    };

    const handleProviderSignup = () => {
        navigate("/providersignup"); // Navigate to /providersignup
    };

    return (
        <>
        <header className="header d-flex justify-content-between align-items-center p-3">
            <div className="logo d-flex align-items-center">
                <img src={logo} alt="Service on Tab" className="logo-image" />
                <div className="logo-text">
                    <h1>Service on <span className="highlight">Tab</span></h1>
                    <p>Repair and maintain</p>
                </div>
            </div>
            <nav className="navigation">
            <a href="#" onClick={handleProtectedClick} className="protected-link">Home</a>
            <a href="#" onClick={handleProtectedClick} className="protected-link">Services</a>
            <a href="#" onClick={handleProtectedClick} className="protected-link">FAQ</a>
            <a href="#footer">Contact Us</a>
            </nav>
            <div className="search-login d-flex align-items-center">
                <div className="search-box position-relative">
                    <input type="text" placeholder="Search..." className="form-control" />
                    <img src={searchIcon} alt="Search" className="search-icon position-absolute" />
               </div>
                    <button className="btn btn-outline-primary ml-2" onClick={handleProviderSignup}>
                        Become a Provider
                    </button>
                </div>
        </header>

        {showMessage && (
                <div className="login-message">
                    <p>Please log in to access this feature.</p>
                </div>
            )}


        </>
    );
};

export default Header;
