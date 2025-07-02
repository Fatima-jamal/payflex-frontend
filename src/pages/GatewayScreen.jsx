import React, { useEffect } from 'react';
import './GatewayScreen.css';
import { useNavigate, useLocation } from 'react-router-dom';

function GatewayScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const formData = location.state;

  useEffect(() => {
    if (!formData) {
      navigate('/error');
      return;
    }

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    console.log("Resolved API Base URL:", BASE_URL); // ✅ Debug log

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`${BASE_URL}/payment-requests`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            merchantId: parseInt(formData.merchantId, 10)
          }),
        });

        if (response.ok) {
          navigate('/confirmation');
        } else {
          console.error("Payment failed:", await response.text());
          navigate('/error');
        }
      } catch (error) {
        console.error("Gateway error:", error);
        navigate('/error');
      }
    }, 3000); // Simulated 3-second processing delay

    return () => clearTimeout(timeout);
  }, [formData, navigate]);

  return (
    <div className="gateway-container">
      <div className="gateway-box">
        <h2>Processing Payment...</h2>
        <p>Please wait while we simulate your payment.</p>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default GatewayScreen;
