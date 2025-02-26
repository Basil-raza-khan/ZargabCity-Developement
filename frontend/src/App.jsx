import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Text from './components/Text';
import LandingPage from './components/LandingPage';
import Page from './components/Page';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './components/admin/Dashboard';
import TotalAvaliablePlots from './components/admin/TotalAvaliablePlots';
import TotalBookedPlots from './components/admin/TotalBookedPlots';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/auth/admin/login" />;
  }
  
  return children;
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="min-h-screen flex flex-col relative">
        <NavBar />
        <div className="flex-1">
          <Banner />
          <LandingPage />
          <Text />
          <Page />
        </div>
        <Footer />
      </div>
    )
  },

  {
    path: '/auth/admin/login',
    element: <Login authType="admin" />
  },
  {
    path: '/auth/admin/forgot-password',
    element: <ForgotPassword authType="admin" />
  },
  {
    path: '/auth/admin/reset-password',
    element: <ResetPassword authType="admin" />
  },
  {
    path: '/auth/expense/login',
    element: <Login authType="expense" />
  },
  {
    path: '/auth/expense/forgot-password',
    element: <ForgotPassword authType="expense" />
  },
  {
    path: '/auth/expense/reset-password',
    element: <ResetPassword authType="expense" />
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/total-available-plots',
    element: (
      <ProtectedRoute>
        <TotalAvaliablePlots />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/total-booked-plots',
    element: (
      <ProtectedRoute>
        <TotalBookedPlots />
      </ProtectedRoute>
    )
  },
  
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
}

export default App;
