import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { FiMail } from 'react-icons/fi';
import { BiArrowBack } from 'react-icons/bi';
import { FaFingerprint } from 'react-icons/fa';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-8 md:py-16">
        <div className="w-full max-w-sm px-4 md:px-6">
          {/* Forgot Password Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 mx-auto my-4 md:my-0 w-[95%] md:w-full">
            {/* Header with Icon */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <FaFingerprint className="w-16 h-16 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
              <p className="text-gray-600 mt-2 text-sm">
                No worries, we'll send you reset instructions.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Reset Button */}
              
              <Link to="/admin/reset-password">
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition duration-200"
                >
                  Reset Password
                </Button>
              </Link>
            </form>

            {/* Back to Login Link */}
            <div className="mt-6 flex items-center justify-center space-x-2 text-sm">
              <Link 
                to="/admin/login" 
                className="flex items-center text-red-600 hover:text-red-700 transition-colors"
              >
                <BiArrowBack className="w-5 h-5 mr-1" />
                <span>Back to login</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default ForgotPassword; 