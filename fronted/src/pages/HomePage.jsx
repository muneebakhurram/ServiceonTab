import React, { useState, useEffect } from 'react';
import decore from '../assests/images/decore.png';
import mainpic from '../assests/images/pngegg.png';
import electrtion from '../assests/images/Electrtion.png';
import plumber from '../assests/images/plumber.png';
import mechnic from '../assests/images/mechnic.png';
import Whycustomer from '../assests/images/whycutomerchooseus.png';
import welcomepic1 from '../assests/images/welcomepic1.png';
import welcomepic2 from '../assests/images/ewelcomepic2.png';
import line from '../assests/images/line2.png';
import Headeruser from '../component/Headeruser';   
import Footer from '../component/Footer';   
import '../styles/HomePage.css';

function HomePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <div>
            <Headeruser />
            {user && (
                <div className="user-greeting">
                    <p>Welcome, {user.name}!</p>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            )}
            <div className="service-container">
                <div className="text-section">
                    <h1 className="main-heading">Simplify Your Life with Our Professional Home Service</h1>
                    <p className="sub-heading">We offer home services designed to maximize efficiency,</p>
                    <p className="highlight-text">minimizing time, energy, and cost.</p>
                    <button className="sign-up-btn">Sign up</button>
                    <p className="login-text">
                        Do you have an account? <a href="/login">Login</a>
                    </p>
                </div>
                <div className="image-section">
                    <img src={decore} alt="Background Design" className="background-decore" />
                    <img src={mainpic} alt="Handyman with tools" className="main-pic" />
                </div>
            </div>

            <div className="services-section" id="ourservices"> 
                <h2 className="services-heading">Our Services</h2>
                <img src={line} alt="Line Design" className="line-image" /> 
                <div className="services-boxes">
                    <div className="service-box">
                        <img src={plumber} alt="Plumber" className="service-image" />
                        <p className="service-text">Plumber</p>
                    </div>
                    <div className="service-box">
                        <img src={electrtion} alt="Electrician" className="service-image" />
                        <p className="service-text">Electrician</p>
                    </div>
                    <div className="service-box">
                        <img src={mechnic} alt="Mechanic" className="service-image" />
                        <p className="service-text">Mechanic</p>
                    </div>
                </div>
            </div>

            <div className="quote-section">
                <div className="quote-contents">
                    <div className="texts">
                        <div className="frame">
                            <div className="why-our-customers">
                                Why our customers
                                <br />
                                choose us?
                            </div>
                        </div>
                        <p className="text-wrapper">
                            Service on Tab is your go-to platform for home services, offering reliable and skilled Electricians,
                            Plumbers, and Mechanics across Pakistan. Choosing Service on Tab means selecting trust, expertise, and a
                            seamless customer experience. With our commitment to quality and efficiency, your home is in the best hands.
                        </p>
                    </div>
                </div>
                <div className="image" />
            </div>

            <div className="about-section">
                <div className="images">
                    <div className="overlap-group">
                        <img className="image" alt="Image" src={welcomepic1} />
                        <img className="img" alt="Image" src={welcomepic2} />
                    </div>
                </div>
                <div className="overlap">
                    <div className="about-contents">
                        <div className="texts">
                            <div className="frame">
                                <div className="div-wrapper">
                                    <p className="text-wrapper">
                                        In a few easy clicks, you can use the Service on Tab to Urgent Booking and Get offers option the
                                        Cheapest and most Reliable Professionals and get all of your work done anywhere
                                    </p>
                                </div>
                            </div>
                            <div className="point">
                                <div className="div">
                                    <div className="frame-2">
                                        <div className="frame-3">
                                            <div className="text-wrapper-2">Police Verified Experts</div>
                                        </div>
                                    </div>
                                    <div className="frame-2">
                                        <div className="text-wrapper-3">Verified Professionals</div>
                                    </div>
                                    <div className="frame-4">
                                        <div className="text-wrapper-4">Quick Booking Process</div>
                                    </div>
                                </div>
                                <div className="frame-5">
                                    <div className="frame-2">
                                        <div className="text-wrapper-5">Easy Payments</div>
                                    </div>
                                    <div className="frame-6">
                                        <div className="text-wrapper-6">Top Rated Services</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
