import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear session/local storage here if needed
    // localStorage.clear(); or specific key removal if stored
    alert('✅ You have been logged out.');
    navigate('/');
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      flexDirection: 'column'
    }}>
      <h1>🎓 Welcome to Maestrominds Dashboard</h1>
      <p>This is your dashboard after login.</p>

      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
