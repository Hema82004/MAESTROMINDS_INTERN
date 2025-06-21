import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/Registration';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/dashboard';  // ✅ Import this

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />  {/* ✅ Add this */}
    </Routes>
  );
}

export default App;

