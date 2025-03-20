import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import Headerserviceprovider from '../component/HeaderServicerpovider';
import Footer from "../component/Footer";
import "../styles/tracking.css";

const statuses = [
  { label: "Accepted" },
  { label: "Arrived" },
  { label: "Task Completed" },
  { label: "Payment Received" }
];

const Tracking = () => {
  const { bookingId } = useParams(); 
  const [currentStep, setCurrentStep] = useState(0);
  const [showInvoicePopup, setShowInvoicePopup] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  // Fetch the latest status from the backend
  useEffect(() => {
    const fetchCurrentStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tracking/getStatus/${bookingId}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        
        // Convert status label to index
        const statusIndex = statuses.findIndex(s => s.label === data.status);
        if (statusIndex !== -1) {
          setCurrentStep(statusIndex);
        }
      } catch (error) {
        console.error("Error fetching tracking status:", error.message);
      }
    };
    

    fetchCurrentStatus();
  }, [bookingId]);

  // Show invoice popup when Task Completed
  useEffect(() => {
    if (currentStep === 2) {
      setTimeout(() => setShowInvoicePopup(true), 500);
    }
  }, [currentStep]);

  const handleStepClick = async (index) => {
    if (index === currentStep + 1) {
      try {
        const response = await fetch("http://localhost:5000/api/tracking/updateStatus", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId: bookingId, status: statuses[index].label })
        });
  
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Failed to update tracking status");
        }
  
        // Update step only if request succeeds
        setCurrentStep(index);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  
    if (statuses[index].label === "Payment Received") {
      setSuccess(true);
    }
  };
  

  const closeInvoicePopup = () => {
    setShowInvoicePopup(false);
  };

  const handleSaveInvoice = () => {
    closeInvoicePopup();
    navigate(`/updatetracking/${bookingId}`); 
  };

  return (
    <>
      <Headerserviceprovider />
      <div className="tracking-container">
        <h2>Update Book Service Tracking</h2>
        <p className="status-text">{statuses[currentStep].label}</p>

        <div className="tracking-progress">
          {statuses.map((status, index) => (
            <div key={index} className="tracking-step">
             <div className={`circle ${index <= currentStep ? "active" : ""}`}
                   onClick={() => handleStepClick(index)}
                       style={{ pointerEvents: index === currentStep + 1 ? "auto" : "none", opacity: index > currentStep + 1 ? 0.5 : 1 }}>
                               {index + 1}
             </div>

              <p>{status.label}</p>
            </div>
          ))}
          <div className="progress-line" style={{ width: `${(currentStep / (statuses.length - 1)) * 100}%` }}></div>

        </div>

        {showInvoicePopup && (
          <div className="invoice-overlay">
            <div className="invoice-popup">
              <button className="close-btn" onClick={closeInvoicePopup}>✖</button>
              <h3>Invoice Details</h3>
              <label>Description:</label>
              <textarea rows="3" placeholder="Enter description"></textarea>
              <label>Other Charges:</label>
              <input type="number" min="0" placeholder="Enter additional charges" />
              <button className="save-invoice" onClick={handleSaveInvoice}>Save</button>
            </div>
          </div>
        )}

        {success && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Payment Received!</h2>
              <p>Your payment has been successfully received.</p>
              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  setSuccess(false);
                  navigate(`/updatetracking/${bookingId}`); 
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Tracking;
