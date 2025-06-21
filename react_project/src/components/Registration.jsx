import React, { useState, useEffect } from 'react';
import '../styles/register.css';
import backgroundImage from '../assets/reg_logo.jpg';
import logoImage from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCalendar,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaGraduationCap,
  FaBook
} from 'react-icons/fa';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    age: '',
    college: '',
    year: '',
    email: '',
    password: '',
    resume: null,
    aadhar: null,
  });

  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSendOtp = async () => {
    if (!formData.email) return alert('❗ Please enter your email to receive OTP.');

    try {
      const response = await fetch('http://localhost:5000/api/interns/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('✅ OTP sent to your email!');
        setIsOtpSent(true);
        setTimer(50);
      } else {
        alert(result.message || '❗ Failed to send OTP');
      }
    } catch (err) {
      console.error(err);
      alert('❗ Error sending OTP');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!otp) return alert('❗ Please enter OTP before registering.');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append('otp', otp);

    try {
      const response = await fetch('http://localhost:5000/api/interns/register', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert('🎉 Registration Successful!');
        navigate('/');
      } else {
        alert(result.message || '❗ Registration Failed');
      }
    } catch (error) {
      console.error(error);
      alert('❗ Error submitting form');
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0 && isOtpSent) {
      setIsOtpSent(false);
    }
    return () => clearInterval(interval);
  }, [timer, isOtpSent]);

  const renderInputWithIcon = (type, name, placeholder, IconComponent, required = true) => (
    <div className="input-with-icon">
      <span className="input-icon"><IconComponent color="grey" /></span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={formData[name]}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div
      className="register-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="form-box">
        <div className="form-header">
          <img src={logoImage} alt="Logo" className="form-logo-small" />
          <h2 className="form-title">MAESTROMINDS</h2>
        </div>

        <form onSubmit={handleRegister} encType="multipart/form-data">
          {renderInputWithIcon('text', 'name', 'Full Name', FaUser)}
          {renderInputWithIcon('number', 'age', 'Age', FaCalendar)}
          {renderInputWithIcon('tel', 'mobile', 'Mobile Number', FaPhone)}
          {renderInputWithIcon('text', 'college', 'College Name', FaGraduationCap)}

          <div className="input-with-icon">
            <span className="input-icon"><FaBook color="grey" /></span>
            <select
              name="year"
              value={formData.year}
              required
              onChange={handleChange}
            >
              <option value="">Select Year of Study</option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
          </div>

          <label htmlFor="resume" className="form-label">Resume (PDF/DOC):</label>
          <input type="file" name="resume" id="resume" accept=".pdf,.doc,.docx" required onChange={handleChange} />

          <label htmlFor="aadhar" className="form-label">Aadhaar (PDF/Image):</label>
          <input type="file" name="aadhar" id="aadhar" accept=".pdf,.jpg,.jpeg,.png" required onChange={handleChange} />

          {renderInputWithIcon('email', 'email', 'Email', FaEnvelope)}

          <div className="input-with-icon password-input-container">
            
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <span
    className="eye-icon"
    onClick={() => setShowPassword((prev) => !prev)}
  >
    {showPassword ? <FaEyeSlash color="grey" /> : <FaEye color="grey" />}
  </span>
</div>

          <button
            type="button"
            onClick={handleSendOtp}
            className="register-btn"
            disabled={isOtpSent}
          >
            {isOtpSent ? `Resend OTP in ${timer}s` : 'Send OTP'}
          </button>

          {isOtpSent && (
            <div className="input-with-icon" style={{ marginTop: '10px' }}>
              <span className="input-icon"><FaKey color="grey" /></span>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
