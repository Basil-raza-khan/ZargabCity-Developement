import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Text from './components/Text';
import LandingPage from './components/LandingPage';
import Page from './components/Page';
import Footer from './components/Footer';
import Login from './components/admin/Login';
import ForgotPassword from './components/admin/ForgotPassword';
import ResetPassword from './components/admin/ResetPassword';

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
    path: '/admin/login',
    element: <Login />
  },
  {
    path: '/admin/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/admin/reset-password',
    element: <ResetPassword />
  }
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
