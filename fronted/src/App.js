import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; // Adjust the path if necessary
import Consumersignup from './pages/Consumersignup'; // Adjust the path if necessary
import './App.css'; // Your CSS file for styling
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';

function App() {
  return (
   
      <Router>
        <div className="App">
          {/* You can include a common header or navigation bar here if needed */}
          <Routes>
          
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/consumersignup" element={<Consumersignup />} />
            <Route exact path="/homepage" element={<HomePage />} />
            <Route exact path="/mainpage" element={<MainPage />} />
        
          </Routes>
        </div>
      </Router>
   
  );
}

export default App;
