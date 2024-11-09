import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Consumersignup from './pages/Consumersignup';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';
import AdminDashboard from './pages/AdminDashboard';
import DisplayServices from './pages/DisplayServices';
import ServiceProviderDashboard from './pages/ServiceProviderDashboard';
import BookingForm from './pages/BookingForm';
import DisplayBooking from './pages/DisplayBooking';
import AddService from './pages/Addservice';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/consumersignup" element={<Consumersignup />} />
          <Route exact path="/homepage" element={<HomePage />} />
          <Route exact path="/mainpage" element={<MainPage />} />
          <Route exact path="/dashboard" element={<AdminDashboard />} />
          <Route exact path="/displayservices" element={<DisplayServices />} />
          <Route exact path="/serviceproviderdashboard" element={<ServiceProviderDashboard />} />
          <Route exact path="/bookingform" element={<BookingForm />} />
          <Route exact path="/displaybooking" element={<DisplayBooking />} />
          <Route exact path="/Addservice" element={<AddService />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
