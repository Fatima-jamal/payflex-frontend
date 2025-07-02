import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PayForm from './pages/PayForm';
import CardEntryScreen from './pages/CardEntryScreen';
import GatewayScreen from './pages/GatewayScreen';
import Confirmation from './pages/Confirmation';
import ErrorPage from './pages/Error';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pay" element={<PayForm />} />
        <Route path="/card-entry" element={<CardEntryScreen />} />
        <Route path="/gateway" element={<GatewayScreen />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
