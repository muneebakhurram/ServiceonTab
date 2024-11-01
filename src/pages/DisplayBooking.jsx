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

    if (error) {
        return <p>{error}</p>;
    }

    if (bookingDetails.length === 0) {
        return <p>No booking details found.</p>;
    }

    return (
        <div>
            <Headeruser />
            <br />
            <br />
            <h2>Booking Details</h2>
            <div className="booking-list">
                {bookingDetails.map((booking) => (
                    <div key={booking._id} className="booking-item">
                        <h3>{booking.serviceName}</h3>
                        <p>Problem Description: {booking.problemDescription}</p>
                        <p>Estimated Charges: {booking.estimatedCharges}</p>
                        <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                        <p>Time: {booking.time}</p>
                        <p>Service Level: {booking.serviceLevel}</p>
                        <div className="image-container">
                            {booking.image && (
                                <div className="button-image-wrapper">
                                    <img
                                        src={`http://localhost:5000/${booking.image}`} // Ensure the correct path to the image
                                        alt="Booking"
                                        className="booking-image"
                                    />
                                    <div className="button-container">
                                        <a
                                            href={`http://localhost:5000/${booking.image}`} // Ensure the correct path to the image
                                            download
                                            className="download-button"
                                        >
                                            Download Image
                                        </a>

                                        {/* Check if the booking was opened by the consumer */}
                                        {booking.openedBy === 'consumer' && (
                                            <button
                                                onClick={() => handleCancelBooking(booking._id)}
                                                className="download-button"
                                            >
                                                Cancel Booking
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default DisplayBooking;
