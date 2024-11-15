import React, { useState, useEffect } from "react";
import axios from 'axios';
import logo from '../assests/images/logo.png';
import "./HeaderServiceprovider.css";



const HeaderServiceprovider = () => {

    const [pendingRequests, setPendingRequests] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const fetchRequests = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/BookingRequest/pending-requests');
          setPendingRequests(response.data);
        } catch (error) {
          console.error('Error fetching requests:', error);
        }
      };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
      };


      const handleApprove = async (id) => {
        try {
          await axios.post(`http://localhost:5000/api/BookingRequest/accept/${id}`, { isAccepted: true });
          alert('Provider approved!');
          setPendingRequests(pendingRequests.filter(request => request._id !== id));
        } catch (error) {
          alert('Error approving provider.');
        }
      };


      const handleReject = async (id) => {
        try {
          await axios.post(`http://localhost:5000/api/BookingRequest/accept/${id}`, { isAccepted: false });
          alert('Provider rejected!');
          setPendingRequests(pendingRequests.filter(request => request._id !== id));
        } catch (error) {
          alert('Error rejecting provider.');
        }
      };

      useEffect(() => {
        fetchRequests(); // Fetch pending requests when component mounts
      }, []);


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
                <div className="dropdown">
                    <a
                        href="#bookingrequest"
                        className="request-link"
                        onClick={toggleDropdown}
                    >
                        Request
                    </a>
                    {dropdownVisible && (
                        <div className="dropdown-content">
                            {pendingRequests.length === 0 ? (
                                <p>No pending requests</p>
                            ) : (
                                pendingRequests.map((bookingId) => (
                                    <div key={bookingId._id} className="request-item">
                                        <p><strong>Service Name:</strong> {bookingId.serviceName}</p>

                                        <p><strong>Estimated Charges:</strong> {bookingId.estimatedCharges}</p>

                                        <p><strong>Time:</strong> {bookingId.time}</p>

                                        <p><strong>Date:</strong> {bookingId.date}</p>

                                        <div className="request-actions">
                                            <button 
                                                onClick={() => handleApprove(bookingId._id)} 
                                                className="approve-btn">Accept</button>
                                            <button 
                                                onClick={() => handleReject(bookingId._id)} 
                                                className="reject-btn">Reject</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
                <a href="#faq">FAQ</a>
                <a href="#contact">Contact Us</a>
            </nav>
            <div className="logout">
            <button className="btn btn-primary" onClick={() => window.location.href='/Providerlogin'}>Logout</button>
            </div>
        </header>
    );
};

export default HeaderServiceprovider;