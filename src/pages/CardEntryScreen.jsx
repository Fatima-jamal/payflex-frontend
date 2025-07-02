import React from 'react';
import './CardEntryScreen.css';
import { useNavigate, useLocation } from 'react-router-dom';

function CardEntryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state;

  const handleCardSubmit = (e) => {
    e.preventDefault();

    // Simulate basic card validation
    const dummyCardValid = true;

    if (dummyCardValid) {
      navigate('/gateway', { state: formData });
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
        <form onSubmit={handleCardSubmit}>
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
