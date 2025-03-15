import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../NavBar.jsx';
import Footer from '../Footer';
import { Button } from "@/components/ui/button";
import { FiMail } from 'react-icons/fi';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useAuth } from '../../context/AuthContext';
import AnimatedComponent from '../animations/AnimatedComponent';

const Login = ({ authType }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Hardcoded credentials for demo
    const adminCredentials = {
      email: "admin@example.com",
      password: "admin123"
    };

    const userCredentials = {
      email: "user@example.com",
      password: "user123"
    };

    const expenseManagerCredentials = {
      email: "expense@example.com",
      password: "expense123"
    };

    try {
      if (authType === 'admin') {
        if (credentials.email === adminCredentials.email && 
            credentials.password === adminCredentials.password) {
          const userData = {
            id: 1,
            email: credentials.email,
            role: 'admin',
            name: 'Admin'
          };
          login(userData);
          localStorage.setItem("userType", "admin");
          navigate("/admin/dashboard");
        } else {
          throw new Error("Invalid admin credentials");
        }
      } else if (authType === 'user') {
        if (credentials.email === userCredentials.email && 
            credentials.password === userCredentials.password) {
          const userData = {
            id: 3,
            email: credentials.email,
            role: 'user',
            name: 'User'
          };
          login(userData);
          localStorage.setItem("userType", "user");
          navigate("/user/dashboard");
        } else {
          throw new Error("Invalid user credentials");
        }
      } else if (authType === 'expense') {
        if (credentials.email === expenseManagerCredentials.email && 
            credentials.password === expenseManagerCredentials.password) {
          const userData = {
            id: 2,
            email: credentials.email,
            role: 'expense-manager',
            name: 'Expense Manager'
          };
          login(userData);
          localStorage.setItem("userType", "expense-manager");
          navigate("/expense-manager/dashboard");
        } else {
          throw new Error("Invalid expense manager credentials");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update the title and description based on auth type
  const getAuthTypeDisplay = () => {
    switch(authType) {
      case 'admin':
        return 'Admin';
      case 'user':
        return 'User';
      case 'expense':
        return 'Expense Manager';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <AnimatedComponent>
        <main className="flex-grow flex items-center justify-center py-8 md:py-16 mt-40 md:mt-0">
          <div className="w-full max-w-sm px-4 md:px-6">
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 mx-auto my-4 md:my-0 w-[95%] md:w-full">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {getAuthTypeDisplay()} Login
                </h2>
                <p className="text-gray-600 mt-1 text-sm">
                  Please sign in to your {getAuthTypeDisplay().toLowerCase()} account
                </p>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <IoEyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <IoEye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Link 
                      to={`/auth/${authType}/forgot-password`}
                      className="font-medium text-red-600 hover:text-red-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              {/* Social Login */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                    Google
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" />
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </AnimatedComponent>

      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
};

export default Login;