import React from 'react';
import './Error.css';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>We couldn’t process your request. Please try again.</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
}

export default ErrorPage;
