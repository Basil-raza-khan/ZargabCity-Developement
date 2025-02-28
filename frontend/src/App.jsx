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
import UserManagement from './components/admin/UserManagement';
import TotalInstalmentDue from './components/admin/TotalInstalmentDue';
import InventoryManagement from './components/admin/InventoryManagement';
import UserDashboard from './components/user/UserDashboard';
import TotalBookedPlotsUser from './components/user/TotalBookedPlots';
import DownloadForms from './components/user/DownloadForms';
import AmountReceived from './components/admin/AmountRecieved';
import TotalAvailablePlots from './components/user/TotalAvailablePlots';
import TotalAmountRecieved from './components/user/TotalAmountRecieved';
import TotalInstalmentDueUser from './components/user/TotalInstalmentDueUser';
import ExpenseManager from './components/expenseManager/ExpenseManager';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  console.log("Current User in ProtectedRoute:", currentUser);

  if (!currentUser || currentUser.role !== "admin") {
    // console.warn("Redirecting to /auth/admin/login");
    return <Navigate to="/auth/admin/login" />;
  }

  // console.log("Access granted to:", children);
  return children;
};

// Add a new protected route component for users
const ProtectedUserRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== "user") {
    return <Navigate to="/auth/user/login" />;
  }

  return children;
};

// Add this protected route component
const ProtectedExpenseRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== "expense-manager") {
    return <Navigate to="/auth/expense/login" />;
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
    path: '/auth/user/login',
    element: <Login authType="user" />
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
  {
    path: '/admin/user-management',
    element: (
      <ProtectedRoute>
        <UserManagement />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/total-instalment-due',
    element: (
      <ProtectedRoute>
        <TotalInstalmentDue />
      </ProtectedRoute>
    )
  },  
  {
    path: '/admin/inventory-management',
    element: (
      <ProtectedRoute>
        <InventoryManagement />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/amount-recieved',
    element: (
      <ProtectedRoute>
        <AmountReceived />  
      </ProtectedRoute>
    )
  },
  {
    path: '/user/dashboard',
    element: (
      <ProtectedUserRoute>
        <UserDashboard />
      </ProtectedUserRoute>
    )
  },
  {
    path: '/user/total-booked-plots',
    element: (
      <ProtectedUserRoute>
        <TotalBookedPlotsUser />
      </ProtectedUserRoute>
    )
  },
  {
    path: '/user/download-forms',
    element: (
      <ProtectedUserRoute>
        <DownloadForms />
      </ProtectedUserRoute>
    )
  },
  {
    path: '/user/total-available-plots',
    element: (
      <ProtectedUserRoute>
        <TotalAvailablePlots />
      </ProtectedUserRoute>
    )
  },
  {
    path: '/user/total-amount-recieved',
    element: (
      <ProtectedUserRoute>
        <TotalAmountRecieved />
      </ProtectedUserRoute>
    )
  },
  {
    path: '/user/total-instalment-due',
    element: (
      <ProtectedUserRoute>
        <TotalInstalmentDueUser />
      </ProtectedUserRoute>
    )
  },
  {
    path: '/expense-manager/dashboard',
    element: (
      <ProtectedExpenseRoute>
        <ExpenseManager />
      </ProtectedExpenseRoute>
    )
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
}

export default App;
