import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/requestDetails.css";
import Headerserviceprovider from '../component/HeaderServicerpovider';
import Footer from '../component/Footer';

const RequestDetails = () => {
    const { bookingId } = useParams(); 
    console.log("Booking ID from URL:", bookingId);

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!bookingId) {
            console.error("Booking ID is missing in the URL!");
            setError("Booking ID is missing.");
            return;
        }

        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/booking/details/${bookingId}`);

                if (!response.ok) {
                    throw new Error("Booking not found or server error");
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDetails();
    }, [bookingId]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!data) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
        <Headerserviceprovider />
        <div className="request-details-container">
            <h2 className="title">Booking Request Details</h2>

            <div className="details-card">
                {/* Display image only if it exists */}
                {data.bookingDetails.image && (
                    <img 
                        src={data.bookingDetails.image} 
                        alt="Services" 
                        className="services-image"
                        style={{ width: "200px", height: "150px", borderRadius: "10px" }} 
                    />
                )}

                <div className="info">
                    <p><strong>Service Type:</strong> {data.bookingDetails.serviceName}</p>
                    <p><strong>Problem Description:</strong> {data.bookingDetails.problemDescription}</p>
                    <p><strong>Estimated Charges:</strong> Rs.{data.bookingDetails.estimatedCharges} </p>
                    <p><strong>Date:</strong> {new Date(data.bookingDetails.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {data.bookingDetails.time}</p>
                    <p><strong>Status:</strong> <span className={`status ${data.bookingDetails.status.toLowerCase()}`}>{data.bookingDetails.status}</span></p>
                </div>
            </div>

            <h2 className="subtitle">Consumer Details</h2>
            <div className="consumer-card">
                <p><strong>Name:</strong> {data.userDetails.name}</p>
                <p><strong>Phone:</strong> {data.userDetails.phoneNumber}</p>
                <p><strong>Address:</strong> {data.userDetails.address}</p>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default RequestDetails;
