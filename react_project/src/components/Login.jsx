import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';
import backgroundImage from '../assets/reg_logo.jpg';
import logo from '../assets/logo.png';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/interns/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('✅ Login Successful!');
        navigate('/dashboard');
      } else {
        alert(result.message || '❗ Login Failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('❗ An error occurred during login');
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="login-box">
        <div className="form-header">
          <img src={logo} alt="Logo" className="form-logo-small" />
          <h2>MAESTROMINDS</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-with-icon">
            <span className="input-icon"><FaUser color="grey" /></span>
            <input
              type="text"
              placeholder="Email or Mobile Number"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>

          <div className="input-with-icon password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash color="grey" /> : <FaEye color="grey" />}
            </span>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p style={{ marginTop: '10px' }}>
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </p>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
