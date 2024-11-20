import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Headerserviceprovider from '../component//HeaderServicerpovider' ;
import Footer from '../component/Footer'; 
import '../styles/serviceproviderdashboard.css'; 
import mainpic from '../assests/images/addservices.png';
const ServiceProviderDashboard = ({ user }) => {

    const [services, setServices] = useState([]); //manage services
    const navigate = useNavigate();

  

    const addService = () => {
      
        navigate('/add-service');
    };

    return (
        <div>
          
            <Headerserviceprovider  />

            <div className="service-container">
                <div id="home" className="text-section">
                    <h1 className="main-heading">Simplify Your Life with Our Professional Home Service</h1>
                    <p className="sub-heading">We offer home services designed to maximize efficiency,</p>
                    <p className="highlight-text">minimizing time, energy, and cost.</p>
                </div>
                <div className="image-section">
                   
                    <img src={mainpic} alt="Handyman with tools" className="main" />
                </div>
            </div>

          
            <main className="main-content">
            <h2 className="services-heading">Add Services</h2>
                <section id="add-service" className="card-section">
                    <div id="aservice"  className="service-card">
                    <button onClick={addService} className="add-service-button">+</button>
                    </div>
                 
                </section>
            </main>

         
            <Footer />
        </div>
    );
};

export default ServiceProviderDashboard;