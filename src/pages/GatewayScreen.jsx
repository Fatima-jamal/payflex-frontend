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

    console.log("Submitting payment form:", formData);

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/payment-requests`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              merchantId: parseInt(formData.merchantId, 10),
              customerName: formData.name,
              email: formData.email,
              phone: formData.phone,
              amount: parseFloat(formData.amount),
              description: formData.description
            }),
          }
        );

        if (response.ok) {
          navigate('/confirmation');
        } else {
          console.error('Payment failed:', await response.text());
          navigate('/error');
        }
      } catch (error) {
        console.error('Gateway error:', error);
        navigate('/error');
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [formData, navigate]);

  return (
    <div className="gateway-container">
      <div className="gateway-box">
        <h2>Processing Payment...</h2>
        {formData?.name && (
          <p>Customer: <strong>{formData.name}</strong></p>
        )}
        <p>Please wait while we simulate your payment.</p>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default GatewayScreen;
