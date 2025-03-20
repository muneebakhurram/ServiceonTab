import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../component/Footer';
import Headeruser from '../component/Headeruser';
import '../styles/addtofavorite.css';
import { FaHeart } from 'react-icons/fa';

const AddtoFavorite = ({ userEmail: propUserEmail }) => {
    const [favorites, setFavorites] = useState([]);
    const [error] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [removeMessage, setRemoveMessage] = useState(''); // ✅ Remove message state

    useEffect(() => {
        if (propUserEmail) {
            setUserEmail(propUserEmail);
        } else {
            const storedEmail = localStorage.getItem('userEmail');
            if (storedEmail) {
                setUserEmail(storedEmail);
            }
        }
    }, [propUserEmail]);

    useEffect(() => {
        if (!userEmail) {
            console.warn('No user email found, skipping fetch.');
            return;
        }

        axios.get(`http://localhost:5000/api/Favorite/get/${userEmail}`)
            .then(response => {
                if (response.data.success) {
                    setFavorites(response.data.services);
                } else {
                    setFavorites([]);
                }
            })
           
    }, [userEmail]);

    // ✅ Remove Favorite Service with Popup Message
    const removeFavorite = async (serviceId) => {
        try {
            await axios.delete(`http://localhost:5000/api/Favorite/remove/${userEmail}/${serviceId}`);
            setFavorites(favorites.filter(fav => fav._id !== serviceId));

            // ✅ Show remove message
            setRemoveMessage("Removed from Favorites");
            setTimeout(() => setRemoveMessage(''), 2000); // Hide after 2 seconds
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <>
            <Headeruser />
            <div className="favorites-container">
                <h2>My Favorite Services</h2>
                {error && <p className="error-message">{error}</p>}

                {/* ✅ Popup Message */}
                {removeMessage && <div className="remove-popup">{removeMessage}</div>}

                <div className="favorites-list">
                    {favorites.length > 0 ? (
                        favorites.map(fav => (
                            <div key={fav._id} className="favorite-service-card">
                                {fav.picture && (
                                    <img 
                                        src={`http://localhost:5000/${fav.picture}`} 
                                        alt={fav.name} 
                                        className="favorite-service-image" 
                                    />
                                )}
                                <div className="favorite-service-info">
                                    <h3 className="favorite-service-name">{fav.name}</h3>
                                    <p className="favorite-service-price">Rs. {fav.estimatedCharges}</p>
                                    <p className="favorite-service-type">{fav.type}</p>
                                </div>
                                <FaHeart className="favorite-icon" onClick={() => removeFavorite(fav._id)} />
                            </div>
                        ))
                    ) : (
                        <p>No favorite services found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddtoFavorite;
