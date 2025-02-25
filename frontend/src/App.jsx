import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
  }
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
