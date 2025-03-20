import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {  useLocation } from 'react-router-dom';
import '../styles/invoice.css';

const Invoice = () => {
    const location = useLocation();
    const bookingData = location.state || {};  

    const invoiceRef = useRef();
  

 
    const downloadPDF = () => {
        const input = invoiceRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 250);
            pdf.save('Invoice.pdf');
        });
    };

 
    const downloadImage = () => {
        const input = invoiceRef.current;
        html2canvas(input).then((canvas) => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpeg');
            link.download = 'Invoice.jpg';
            link.click();
        });
    };

    return (
        <div className="invoice-container">
            <div ref={invoiceRef} className="invoice-box">
                <div className="invoice-header">
                    <h2>ServiceOnTab - Invoice</h2>
                    <p className="temp-receipt">⚠ This is a temporary receipt ⚠</p>

                  
                    <p className="date-time">
                        <strong>Date:</strong> {bookingData?.date || 'N/A'} &nbsp; | &nbsp;
                        <strong>Time:</strong> {bookingData?.time || 'N/A'}
                    </p>
                </div>

                <div className="invoice-details">
                    <table>
                        <tbody>
                            <tr>
                                <th>Service Name:</th>
                                <td>{bookingData?.serviceName || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Problem Description:</th>
                                <td>{bookingData?.problemDescription || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Service Level:</th>
                                <td>{bookingData?.serviceLevel || 'N/A'}</td>
                            </tr>
                            <tr>
                                <th>Estimated Charges:</th>
                                <td><strong>{bookingData?.estimatedCharges || 'N/A'} PKR</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="invoice-total">
                    Total Charges: <strong>{bookingData?.estimatedCharges || 'N/A'} PKR</strong>
                </div>
            </div>

            <div className="invoice-buttons">
                <button className="view-button" onClick={() => window.print()}>View Invoice</button>
                <button className="download-button" onClick={downloadPDF}>Download as PDF</button>
                <button className="download-button" onClick={downloadImage}>Download as JPEG</button>
            </div>
        </div>
    );
};

export default Invoice;
