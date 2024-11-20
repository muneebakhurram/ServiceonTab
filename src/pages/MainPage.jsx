import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header.jsx';   
import Footer from '../component/Footer.jsx';   
import landingpic from '../assests/images/landingpic.png'
import '../styles/mainpage.css';   

const MainPage = () => {
    const navigate = useNavigate(); 

    const handleSignUpClick = () => {
        navigate('/signupform'); // Navigate to the signup form
    };

    return (
        <div className="landing-page">
            <Header />

            <div className="landingpage">
            <div className="text-sections">
                <h1 className="main-headings">Simplify Your Life with Our Professional Home Service</h1>
                <p className="sub-headings">We offer home services designed to maximize efficiency,</p>
                <p className="highlight">minimizing time, energy, and cost.</p>
                
                 <button className="signup-btn" onClick={handleSignUpClick}>Sign up</button>
                <p className="log-in-text">
                    Do you have an account? <a href="/login">Login</a>
                </p>
            </div>
            <img src={landingpic} alt="Landing" className="pic" />
        </div>

            <Footer />
        </div>
    );
};
export default MainPage;