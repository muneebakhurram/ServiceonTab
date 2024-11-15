import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; // Adjust the path if necessary
import Consumersignup from './pages/Consumersignup'; // Adjust the path if necessary
import './App.css'; // Your CSS file for styling
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import ServiceProviderDashboard from './pages/ServiceProviderDashboard';
import MainComponent from './pages/MainComponent'; 
import BookingForm from './pages/BookingForm';
import Servicesignup from './pages/Signupp.jsx';
import AdminDashboard from './pages/AdminDashboard';
import Providerlogin from './pages/Providerlogin';




function App() {
  return (
   
      <Router>
        <div className="App">
          {/* You can include a common header or navigation bar here if needed */}
          <Routes>
          
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/consumersignup" element={<Consumersignup />} />
            <Route exact path="/homepage" element={<HomePage />} />
            <Route  path="/mainpage" element={<MainPage />} />
            <Route exact path="/serviceproviderdashboard" element={<ServiceProviderDashboard/>} />
            <Route exact path="/main" element={<MainComponent />} /> 
            <Route exact path="/booking" element={<BookingForm />} /> 
            <Route path="/service-signup" element={<Servicesignup />} />
            <Route exact path="/dashboard" element={<AdminDashboard />} />
            <Route path="/Providerlogin" element={<Providerlogin />} />
          


          </Routes>
        </div>
      </Router>
   
  );
}

export default App;
