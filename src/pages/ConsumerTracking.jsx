import React, { useState, useEffect } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import Headeruser from "../component/Headeruser";
import Footer from "../component/Footer";
import "../styles/consumertracking.css";

const statuses = [
  { label: "Accepted" },
  { label: "Arrived" },
  { label: "Task Completed" },
  { label: "Payment Received" }
];

const ConsumerTracking = () => {
    const { bookingId } = useParams(); 
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const navigate = useNavigate();

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


  const closeFeedbackPopup = () => {
    setShowFeedbackPopup(false);
  };

  const handleFeedback = () => {
    closeFeedbackPopup();
    navigate("/FeedbackForm");
  };

  return (
    <>
      <Headeruser />
      <div className="trackingg-container">
        <h2>Book Service Tracking</h2>
        <p className="status-textt">{statuses[currentStep].label}</p>

        <div className="trackingg-progress">
          {statuses.map((status, index) => (
            <div key={index} className="trackingg-step">
             <div
  className={`circlee ${index <= currentStep ? "active" : ""}`}
>
  {index + 1}
</div>
              <p>{status.label}</p>
            </div>
          ))}
          <div className="progress-linee"></div>
        </div>

        <button className="safety-call">📞 Safety Call</button>

        {showFeedbackPopup && (
          <div className="feedback-popup">
            <div className="popupp-content">
              <button className="close-btnn" onClick={closeFeedbackPopup}>✖</button>
              <h3>Service Completed</h3>
              <p>Would you like to give feedback?</p>
              <button className="track" onClick={handleFeedback}>Give Feedback</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ConsumerTracking;
