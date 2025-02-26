import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome } from 'react-icons/fa';
import { PiCellSignalFull } from "react-icons/pi";
import { RiMenu3Line } from 'react-icons/ri';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const TotalAvaliablePlots = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simplified plotsData without details
  const plotsData = [
    { id: 'L1', category: 'Residential', subcategory: 'L', status: 'Available' },
    { id: 'R1', category: 'Residential', subcategory: 'R', status: 'Available' },
    { id: 'C1', category: 'Commercial', subcategory: 'C', status: 'Available' },
    { id: 'MM1', category: 'Amenities', subcategory: 'MM', status: 'Available' },
  ];

  // Filter the data based on search and filters
  const filteredPlots = plotsData.filter(plot => {
    const matchesSearch = plot.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plot.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plot.subcategory.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || plot.category === categoryFilter;
    const matchesSubcategory = subcategoryFilter === 'All' || plot.subcategory === subcategoryFilter;

    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-black rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-16 items-center h-16">
            <div className="flex items-center">
              <Link to="/admin/dashboard">
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

      <div className="p-4 sm:p-6">
        {/* Header Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <Select value={subcategoryFilter} onValueChange={setSubcategoryFilter}>
                <SelectTrigger className="w-full px-4 py-2.5 text-sm rounded-lg shadow-md">
                  <SelectValue placeholder="Filter by Subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Filter by Subcategory All</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="R">R</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="MM">MM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full px-4 py-2.5 text-sm rounded-lg shadow-md">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Filter by Category</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Amenities">Amenities</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="relative">
            <input
              type="search"
              placeholder="Search plots..."
              className="w-full px-4 py-2.5 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Updated Table without Details column */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Plot ID</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Category</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Subcategory</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPlots.map((plot) => (
                <tr key={plot.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">{plot.id}</td>
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">{plot.category}</td>
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">{plot.subcategory}</td>
                  <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">{plot.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination and Results Info */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border rounded-md hover:bg-gray-50">Next</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-600">
              Found {filteredPlots.length} items out of {plotsData.length}
            </span>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('All');
                setSubcategoryFilter('All');
              }}
              className="text-red-500 text-xs sm:text-sm hover:text-red-600"
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* Back to Dashboard Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 w-full sm:w-auto"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalAvaliablePlots;
