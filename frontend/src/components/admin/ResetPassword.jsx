import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { BiArrowBack } from "react-icons/bi";
import { BsShieldLock } from "react-icons/bs";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { BsCheckCircle } from "react-icons/bs";
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

const ResetPassword = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [passwordError, setPasswordError] = useState("");

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
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-8 md:py-16">
        <div className="w-full max-w-sm px-4 md:px-6">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 mx-auto w-[95%] md:w-full">
            {isVerified ? (
              // New Password Form
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <BsShieldLock className="w-16 h-16 text-black" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Set new password
                </h2>
                <p className="text-gray-600 mt-2 text-sm">
                  Must be at least 8 characters long with a special character
                  and a digit
                </p>

                <form onSubmit={handlePasswordSubmit} className="space-y-6 mt-6">
                  <div>
                    <label className="block text-sm text-left font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-black"
                      >
                        {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-left font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-black"
                      >
                        {showConfirmPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                      </button>
                    </div>
                  </div>

                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md"
                  >
                    Change Password
                  </Button>
                </form>

                <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                  <AlertDialogContent className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-red-700">Confirm Password Change</AlertDialogTitle>
                      <AlertDialogDescription className="text-red-600">
                        Are you sure you want to change your password? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700">Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleConfirmChange}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                  <AlertDialogContent className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200">
                    <AlertDialogHeader>
                      <div className="flex justify-center mb-4">
                        <BsCheckCircle className="w-12 h-12 text-green-600" />
                      </div>
                      <AlertDialogTitle className="text-green-700">Success!</AlertDialogTitle>
                      <AlertDialogDescription className="text-green-600">
                        Your password has been successfully updated.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction 
                        onClick={handleSuccessClose}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Okay
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <div className="mt-6">
                  <Link
                    to="/admin/login"
                    className="flex items-center justify-center text-red-600 hover:text-red-700 transition-colors"
                  >
                    <BiArrowBack className="w-5 h-5 mr-1" />
                    <span>Back to login</span>
                  </Link>
                </div>
              </div>
            ) : (
              // OTP Verification Form
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <BsShieldLock className="w-16 h-16 text-black" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Reset Password
                </h2>
                <p className="text-gray-600 mt-2 text-sm">
                  Enter the 4-digit code sent to your email
                </p>

                <form onSubmit={handleOtpSubmit} className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Verification Code
                    </label>
                    <div className="flex justify-center gap-3">
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
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md"
                  >
                    Verify Code
                  </Button>
                </form>

                <div className="mt-6">
                  <Link
                    to="/admin/login"
                    className="flex items-center justify-center text-red-600 hover:text-red-700 transition-colors"
                  >
                    <BiArrowBack className="w-5 h-5 mr-1" />
                    <span>Back to login</span>
                  </Link>
                </div>
              </div>
            )}
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
