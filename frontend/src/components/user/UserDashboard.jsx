import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';
import NavBar from './NavBar';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <div className="px-4">
      <NavBar className="mt-10"/>

      <main className="dashboard-main">
        <h1>Dashboard</h1>
        <div className="welcome-section">
          <h2>Welcome back, User</h2>
          <p>Lorem ipsum dolor some kyunki ramant necta!</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card booked-plots">
            <h3>Total Booked Plots</h3>
            <div className="stat-value">350</div>
            <i className="home-icon"></i>
          </div>

          <div className="stat-card available-plots">
            <h3>Total Available Plots</h3>
            <div className="stat-value">4000</div>
            <i className="document-icon"></i>
          </div>

          <div className="stat-card amount-received">
            <h3>Total Amount Received</h3>
            <div className="stat-value">PKR 2,000,000</div>
            <i className="money-icon"></i>
          </div>

          <div className="stat-card instalments-due">
            <h3>Total Instalments Due</h3>
            <div className="stat-value">PKR 10,00,000</div>
            <i className="calendar-icon"></i>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard; 