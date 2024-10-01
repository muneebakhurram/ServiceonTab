import React from "react";
import logo from '../assests/images/logo.png';
import searchIcon from '../assests/images/icon.png';
import "./Header.css";

const Header = () => {
    return (
        <header className="header d-flex justify-content-between align-items-center p-3">
            <div className="logo d-flex align-items-center">
                <img src={logo} alt="Service on Tab" className="logo-image" />
                <div className="logo-text">
                    <h1>Service on <span className="highlight">Tab</span></h1>
                    <p>Repair and maintain</p>
                </div>
            </div>
            <nav className="navigation d-flex">
                <a href="#home" className="nav-link">Home</a>
                <a href="#services" className="nav-link">Services</a>
                <a href="#faq" className="nav-link">FAQ</a>
                <a href="#contact" className="nav-link">Contact Us</a>
            </nav>
            <div className="search-login d-flex align-items-center">
                <div className="search-box position-relative">
                    <input type="text" placeholder="Search..." className="form-control" />
                    <img src={searchIcon} alt="Search" className="search-icon position-absolute" />
                </div>
                <button className="btn btn-outline-primary ml-2">Become a Provider</button>
            </div>
        </header>
    );
};

export default Header;
