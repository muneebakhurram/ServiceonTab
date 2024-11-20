import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import AdminDashboard from './pages/AdminDashboard';
import DisplayServices from './pages/DisplayServices';  // Updated import
import ServiceProviderDashboard from './pages/ServiceProviderDashboard';
import BookingForm from './pages/BookingForm';
import DisplayBooking from './pages/DisplayBooking';
import AddService from './pages/Addservice';
 import SignupForm from './pages/SignupForm';
 import Providersignup from './pages/Signupp';
 import Providerlogin from './pages/Providerlogin';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login />} />
         
          <Route exact path="/home-page" element={<HomePage />} />
          <Route exact path="/mainpage" element={<MainPage />} />
          <Route path="/Providerlogin" element={<Providerlogin />} />
          <Route exact path="/providersignup" element={<Providersignup />} />
          <Route exact path="/dashboard" element={<AdminDashboard />} />
          
          {/* Dynamic route for service categories */}
          <Route path="/services/:type" element={<DisplayServices />} />

          <Route exact path="/serviceproviderdashboard" element={<ServiceProviderDashboard />} />
          <Route exact path="/booking-form" element={<BookingForm />} />
          <Route exact path="/displaybooking" element={<DisplayBooking />} />
          <Route exact path="/add-service" element={<AddService />} />
          { <Route exact path="/signupform" element={<SignupForm />} /> }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
