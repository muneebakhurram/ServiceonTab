import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import logo from '../assests/images/logo.png';
import '../component/Headeradmin.css';

const Headeradmin = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  // Fetch pending requests
  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/Admin/pending-requests');
      setPendingRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
        setNotification(null); // Automatically remove the notification after 2 seconds
    }, 2000);
};

  // Handle approve action
  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/Admin/accept/${id}`, { isAccepted: true });
      showNotification('success', ' Approved!');
      setPendingRequests(pendingRequests.filter(request => request._id !== id));
    } catch (error) {
      setNotification({ type: 'error', message: 'Error approving the request.' });
    }
  };

  // Handle reject action
  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/Admin/accept/${id}`, { isAccepted: false });
      showNotification('success', 'Rejected!');
      setPendingRequests(pendingRequests.filter(request => request._id !== id));
    } catch (error) {
      setNotification({ type: 'error', message: 'Error rejecting the request.' });
    }
  };

 
  const handleDownload = async (url) => {
    try {
        // Making the GET request to fetch the file
        const response = await axios.get(url, { responseType: 'blob' });

        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        // Create a link element
        const link = document.createElement('a');
        
        // Extract the file name from the URL (handle different formats)
        const fileName = url.split('/').pop();
        link.href = window.URL.createObjectURL(blob);
        
        // Set the download attribute to prompt file download with original name
        link.download = fileName;

        // Trigger the download by clicking the link
        link.click();
    } catch (error) {
        alert('Error downloading file.');
    }
};


  useEffect(() => {
    fetchRequests(); // Fetch pending requests when component mounts
  }, []);

  const handleLogout = () => {
    navigate('/login');
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

        {/* Dropdown for Pending Requests */}
        <div className="dropdown">
          <a
            href="#requests"
            className="request-link"
            onClick={toggleDropdown}
          >
            Requests
          </a>
          {dropdownVisible && (
            <div className="dropdown-content">
              {pendingRequests.length === 0 ? (
                <p>No pending requests</p>
              ) : (
                pendingRequests.map((providerId) => (
                  <div key={providerId._id} className="request-item">
                    <p><strong>Name:</strong> {providerId.name}</p>
            
                    <p><strong>CNIC (Back):</strong>
                      <span 
                         onClick={() => handleDownload(`http://localhost:5000/api/Provider/download/cnicBack/${providerId._id}`)} 
                        className="download-link">
                        Download
                      </span>
                    </p>

                    <p><strong>CNIC (Front):</strong>
                      <span 
                        onClick={() => handleDownload(`http://localhost:5000/api/Provider/download/cnicFront/${providerId._id}`)} 
                        className="download-link">
                        Download
                      </span>
                    </p>

                    <p><strong>Police Certificate:</strong>
                      <span 
                        onClick={() => handleDownload(`http://localhost:5000/api/Provider/download/policeCertificate/${providerId._id}`)} 
                        className="download-link">
                        Download
                      </span>
                    </p>
                    <div className="request-actions">
                      <button 
                        onClick={() => handleApprove(providerId._id)} 
                        className="approve-btn">Accept</button>
                      <button 
                        onClick={() => handleReject(providerId._id)} 
                        className="reject-btn">Reject</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <a href="#blocklist">Block Account</a>
        <a href="#footer">Contact Us</a>
      </nav>
      <div className="search-login d-flex align-items-center">
      <div className="admin-label">Admin</div>
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

export default Headeradmin;
