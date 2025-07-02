import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PayForm.css';
import { useNavigate, useLocation } from 'react-router-dom';

function PayForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    merchantId: '',
    customerName: '',
    email: '',
    phone: '',
    amount: '',
    description: ''
  });

  const [error, setError] = useState('');

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8081';

  useEffect(() => {
    const state = location.state || {};
    const params = new URLSearchParams(location.search);

    setFormData(prev => ({
      ...prev,
      merchantId: state.merchantId || params.get('merchantId') || '',
      amount: state.amount || params.get('amount') || '',
      description: state.description || params.get('description') || ''
    }));
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { customerName, email, phone, amount, merchantId } = formData;
    if (!customerName || !email || !phone || !amount || !merchantId) {
      setError('Please fill all required fields.');
      return;
    }

    const payload = {
      ...formData,
      merchantId: parseInt(merchantId, 10) // ✅ FIX: Ensure Integer type
    };

    try {
      console.log('Submitting to:', `${BACKEND_URL}/api/payment-requests`);
      console.log('Payload:', payload);

      const response = await axios.post(`${BACKEND_URL}/api/payment-requests`, payload, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200 || response.status === 201) {
        navigate('/confirmation');
      } else {
        console.error('Unexpected response:', response.status);
        navigate('/error');
      }
    } catch (err) {
      console.error('Payment error:', err);
      if (err.response) {
        console.error('Backend response:', err.response.status, err.response.data);
      }
      navigate('/error');
    }
  };

  return (
    <div className="payform-container">
      <h2>Make a Payment</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        {error && <p className="error">{error}</p>}

        <label>Merchant ID*</label>
        <input
          type="text"
          name="merchantId"
          value={formData.merchantId}
          onChange={handleChange}
          required
          readOnly={!!formData.merchantId}
        />

        <label>Customer Name*</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />

        <label>Email*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number*</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Amount (PKR)*</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

export default PayForm;
