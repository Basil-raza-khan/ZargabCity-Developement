import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { PiCellSignalFull } from "react-icons/pi";
import { FaHome } from 'react-icons/fa';
import { RiMenu3Line } from 'react-icons/ri';


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <>
         {/* Navbar */}
         <nav className="bg-black rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-16 items-center h-16">
            <div className="flex items-center">
              <Link to="/user/dashboard">
                <img
                  src="/MainLogo.svg"
                  alt="Main Logo"
                  className="h-36 sm:h-40 w-auto mt-2 sm:mt-3 -ml-4 sm:ml-0"
                />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-300"
              >
                <RiMenu3Line className="h-6 w-6" />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex items-center space-x-4">
              <Link
                to="/"
                className="text-white hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <FaHome className="mr-2" />
                Home
              </Link>
              <Link
                to="/admin/dashboard"
                className="text-white hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <PiCellSignalFull className="mr-1 mt-1 text-lg" />Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/auth/admin/login');
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="sm:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className="text-white hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <FaHome className="mr-2" />
                  Home
                </Link>
                <Link
                  to="/admin/dashboard"
                  className="text-white hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <PiCellSignalFull className="mr-1 mt-1 text-lg" />Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/auth/admin/login');
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 w-full text-left flex items-center"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default NavBar
