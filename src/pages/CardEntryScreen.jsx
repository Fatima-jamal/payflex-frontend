import React, { useState } from 'react';
import './CardEntryScreen.css';
import { useNavigate, useLocation } from 'react-router-dom';

function CardEntryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;

  const [cardholder, setCardholder] = useState('');

  const handleCardSubmit = (e) => {
    e.preventDefault();

    const dummyCardValid = true;

    if (dummyCardValid) {
      const enrichedData = { ...formData, cardholder };
      navigate('/gateway', { state: enrichedData });
    } else {
      alert("Invalid card");
    }
  };

  if (!formData) {
    return <div>Error: Missing data.</div>;
  }

  return (
    <div className="card-entry-container">
      <div className="card-entry-box">
        <h2>Enter Card Details</h2>

        <div className="merchant-meta">
          <p><strong>Merchant:</strong> {formData.merchantId}</p>
          <p><strong>Amount:</strong> PKR {formData.amount}</p>
        </div>

        <form onSubmit={handleCardSubmit}>
          <label>Cardholder Name</label>
          <input
            type="text"
            placeholder="e.g. Fatima Jamal"
            value={cardholder}
            onChange={(e) => setCardholder(e.target.value)}
            required
          />

          <label>Card Number</label>
          <input type="text" required placeholder="1234 5678 9012 3456" />

          <div className="card-row">
            <div>
              <label>Expiry</label>
              <input type="text" required placeholder="MM/YY" />
            </div>

            <div>
              <label>CVV</label>
              <input type="text" required placeholder="123" />
            </div>
          </div>

          <button type="submit">Pay PKR {formData.amount}</button>
        </form>
      </div>
    </div>
  );
}

export default CardEntryScreen;
