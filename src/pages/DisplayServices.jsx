import React, { useEffect, useState } from 'react';
import Footer from '../component/Footer';
import Headeruser from '../component/Headeruser';
import '../styles/DisplayServices.css';

function DisplayServices() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true); // Set loading to true
      try {
        const response = await fetch('http://localhost:5000/api/Addservice/all');
        const data = await response.json();
        if (data.success) {
          setServices(data.services);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to fetch services.');
      } finally {
        setLoading(false); // Set loading to false
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="display-services">
      <Headeruser />
      <div className="home-container">
        <div className="home-content">
          <h2 className="services-title">Available Services</h2>
          <div className="services-card-container">
            {loading && <p>Loading services...</p>}
            {error && <p className="error-message">{error}</p>}
            {services.length > 0 ? (
              services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-info">
                    <h3 className="service-name">{service.name}</h3> {/* Service Name */}
                    <p className="service-price">Rs. {service.estimatedCharges}</p> {/* Estimated Charges */}
                    <span className="service-type">{service.type}</span> {/* Service Type */}
                  </div>
                  {service.picture ? (
                    <img
                      src={`http://localhost:5000${service.picture}`} // Correct image URL
                      alt={service.name}
                      className="service-image" // Image below service info
                    />
                  ) : (
                    <div className="no-image-placeholder">
                      No Image Available
                    </div>
                  )}
                  <div className="button-container">
                    <button className="book-now">Book Now</button>
                    <button className="favorite-btn">♡</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-services">No services available yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DisplayServices;
