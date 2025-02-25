import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { Button } from "@/components/ui/button";
import { BsShieldLock, BsCheckCircle } from "react-icons/bs";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { BiArrowBack } from 'react-icons/bi';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ResetPassword = ({ authType }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.join("").length === 4) {
      setIsVerified(true);
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    if (!/\d/.test(password)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setPasswordError("Password must contain at least one special character");
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      setShowDialog(true);
    }
  };

  const handleConfirmChange = () => {
    setShowDialog(false);
    setShowSuccessDialog(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessDialog(false);
    navigate(`/auth/${authType}/login`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      <main className="flex-grow flex items-center justify-center py-8 md:py-16">
        <div className="w-full max-w-sm px-4 md:px-6">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 mx-auto my-4 md:my-0 w-[95%] md:w-full">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <BsShieldLock className="w-16 h-16 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {authType === 'admin' ? 'Reset Admin Password' : 'Reset Expense Manager Password'}
              </h2>

              {!isVerified ? (
                <>
                  <p className="text-gray-600 mt-2 text-sm">
                    Enter the 4-digit code sent to your email
                  </p>
                  <form onSubmit={handleOtpSubmit} className="mt-8">
                    <div className="flex justify-center gap-3 mb-6">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-14 h-14 text-center text-2xl border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                          required
                        />
                      ))}
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md"
                    >
                      Verify Code
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <p className="text-gray-600 mt-2 text-sm mb-6">
                    Create your new password
                  </p>
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-left text-gray-700">
                        New Password
                      </label>
                      <div className="relative mt-1">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-left text-gray-700">
                        Confirm Password
                      </label>
                      <div className="relative mt-1">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <IoEyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <IoEye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {passwordError && (
                      <p className="text-sm text-red-600">{passwordError}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md"
                    >
                      Reset Password
                    </Button>
                  </form>
                </>
              )}
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
              <AlertDialogContent className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 w-[95%] rounded-lg md:w-full max-w-sm mx-auto">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-red-700 text-lg">Confirm Password Change</AlertDialogTitle>
                  <AlertDialogDescription className="text-red-600 text-sm">
                    Are you sure you want to change your password? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleConfirmChange}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm"
                  >
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Success Dialog */}
            <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
              <AlertDialogContent className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 w-[95%] rounded-lg md:w-full max-w-sm mx-auto">
                <AlertDialogHeader>
                  <div className="flex justify-center">
                    <BsCheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
                  </div>
                  <AlertDialogTitle className="text-green-700 text-lg">Success!</AlertDialogTitle>
                  <AlertDialogDescription className="text-green-600 text-sm">
                    Your password has been successfully updated.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction 
                    onClick={handleSuccessClose}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm"
                  >
                    Okay
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="mt-6">
              <Link
                to={`/auth/${authType}/login`}
                className="flex items-center justify-center text-red-600 hover:text-red-700 transition-colors"
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

export default ResetPassword; 