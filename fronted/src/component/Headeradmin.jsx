import React, { useState, useEffect } from "react";
import axios from 'axios';
import logo from '../assests/images/logo.png';
import '../component/Headeradmin.css';

const Headeradmin = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

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

  // Handle approve action
  const handleApprove = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/Admin/accept/${id}`, { isAccepted: true });
      alert('Admin approved!');
      setPendingRequests(pendingRequests.filter(request => request._id !== id));
    } catch (error) {
      alert('Error approving provider.');
    }
  };

  // Handle reject action
  const handleReject = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/Admin/accept/${id}`, { isAccepted: false });
      alert('Admin rejected!');
      setPendingRequests(pendingRequests.filter(request => request._id !== id));
    } catch (error) {
      alert('Error rejecting provider.');
    }
  };

  // Handle download action
  const handleDownload = async (filePath) => {
    try {
      const response = await axios.get(filePath, { responseType: 'blob' });
      const contentType = response.headers['content-type'];
      const blob = new Blob([response.data], { type: contentType });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = filePath.split('/').pop(); // Get filename from URL path
      downloadLink.click();
      URL.revokeObjectURL(downloadLink.href); // Clean up
    } catch (error) {
      console.error('Download failed:', error);
      alert('Error downloading file. Please try again.');
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
                pendingRequests.map((request) => (
                  <div key={request._id} className="request-item">
                    <p><strong>Name:</strong> {request.name}</p>
            
                    <p><strong>CNIC (Back):</strong>
                      <span 
                        onClick={() => handleDownload(`http://localhost:5000/api/Admin/download/cnicBack/${request._id}`)} 
                        className="download-link">
                        Download
                      </span>
                    </p>

                    <p><strong>CNIC (Front):</strong>
                      <span 
                        onClick={() => handleDownload(`http://localhost:5000/api/Admin/download/cnicFront/${request._id}`)} 
                        className="download-link">
                        Download
                      </span>
                    </p>

                    <p><strong>Police Certificate:</strong>
                      <span 
                        onClick={() => handleDownload(`http://localhost:5000/api/Admin/download/clearanceCertificate/${request._id}`)} 
                        className="download-link">
                        Download
                      </span>
                    </p>
                    <div className="request-actions">
                      <button 
                        onClick={() => handleApprove(request._id)} 
                        className="approve-btn">Accept</button>
                      <button 
                        onClick={() => handleReject(request._id)} 
                        className="reject-btn">Reject</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <a href="#blockuser">Block Account</a>
        <a href="#contact">Contact Us</a>
      </nav>
      <div className="search-login d-flex align-items-center">
        <button className="btn btn-primary" onClick={() => window.location.href='/login'}>Logout</button>
      </div>
    </header>
  );
};

export default Headeradmin;
