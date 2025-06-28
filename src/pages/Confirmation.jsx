import React from 'react';
import './Confirmation.css';
import { useNavigate } from 'react-router-dom';

function Confirmation() {
  const navigate = useNavigate();
  const transactionId = `#TXN${Math.floor(Math.random() * 1000000)}`;

  return (
    <div className="confirmation-container">
      <div style={{ fontSize: '40px', color: '#28a745', marginBottom: '10px' }}>✔️</div>
      <h2>Payment Successful!</h2>
      <p>Your payment has been processed.</p>
      <p><strong>Transaction ID:</strong> {transactionId}</p>
      <p>Thank you for using PayFlex.</p>

      <div className="confirmation-buttons">
        <button onClick={() => navigate('/pay')}>Make Another Payment</button>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    </div>
  );
}

export default Confirmation;
