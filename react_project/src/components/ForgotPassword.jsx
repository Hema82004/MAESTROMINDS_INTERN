import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/resetPassword.css';
import logo from '../assets/logo.png';
import backgroundImage from '../assets/reg_logo.jpg';
import { FaEnvelope, FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleSendOtp = async () => {
    if (!email) return alert('Please enter your email first.');
    try {
      const response = await fetch('http://localhost:5000/api/interns/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (response.ok) {
        alert('✅ OTP sent to your email.');
        setTimer(60);
      } else {
        alert(result.message || '❗ Failed to send OTP.');
      }
    } catch (err) {
      console.error(err);
      alert('❗ Error sending OTP.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email || !newPassword || !otp) return alert('❗ Please fill all fields.');
    try {
      const response = await fetch('http://localhost:5000/api/interns/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword, otp }),
      });
      const result = await response.json();
      if (response.ok) {
        alert('✅ Password reset successfully.');
        navigate('/');
      } else {
        alert(result.message || '❗ Failed to reset password.');
      }
    } catch (err) {
      console.error(err);
      alert('❗ Error resetting password.');
    }
  };

  return (
    <div
      className="reset-password-container"
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
      <div className="reset-password-box">
        <div className="form-header">
          <img src={logo} alt="Logo" className="form-logo-small" />
          <h2>MAESTROMINDS</h2>
        </div>

        <form onSubmit={handleResetPassword}>
          {/* Email with Icon */}
          <div className="input-with-icon">
            <span className="input-icon"><FaEnvelope color="grey" /></span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* New Password with Eye Icon */}
          <div className="input-with-icon password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash color="grey" /> : <FaEye color="grey" />}
            </span>
          </div>

          {/* Send OTP Button */}
          <button
            type="button"
            onClick={handleSendOtp}
            className="send-otp-button"
            disabled={timer > 0}
          >
            {timer > 0 ? `Resend OTP in ${timer}s` : 'Send OTP'}
          </button>

          {/* OTP Input with Key Icon */}
          <div className="input-with-icon">
            <span className="input-icon"><FaKey color="grey" /></span>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="reset-password-button">
            Reset Password
          </button>
        </form>

        <Link to="/" className="back-to-login-link">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
