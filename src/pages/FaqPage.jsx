import React, { useState } from "react";
import Headeruser from "../component/Headeruser";
import Footer from "../component/Footer";
import "../styles/faqpage.css"; 
import landing from '../assests/images/landing.png';

const faqData = [
  {
    question: "How Can Users Book A Service?",
    answer: "Users can book a service by visiting our website, selecting the desired service, and confirming the booking.",
  },
  {
    question: "What Does 'Verified Service Provider' Mean?",
    answer: "A 'Verified Service Provider' is a professional who has been vetted and approved by our platform.",
  },
  {
    question: "Do Users Need To Pay Any Service Fee When Booking A Service On Tab?",
    answer: "No, users are not required to pay any service fee at the time of booking. Charges apply after service completion.",
  },
  {
    question: "How Can I Review A Professional At The End Of The Service?",
    answer: "You can review a professional by visiting the completed bookings section and providing feedback.",
  },
  {
    question: "Is There A Joining Fee For Service Providers On Service On Tab?",
    answer: "No, there is no joining fee for service providers to register on our platform.",
  },
  {
    question: "What Services Are Provided By Service On Tab?",
    answer: "Our platform provides plumbing, electrical repairs, and mechanic services.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Headeruser />
      <div className="landingpage">
            <div className="text-sections">
                <h1 className="main-headings">Simplify Your Life with Our Professional Home Service</h1>
                <p className="sub-headings">We offer home services designed to maximize efficiency,</p>
                <p className="highlight">minimizing time, energy, and cost.</p>
                
               
            </div>
            <img src={landing} alt="Landing" className="pic" />
        </div>

      <div className="faq-container">
        <h1>Frequently Asked Questions</h1>
        <p>Find The Most Asked Questions And Their Answers Right Here.</p>
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{item.question}</span>
              <span className={`arrow ${openIndex === index ? "open" : ""}`}>&#9662;</span>
            </div>
            {openIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
