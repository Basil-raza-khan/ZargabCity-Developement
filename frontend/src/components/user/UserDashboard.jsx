import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <div className="min-h-screen px-4">
      <NavBar className="mt-10" />

      <main className="p-8">
        <h1 className="text-3xl font-extrabold">Dashboard</h1>
        <div className="my-8 text-left">
          <h2 className="text-xl font-semibold">Welcome back, User</h2>
          <p className="text-gray-600">you are doing well! keep it up and make your life better</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div 
            className="p-6 rounded-lg text-white bg-gradient-to-r from-gray-800 to-blue-600 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => navigate('/user/total-booked-plots')}
          >
            <h3 className="text-lg font-semibold">Total Booked Plots</h3>
            <div className="text-2xl font-bold mt-2">350</div>
          </div>

          <div className="p-6 rounded-lg text-white bg-gradient-to-r from-red-800 to-red-600 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          onClick={() => navigate('/user/total-available-plots')}
          >
            <h3 className="text-lg font-semibold">Total Available Plots</h3>
            <div className="text-2xl font-bold mt-2">4000</div>
          </div>

          <div className="p-6 rounded-lg text-white bg-gradient-to-r from-green-800 to-green-600 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
           onClick={() => navigate('/user/total-amount-recieved')}
          >
            <h3 className="text-lg font-semibold">Total Amount Received</h3>
            <div className="text-2xl font-bold mt-2">PKR 2,000,000</div>
          </div>

          <div className="p-6 rounded-lg text-white bg-gradient-to-r from-purple-800 to-purple-600 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => navigate('/user/total-instalment-due')}
          >
            <h3 className="text-lg font-semibold">Total Instalments Due</h3>
            <div className="text-2xl font-bold mt-2">PKR 10,00,000</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
