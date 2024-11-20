import React from "react";
import { useNavigate } from 'react-router-dom'; 
import logo from '../assests/images/logo.png';
import searchIcon from '../assests/images/icon.png';
import "./Headeruser.css";

const Headeruser = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
    };


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
                <a href="#ourservices">Services</a> 
                <a href="#footer">FAQ</a>
                <a href="#footer">Contact Us</a>
            </nav>
            <div className="search-login">
                <div className="search-box">
                    <input type="text" placeholder="Search..." />
                    <img src={searchIcon} alt="Search" className="search-icon" />
                </div>
             
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Headeruser;