import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
      <div className="landing-page">
        <h1>Welcome to ParkPay</h1>
        <p>The simplest way to manage your parking payments in Nakuru County.</p>
        <div className="cta-buttons">
          <a href="/signup" className="btn-primary">Sign Up</a>
          <a href="/login" className="btn-secondary">Login</a>
        </div>
      </div>
    );
  }
  
  export default LandingPage;