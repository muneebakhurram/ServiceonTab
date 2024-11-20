import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assests/images/logo.png';
import searchIcon from '../assests/images/icon.png';
import "./Header.css";

const Header = () => {

    const [showMessage, setShowMessage] = useState(false); //  show/hide message
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLoginClick = () => {
        navigate('/Providerlogin'); // Redirect to /Providerlogin
    };
    const handleProtectedClick = () => {
        setShowMessage(true); // Show message when user clicks protected links
        setTimeout(() => setShowMessage(false), 2000); // Hide message after 3 seconds
    };
    return (
        <>
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Service on Tab" />
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
            <div className="search-login">
                <div className="search-box">
                    <input type="text" placeholder="Search..." />
                    <img src={searchIcon} alt="Search" className="search-icon" />
                </div>
               
                <button onClick={handleLoginClick}>Login</button>
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