import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { FaQrcode, FaCreditCard } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-bg">
      <div className="home-card">
        <h1 className="logo-text">Welcome to PayFlex</h1>
        <p className="subtitle">
          Experience secure, instant, and seamless digital payments. Scan a QR code or pay directly — all in one place.
        </p>

        <div className="action-buttons">
          <button onClick={() => navigate('/scan')}>
            <FaQrcode className="icon" />
            Scan QR Code
          </button>
          <button onClick={() => navigate('/pay')}>
            <FaCreditCard className="icon" />
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
