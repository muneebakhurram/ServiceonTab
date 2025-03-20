import React, { useEffect, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import Headerserviceprovider from '../component/HeaderServicerpovider';
import Footer from '../component/Footer';
import '../styles/requestHandling.css';
import axios from "axios";

const RequestHandling = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [acceptedRequests, setAcceptedRequests] = useState([]); // New state for accepted requests
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    // Fetch pending requests
    const fetchPendingRequests = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/BookingRequest/pending-requests");
            setPendingRequests(response.data);
        } catch (error) {
            console.error("Error fetching pending requests:", error);
        }
    };

    // Fetch accepted requests
    const fetchAcceptedRequests = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/Booking/accepted-requests");
            setAcceptedRequests(response.data);
        } catch (error) {
            console.error("Error fetching accepted requests:", error);
        }
    };

    useEffect(() => {
        fetchPendingRequests();
        fetchAcceptedRequests();
    }, []);

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification(null);
        }, 2000);
    };

    const handleApprove = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/BookingRequest/accept/${id}`, { isAccepted: true });
            showNotification("success", "Approved, Email sent to Consumer");
            setPendingRequests(pendingRequests.filter(request => request._id !== id));
            fetchAcceptedRequests(); // Refresh accepted requests
        } catch (error) {
            showNotification("error", "Error approving the request.");
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/BookingRequest/accept/${id}`, { isAccepted: false });
            showNotification("success", "Rejected! Email sent to Consumer");
            setPendingRequests(pendingRequests.filter(request => request._id !== id));
        } catch (error) {
            showNotification("error", "Error rejecting the request.");
        }
    };


    const handleUpdateTracking = (bookingId) => {
        navigate(`/updatetracking/${bookingId}`); // ✅ Tracking page par bookingId ke saath navigate
    };


    return (
        <>
            <Headerserviceprovider />
            <div className="request-container">
                <h2>Pending Requests</h2>
                {pendingRequests.length === 0 ? (
                    <p>No pending requests</p>
                ) : (
                    pendingRequests.map((booking) => (
                        <div key={booking._id} className="request-item">
                            <p className="service-name">Service Name: {booking.serviceName}</p>
                            <Link to={`/booking/details/${booking._id}`} className="view-details">View Details</Link>
                            <div className="request-actions">
                                <button onClick={() => handleApprove(booking._id)} className="approve-btn">Accept</button>
                                <button onClick={() => handleReject(booking._id)} className="reject-btn">Reject</button>
                            </div>
                        </div>
                    ))
                )}

                <h2>Accepted Requests</h2>
                {acceptedRequests.length === 0 ? (
                    <p>No accepted requests</p>
                ) : (
                    acceptedRequests.map((booking) => (
                        <div key={booking._id} className="request-item accepted">
                            <p className="service-name">Service Name: {booking.serviceName}</p>
                            <Link to={`/booking/details/${booking._id}`} className="view-details">View Details</Link>
                            <div className="request-action">
                                 <button className="update-tracking-btn" onClick={() => handleUpdateTracking(booking._id)}>
                                    Update Tracking
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
            <Footer />
        </>
    );
};

export default RequestHandling;
