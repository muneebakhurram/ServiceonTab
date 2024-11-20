import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../component/Footer';
import Headeruser from '../component/Headeruser';
import '../styles/DisplayServices.css';
import mainpic from '../assests/images/main.png';

function DisplayServices() {
  const { type } = useParams();  
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true); 
      try {
        const response = await fetch('http://localhost:5000/api/Addservice/all');
        const data = await response.json();
        if (data.success) {
          // Filter services by type (Plumber, Electrician.)
          const filteredServices = data.services.filter(service =>
            service.type.toLowerCase() === type.toLowerCase()
          );
          setServices(filteredServices);
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
  }, [type]); 

  const handleBookNow = (service) => {
    navigate('/booking-form', {
      state: {
        serviceId: service._id,
        serviceName: service.name,
        estimatedCharges: service.estimatedCharges,
      },
    });
  };


  return (
    <div className="display-services">
      <Headeruser />
   
       <div id="home" className="service-container">
        <div className="text-section">
          <h1 className="main-heading">Simplify Your Life with Our Professional Home Service</h1>
          <p className="sub-heading">Bringing ease, comfort, and quality service right to your</p>
          <p className="highlight-text"> doorstep. We offer home services designed to maximize</p>
          <p className="highlight-text">efficiency, minimizing time, energy, and cost.</p>
        </div>
                
        <div className="image-section">
         
          <img src={mainpic} alt="Handyman with tools" className="main-pic" />
        </div>
      </div>

      <div className="home-container">
        <div className="home-content">
          <h2 className="services-title">{type.charAt(0).toUpperCase() + type.slice(1)} Services</h2>
          <div  className="services-card-container">
            {loading && <p>Loading services...</p>}
            {error && <p className="error-message">{error}</p>}
            {services.length > 0 ? (
              services.map((service) => (
                <div key={service._id} className="service-card">
                 
                 
                 {service.picture ? (
  <img 
    src={`http://localhost:5000/${service.picture}`}
    alt={service.name}
    className="service-image"
    
  />
) : (
  <div className="no-image-placeholder">No Image Available</div>
)}
                  
                
                  <div  className="service-info">
                    <h3 className="service-name">{service.name}</h3>
                    <p className="service-price">Rs. {service.estimatedCharges}</p>
                    <p className="service-estimate">Estimated</p> {/* Additional text to show "Estimated" */}
                  </div>
                  <button
                    className="book-now"
                    onClick={() => handleBookNow(service)}
                  >
                    Book Now
                  </button>
                  
                </div>
              ))
            ) : (
              <p className="no-services">No services available for this category.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DisplayServices;