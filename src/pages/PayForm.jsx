import React, { useState } from 'react';
import './PayForm.css';
import { useNavigate } from 'react-router-dom';

function PayForm() {
  const [formData, setFormData] = useState({
    merchantId: '',
    amount: '',
    description: '',
    name: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key]) {
        alert('Please fill out all fields');
        return;
      }
    }

    navigate('/card-entry', {
      state: {
        ...formData,
        status: 'Paid',
      },
    });
  };

  return (
    <div className="form-bg">
      <div className="form-overlay">
        <div className="payform-container">
          <form className="payment-form" onSubmit={handleSubmit}>
            <h2>Pay with PayFlex</h2>

            <label>Merchant ID</label>
            <input
              type="text"
              name="merchantId"
              value={formData.merchantId}
              onChange={handleChange}
              required
            />

            <label>Customer Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>Amount (PKR)</label>
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
              required
            />

            <button type="submit">Proceed to Payment</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PayForm;
