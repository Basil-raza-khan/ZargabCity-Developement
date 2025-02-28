import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { PiCellSignalFull } from "react-icons/pi";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X } from "lucide-react";
import { FaRegCheckCircle } from "react-icons/fa";
import AnimatedComponent from "../animations/AnimatedComponent";

const UserManagement = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "User1",
      email: "user1@gmail.com",
      phone: "9876543210",
      createDate: "2023-03-12 12:24:22 AM",
      updateDate: "2023-03-12 12:24:22 AM"
    },
    {
      id: 2,
      username: "User2",
      email: "user2@gmail.com",
      phone: "9876543210",
      createDate: "2023-03-12 12:24:22 AM",
      updateDate: "2023-03-12 12:24:22 AM"
    },
    {
      id: 3,
      username: "User3",
      email: "user3@gmail.com",
      phone: "9876543210",
      createDate: "2023-03-12 12:24:22 AM",
      updateDate: "2023-03-12 12:24:22 AM"
    },
  ]);
  const [newUser, setNewUser] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  

  const logout = () => {
    console.log("Logging out...");
    // Add your logout logic here
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    // Create new user object
    const newUserData = {
      id: users.length + 1,
      username: newUser.name,
      email: newUser.email,
      phone: newUser.mobile,
      createDate: new Date().toLocaleString(),
      updateDate: new Date().toLocaleString(),
    };

    // Add new user to users array
    setUsers(prevUsers => [...prevUsers, newUserData]);

    // Reset form
    setNewUser({
      name: "",
      mobile: "",
      email: "",
      password: "",
    });

    // Close dialog
    setIsAddUserOpen(false);

    // Show success alert
    setShowAlert(true);

    // Hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setShowConfirmDialog(true);
    setConfirmAction('update');
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowConfirmDialog(true);
    setConfirmAction('delete');
  };

  const confirmUpdate = () => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === selectedUser.id ? { ...selectedUser, updateDate: new Date().toLocaleString() } : user
      )
    );
    setIsEditUserOpen(false);
    setShowConfirmDialog(false);
    setAlertMessage('User has been successfully updated!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const confirmDelete = () => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUser.id));
    setShowConfirmDialog(false);
    setAlertMessage('User has been successfully deleted!');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="p-4">
      {/* Navbar */}
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

      <AnimatedComponent>
      {/* Success Alert */}
      {showAlert && (
        <Alert className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-green-50 border-green-500 z-50 shadow-lg p-4 rounded-lg">
          <AlertTitle className="text-green-700 font-bold text-lg">Success</AlertTitle>
          <AlertDescription className="text-green-600 mb-4 flex flex-col items-center gap-2 justify-center">
            <span>{alertMessage}</span>
            <FaRegCheckCircle className="text-green-600 text-4xl mt-3"/>
          </AlertDescription>
        </Alert>
      )}

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-bold">Add User</DialogTitle>
              {/* <button
                onClick={() => setIsAddUserOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button> */}
            </div>
            <DialogDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddUser} className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name :</label>
              <input
                type="text"
                required
                value={newUser.name}
                onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile Number :</label>
              <input
                type="tel"
                required
                value={newUser.mobile}
                onChange={(e) => setNewUser(prev => ({ ...prev, mobile: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address :</label>
              <input
                type="email"
                required
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password :</label>
              <input
                type="password"
                required
                value={newUser.password}
                onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
            >
              Add User
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Confirm Action</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p>Are you sure you want to {confirmAction} this user?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction === 'update' ? confirmUpdate : confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-bold">Edit User</DialogTitle>
              {/* <button
                onClick={() => setIsEditUserOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                
              </button> */}
            </div>
          </DialogHeader>

          <form onSubmit={handleUpdateUser} className="mt-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name :</label>
              <input
                type="text"
                required
                value={selectedUser?.username || ''}
                onChange={(e) => setSelectedUser(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile Number :</label>
              <input
                type="tel"
                required
                value={selectedUser?.phone || ''}
                onChange={(e) => setSelectedUser(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address :</label>
              <input
                type="email"
                required
                value={selectedUser?.email || ''}
                onChange={(e) => setSelectedUser(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
            >
              Save Changes
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* User Management Table */}
      <div className="mt-12 bg-gray-50 rounded-lg shadow-lg p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold">Users</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="search"
              placeholder="Search"
              className="px-3 py-2 border rounded-md w-full sm:w-auto"
            />
            <button
              onClick={() => setIsAddUserOpen(true)}
              className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center"
            >
              <span>+</span> Add New
            </button>
          </div>
        </div>

        <div className="mb-4">
          <button className="bg-gray-100 px-4 py-1 rounded-md">
            All ({users.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">USERNAME</th>
                <th className="py-3 px-6 text-left">EMAIL</th>
                <th className="py-3 px-6 text-left">PHONE</th>
                <th className="py-3 px-6 text-left">CREATE DATE</th>
                <th className="py-3 px-6 text-left">UPDATE DATE</th>
                <th className="py-3 px-6 text-center">MODIFY</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6">{user.id}</td>
                  <td className="py-3 px-6">{user.username}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.phone}</td>
                  <td className="py-3 px-6">{user.createDate}</td>
                  <td className="py-3 px-6">{user.updateDate}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() => handleEditUser(user)}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button 
                        className="p-1 hover:bg-gray-100 rounded text-red-500"
                        onClick={() => handleDeleteUser(user)}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded-md">Previous</button>
            <button className="px-3 py-1 border rounded-md">Next</button>
          </div>
          <div className="flex items-center gap-2">
            <span>Found 4 items out of 4</span>
            <button className="text-red-500">Clear filters</button>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Link to="/admin/dashboard">
          <button className="bg-red-500 text-white px-6 py-2 rounded-md">
            Back to Dashboard
          </button>
        </Link>
      </div>
      </AnimatedComponent>
    </div>
  );
};

export default UserManagement;
