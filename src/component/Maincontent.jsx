import React from 'react';
import admin from '../assests/images/admin.png';
import { useNavigate } from 'react-router-dom';
import '../styles/MainContent.css';

const MainContent = () => {
    const navigate = useNavigate();

    // Functions for button navigation
    const handleSignupClick = () => navigate('/consumersignup');
    const handleAcceptRequest = () => navigate('/accept-requests');
    const handleVerifyService = () => navigate('/verify-service');
    const handleBlockService = () => navigate('/block-service');

    return (
        <div>
            <div id="home" className="service-container">
                <div className="text-section">
                    <h1 className="main-heading">Expert Management of<br /> Home Service Providers</h1>
                    <p className="sub-heading">Efficiently overseeing service providers ensures</p>
                    <p className="highlight-text">quality and reliability. Manage and oversee service</p>
                    <p className="highlight-text">providers by verifying their credentials</p>
                </div>

                <div className="image">
                    <img src={admin} alt="Background Design" className="background" />
                </div>
            </div>

            <div  className="cards-container">
                <div className="card">
                    <h3>Manage Provider</h3>
                  
                    <button className="btn btn-primary" onClick={handleAcceptRequest}>View Rating</button>
                </div>
                <div className="card">
                    <h3>Manage Consumer</h3>
                  
                    <button className="btn btn-primary" onClick={handleVerifyService}>View Consumer</button>
                </div>
                <div id="blocklist" className="card">
                    <h3>Block Account</h3>
                  
                    <button className="btn btn-danger" onClick={handleBlockService}>View Blocked Users</button>
                </div>
            </div>
        </div>
    );
};

export default MainContent;