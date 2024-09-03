// src/components/ThankYou.js
import React, { useEffect } from 'react';
import './ThankYou.css';  // Import the CSS file
import { useNavigate } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page after 1 second
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000); // 1000 milliseconds = 1 second

    // Cleanup timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="thankyou-container">
      <div className="thankyou-content">
        <h1 className="thankyou-title">THANK YOU!</h1>
        <p className="thankyou-message">Thanks for getting in touch! We appreciate you contacting us. We will get back to you shortly.</p>
        <i className="fa fa-check thankyou-icon"></i>
      </div>
    </div>
  );
};

export default ThankYou;
