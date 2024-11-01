import React, { useEffect, useState } from 'react';
import Footer from '../component/Footer';
import Headeruser from '../component/Headeruser';
import '../styles/DisplayServices.css'; // Ensure to import the CSS file for styling

function DisplayServices() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/Addservice/all'); // Ensure this URL is correct
        const data = await response.json();
        if (data.success) {
          setServices(data.services);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to fetch services.');
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="DisplayServices">
      <Headeruser />
      <div className="homeContainer">
        <div className="homeContent">
          <h2 className="services-title">Available Services</h2>
          <div className="services-card-container">
            {error && <p className="error">{error}</p>}
            {services.length > 0 ? (
              services.map((service, index) => (
                <div key={index} className="service-card">
                  <img src={service.picture || 'placeholder-image.jpg'} alt={service.name} className="service-image" />
                  <div className="service-info">
                    <h3>{service.name}</h3>
                    <p>Rs. {service.estimatedCharges}</p>
                    <span className="status">Estimated</span>
                    <p className="provider">BY: {service.provider}</p>
                  </div>
                  <button className="book-now">Book Now</button>
                  <button className="favorite-btn">♡</button>
                </div>
              ))
            ) : (
              <p>No services available yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DisplayServices;
