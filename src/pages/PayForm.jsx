import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function PayForm() {
  const [customerName, setCustomerName] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/payment-requests', {
        customerName,
        merchantId,
        amount,
      });
      navigate('/confirmation');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <input placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
      <input placeholder="Merchant ID" value={merchantId} onChange={(e) => setMerchantId(e.target.value)} />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <button type="submit">Pay</button>
    </form>
  );
}
