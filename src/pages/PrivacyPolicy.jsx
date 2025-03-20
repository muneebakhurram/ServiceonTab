import React, { useEffect } from "react";
import "../styles/PrivacyPolicy.css";
import { FaPhone } from "react-icons/fa";
import Headeruser from '../component/Headeruser.jsx';   
import Footer from '../component/Footer.jsx';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-container">
      <Headeruser />

      <div className="privacy-content">
        <div className="privacy-header">
          <h2>Privacy Policy</h2>
          <p>Protecting your personal data is our top priority</p>
        </div>

        <div className="section">
          <h3>Information We Collect</h3>
          <p>
            We collect your name, email, phone number, and address to provide our services. 
            We also gather booking history, requested services, and secure payment details. 
            Additionally, we may use your location for accurate address information.
          </p>
        </div>

        <div className="section">
          <h3>How We Use Your Information</h3>
          <p>
          We use your information to improve home services and make the process smooth and reliable. 
          This includes handling bookings, keeping payments secure, and sending updates or notifications 
          about your requests. We also verify service providers and take security steps to keep the platform 
          safe and trustworthy.
         
          </p>
        </div>

        <div className="section">
          <h3>Data Protection</h3>
          <p>Your data is encrypted and protected with strict security measures to prevent unauthorized access.</p>
        </div>

        <div className="section">
          <h3>Third-Party Sharing</h3>
          <p>We do not sell or share your data, except for payment processing or legal compliance (e.g., police verification).</p>
        </div>

        <div className="section">
          <h3>Policy Updates</h3>
          <p>We may update this Privacy Policy from time to time. Stay informed by checking this page regularly.</p>
        </div>

        <div className="section contact-section">
          <h3>Contact Us</h3>
          <p>If you have any questions, feel free to contact us at:</p>
          <p className="contact-info">
            <FaPhone className="phone-icon" /> <strong>0310-8885048</strong>
            <FaPhone className="phone-icon" /> <strong>0317-0822107</strong>
            <FaPhone className="phone-icon" /> <strong>0316-5267484</strong>
          </p>
        
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
