import React, { useEffect, useState } from 'react';
import Headeruser from '../component/Headeruser';
import Footer from '../component/Footer';
import '../styles/DisplayBooking.css';

const DisplayBooking = () => {
    const [bookingDetails, setBookingDetails] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/Booking/details`);
                console.log('Response Status:', response.status);  // Add this line to log status code
                if (!response.ok) {
                    throw new Error('Failed to fetch booking details');
                }
                const data = await response.json();
                setBookingDetails(data);
            } catch (error) {
                setError(error.message);
                console.error('Error:', error);
            }
        };
        fetchBookingDetails();
    }, []);

    // Function to handle cancel booking
    const handleCancelBooking = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/Booking/${bookingId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to cancel booking');
            }

            // Filter out the canceled booking from the state
            setBookingDetails((prevDetails) =>
                prevDetails.filter((booking) => booking._id !== bookingId)
            );
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        }
    };

    // Function to trigger image download
    const handleDownload = (imagePath) => {
        fetch(`http://localhost:5000/${imagePath}`)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = imagePath.split('/').pop(); // Set the filename to download
                a.click();
                window.URL.revokeObjectURL(url); // Clean up after download
            })
            .catch(error => console.error('Error downloading image:', error));
    };

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (bookingDetails.length === 0) {
        return <p className="no-bookings">No booking details found.</p>;
    }

    return (
        <div>
            <Headeruser />
            <div className="home-container">
                <div className="home-content">
                    <h2>Booking Details</h2>
                    <div className="booking-list">
                        {bookingDetails.map((booking) => (
                            <div key={booking._id} className="booking-item">
                                <div className="booking-text">
                                    <h3>{booking.serviceName}</h3>
                                    <p>Problem Description: {booking.problemDescription}</p>
                                    <p>Estimated Charges: Rs. {booking.estimatedCharges}</p>
                                    <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                                    <p>Time: {booking.time}</p>
                                    <p>Service Level: {booking.serviceLevel}</p>
                                </div>
                                <div className="image-container">
                                    {booking.image && (
                                        <img
                                            src={`http://localhost:5000/${booking.image}`} // Ensure the correct path to the image
                                            alt="Booking"
                                            className="booking-image"
                                        />
                                    )}
                                </div>
                                <div className="button-container">
                                    {booking.image && (
                                        <button
                                            onClick={() => handleDownload(booking.image)} // Trigger download
                                            className="download-button"
                                        >
                                            Download Image
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleCancelBooking(booking._id)} // Cancel booking
                                        className="cancel-button"
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DisplayBooking;