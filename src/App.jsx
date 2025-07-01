import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PayForm from './pages/PayForm';
import Confirmation from './pages/Confirmation';
import ErrorPage from './pages/Error'; // Optional but good to have
import QRScanner from './pages/QRScanner'; // Uses html5-qrcode

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pay" element={<PayForm />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/scan" element={<QRScanner />} />
      </Routes>
    </Router>
  );
}

export default App;
// Trigger GitHub Actions
