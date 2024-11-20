import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import logo from '../assests/images/logo.png';
import "./HeaderServiceprovider.css";



const HeaderServiceprovider = () => {

    const [pendingRequests, setPendingRequests] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

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

      const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification(null); // Automatically remove the notification after 2 seconds
        }, 2000);
    };

      const handleApprove = async (id) => {
        try {
          await axios.post(`http://localhost:5000/api/BookingRequest/accept/${id}`, { isAccepted: true });
          showNotification('success', ' Approved!');
            setPendingRequests(pendingRequests.filter(request => request._id !== id));
        } catch (error) {
          setNotification({ type: 'error', message: 'Error approving the request.' });
        }
      };


      const handleReject = async (id) => {
        try {
          await axios.post(`http://localhost:5000/api/BookingRequest/accept/${id}`, { isAccepted: false });
          showNotification('success', 'Rejected!');
            setPendingRequests(pendingRequests.filter(request => request._id !== id));
        } catch (error) {
          setNotification({ type: 'error', message: 'Error rejecting the request.' });
        }
      };

      useEffect(() => {
        fetchRequests(); // Fetch pending requests when component mounts
      }, []);

      const handleLogout = () => {
        navigate('/Providerlogin');
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
                <a href="#aservice">Add Services</a> 
                <a href="#myservices">Services</a> 
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
                <a href="#footer">FAQ</a>
                <a href="#footer">Contact Us</a>
            </nav>
            <div className="logout">
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
        </header>
    );
};

export default HeaderServiceprovider;