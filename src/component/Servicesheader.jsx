import React from "react";
import logo from '../assests/images/logo.png';
import "./Servicesheader.css";

const Servicesheader = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Service on Tab" />
                <div className="logo-text">
                    <h1>Service on <span className="highlight">Tab</span></h1>
                    <p>Repair and maintain</p>
                </div>
            </div>
            <nav className="navigation">
                <a href="#home">Home</a>
                <a href="#services">Add Services</a> 
                <a href="#ourservices">Services</a> 
                <a href="#faq">FAQ</a>
                <a href="#contact">Contact Us</a>
            </nav>
            <div className="logout">
                <button>Logout</button>
            </div>
        </header>
    );
};

export default Servicesheader;
