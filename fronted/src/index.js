import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Comment out App if you just want to render Login for testing */}
    {/* <App /> */}
    <Login /> {/* Render Login component directly */}
  </React.StrictMode>
);

// Performance measurement
reportWebVitals();
