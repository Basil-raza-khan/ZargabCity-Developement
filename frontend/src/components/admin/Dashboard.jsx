import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCog } from 'react-icons/fa';
import { BsBuilding, BsCashStack } from 'react-icons/bs';
import { IoMdBusiness } from 'react-icons/io';
import { MdInventory } from 'react-icons/md';
import { GiFarmTractor } from 'react-icons/gi';
import { AiFillStar } from 'react-icons/ai';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Protect the dashboard route
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/auth/admin/login');
    }
  }, [currentUser, navigate]);

  // If not authenticated, show loading or redirect
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  // Temporary data (replace with API calls later)
  const stats = {
    plots: {
      yards80: { total: 345, booked: 150 },
      yards120: { total: 89, booked: 29 },
      yards240: { total: 21, booked: 7 },
      commercial: { total: 15, booked: 8 },
      farmHouses: { total: 7, booked: 4 },
      amenities: { total: 5, booked: 2 }
    },
    totalPlotsBooked: 855,
    totalAvailablePlots: 2000,
    totalAmountReceived: 5000000,
    totalInstallmentDue: 2000000
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-black shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin/dashboard">
                <img
                  src="/MainLogo.svg"
                  alt="Main Logo"
                  className="h-40 w-auto md:h-40 mt-3"
                />
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Link to="/"><FaHome className="text-white text-xl" /></Link>
              <Link to="/"><span className="text-white text-lg">Home</span></Link>
              <div className="flex items-center space-x-4 text-white">
                <span>Welcome, {currentUser.name}</span>
                <Button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-[1400px] mx-auto">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, Admin</p>

            {/* Plot Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 mb-8">
              <StatCard
                title="80 Yards Plots"
                total={stats.plots.yards80.total}
                booked={stats.plots.yards80.booked}
                icon={<BsBuilding className="w-6 h-6" />}
                gradient="from-orange-400 to-orange-600"
              />
              <StatCard
                title="120 Yards Plots"
                total={stats.plots.yards120.total}
                booked={stats.plots.yards120.booked}
                icon={<BsBuilding className="w-6 h-6" />}
                gradient="from-purple-400 to-purple-600"
              />
              <StatCard
                title="240 Yards Plots"
                total={stats.plots.yards240.total}
                booked={stats.plots.yards240.booked}
                icon={<BsBuilding className="w-6 h-6" />}
                gradient="from-green-400 to-green-600"
              />
              <StatCard
                title="Commercial Plots"
                total={stats.plots.commercial.total}
                booked={stats.plots.commercial.booked}
                icon={<IoMdBusiness className="w-6 h-6" />}
                gradient="from-orange-600 to-green-600"
              />
              <StatCard
                title="Farm Houses"
                total={stats.plots.farmHouses.total}
                booked={stats.plots.farmHouses.booked}
                icon={<GiFarmTractor className="w-6 h-6" />}
                gradient="from-blue-400 to-blue-600"
              />
              <StatCard
                title="Amenities"
                total={stats.plots.amenities.total}
                booked={stats.plots.amenities.booked}
                icon={<AiFillStar className="w-6 h-6" />}
                gradient="from-yellow-400 to-yellow-600"
              />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <SummaryCard
                title="Total Plots Booked"
                value={stats.totalPlotsBooked}
                icon={<BsBuilding className="w-8 h-8" />}
                bgColor="bg-gray-700"
                onClick={() => navigate('/admin/total-booked-plots')}
              />
              <SummaryCard
                title="Total Available Plots"
                value={stats.totalAvailablePlots}
                icon={<BsBuilding className="w-8 h-8" />}
                bgColor="bg-red-600"
                onClick={() => navigate('/admin/total-available-plots')}
              />
              <SummaryCard
                title="Total Amount Received"
                value={`PKR ${stats.totalAmountReceived.toLocaleString()}`}
                icon={<BsCashStack className="w-8 h-8" />}
                bgColor="bg-green-600"

              />
            </div>

            {/* Management Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ManagementCard
                title="User Management"
                icon={<FaUserCog className="w-8 h-8" />}
                bgColor="bg-purple-600"
                onClick={() => navigate('/admin/user-management')}
              />

              <ManagementCard
                title="Total Instalment Due"
                value={`PKR ${stats.totalInstallmentDue.toLocaleString()}`}
                icon={<BsCashStack className="w-8 h-8" />}
                bgColor="bg-blue-600"
                onClick={() => navigate('/admin/total-instalment-due')}


              />
              <ManagementCard
                title="Inventory Management"
                icon={<MdInventory className="w-8 h-8" />}
                bgColor="bg-red-800"
                onClick={() => navigate('/admin/inventory-management')}

              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper Components
const StatCard = ({ title, total, booked, icon, gradient }) => (
  <div className={`bg-gradient-to-r ${gradient} p-4 rounded-lg text-white`}>
    <div className="flex items-center justify-between mb-2">
      <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
      <span className="text-sm">{booked}/{total}</span>
    </div>
    <h3 className="text-sm font-semibold mt-2">{title}</h3>
  </div>
);

const SummaryCard = ({ title, value, icon, bgColor, onClick }) => (
  <div
    className={`${bgColor} p-6 rounded-lg text-white cursor-pointer hover:opacity-90 transition-opacity`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="bg-white/20 p-3 rounded-lg">{icon}</div>
    </div>
  </div>
);

const ManagementCard = ({ title, value, icon, bgColor , onClick}) => (
  <div className={`${bgColor} p-6 rounded-lg text-white cursor-pointer hover:opacity-90 transition-opacity`}
  onClick={onClick}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {value && <p className="text-2xl font-bold">{value}</p>}
      </div>
      <div className="bg-white/20 p-3 rounded-lg">{icon}</div>
    </div>
  </div>
);

export default Dashboard;