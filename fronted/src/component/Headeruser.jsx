// Headeruser.jsx
import React from "react";
import logo from '../assests/images/logo.png';
import searchIcon from '../assests/images/icon.png';
import "./Headeruser.css";

const Headeruser = ({ user }) => {
    return (
        <header className="header">
            <div className="logo" onClick={() => window.location.href = '#home'}>
                <img src={logo} alt="Service on Tab" />
                <div className="logo-text">
                    <h1>Service on <span className="highlight">Tab</span></h1>
                    <p>Repair and maintain</p>
                </div>
            </div>
            <nav className="navigation">
                <a href="#home">Home</a>
                <a href="#ourservices">Services</a>
                <a href="#faq">FAQ</a>
                <a href="#contact">Contact Us</a>
            </nav>
            <div className="search-login d-flex align-items-center">
                <div className="search-box">
                    <input type="text" placeholder="Search..." />
                    <img src={searchIcon} alt="Search" className="search-icon" />
                </div>
                {/* Display user name if available */}
                {user ? (
                    <div className="user-greeting">
                        <span>Welcome, {user.name}!</span>
                    </div>
                ) : (
                    <a href="/login">Login</a>
                )}
            </div>
        </header>
    );
};

export default Headeruser;
