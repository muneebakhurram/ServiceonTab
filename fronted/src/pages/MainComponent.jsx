import React, { useState } from 'react';
import Headerserviceprovider from '../component/HeaderServiceprovider'; // Adjust the path if necessary

const MainComponent = () => {
    const [user, setUser] = useState({ name: "Service Provider" }); // Sample user object

    const handleLogout = () => {
        // Perform logout logic, e.g., clearing user data
        setUser(null); // Clear user state
        window.location.href = '/login'; // Redirect to login page
    };

    return (
        <div>
            <Headerserviceprovider user={user} onLogout={handleLogout} />
            {/* Other components and content go here */}
        </div>
    );
};

export default MainComponent;
