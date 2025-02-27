import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RiMenu3Line } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';
import { PiCellSignalFull } from 'react-icons/pi';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import NavBar from './NavBar';


const TotalBookedPlots = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [category, setCategory] = useState('All');
  const [subcategory, setSubcategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlots, setFilteredPlots] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showOwnershipForm, setShowOwnershipForm] = useState(false);
  const [ownershipData, setOwnershipData] = useState({
    allottee: {
      name: '',
      fatherName: '',
      contact: '',
      postcode: '',
      address: '',
      cnic: '',
      email: '',
      photo: null
    },
    nextToKin: {
      name: '',
      fatherName: '',
      contact: '',
      postcode: '',
      address: '',
      cnic: '',
      email: '',
      photo: null
    }
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showReceiptConfirmation, setShowReceiptConfirmation] = useState(false);
  const [showInstalmentPlan, setShowInstalmentPlan] = useState(false);
  const [showPayInstalment, setShowPayInstalment] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  const plotData = [
    { date: '2024-03-09', plotId: 'L1', category: 'Residential', subcategory: 'L', status: 'Booked' },
    { date: '2024-03-10', plotId: 'R1', category: 'Residential', subcategory: 'R', status: 'Booked' },
    { date: '2024-03-11', plotId: 'C1', category: 'Commercial', subcategory: 'C', status: 'Booked' },
    { date: '2024-03-12', plotId: 'MM1', category: 'Amenities', subcategory: 'MM', status: 'Booked' },
  ];

  // Filter function
  React.useEffect(() => {
    let filtered = [...plotData];
    
    if (category !== 'All') {
      filtered = filtered.filter(plot => plot.category === category);
    }
    if (subcategory !== 'All') {
      filtered = filtered.filter(plot => plot.subcategory === subcategory);
    }
    if (startDate && endDate) {
      filtered = filtered.filter(plot => {
        const plotDate = new Date(plot.date);
        return plotDate >= startDate && plotDate <= endDate;
      });
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(plot =>
        plot.plotId.toLowerCase().includes(searchLower) ||
        plot.category.toLowerCase().includes(searchLower)
      );
    }
    setFilteredPlots(filtered);
  }, [category, subcategory, startDate, endDate, searchTerm]);

  const handleOwnershipChange = (section, field, value) => {
    setOwnershipData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handlePhotoUpload = (section, file) => {
    handleOwnershipChange(section, 'photo', file);
  };

  const handleSaveChanges = () => {
    setShowConfirmDialog(true);
  };

  const confirmOwnershipChange = () => {
    // Here you would typically make an API call to save the changes
    setShowConfirmDialog(false);
    setShowSuccessDialog(true);
    setTimeout(() => {
      setShowSuccessDialog(false);
      navigate('/user/dashboard');
    }, 2000);
  };

  const handleGenerateReceipt = () => {
    // Generate company letterhead with details
    navigate('/user/download-forms');
  };

  const handlePayInstalment = () => {
    setShowPayInstalment(true);
    setShowInstalmentPlan(false);
  };

  const handleSavePayment = () => {
    setShowPayInstalment(false);
    setShowSuccessDialog(true);
  };

  return (
    <div>
      {/* Navigation Bar */}
    <NavBar  />

      <div className="p-4 sm:p-6">
        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:flex-wrap lg:flex-nowrap">
          {/* Category Filter */}
          <div className="w-full sm:w-auto">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
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

          {/* Subcategory Filter */}
          <div className="w-full sm:w-auto">
            <Select value={subcategory} onValueChange={setSubcategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by Subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Filter by Subcategory</SelectItem>
                <SelectItem value="L">L</SelectItem>
                <SelectItem value="R">R</SelectItem>
                <SelectItem value="C">C</SelectItem>
                <SelectItem value="MM">MM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Date */}
          <div className="w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Start Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div className="w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>End Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search */}
          <div className="w-full sm:w-auto lg:ml-auto">
            <input
              type="search"
              placeholder="Search plots..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Table with Expandable Details */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="text-center bg-gray-50">
                <th className="py-2 px-4 font-semibold">Date</th>
                <th className="py-2 px-4 font-semibold">Plot ID</th>
                <th className="py-2 px-4 font-semibold">Category</th>
                <th className="py-2 px-4 font-semibold">Status</th>
                <th className="py-2 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlots.map((plot, index) => (
                <>
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{format(new Date(plot.date), "MM/dd/yyyy")}</td>
                    <td className="px-4">{plot.plotId}</td>
                    <td className="px-4">{plot.category}</td>
                    <td className="px-4">{plot.status}</td>
                    <td className="px-4 space-x-2">
                      <Button 
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => {
                          setSelectedPlot(plot);
                          setShowOwnershipForm(true);
                        }}
                      >
                        Change Ownership
                      </Button>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          setSelectedPlot(plot);
                          setShowDetails(showDetails && selectedPlot?.plotId === plot.plotId ? false : true);
                        }}
                      >
                        {showDetails && selectedPlot?.plotId === plot.plotId ? 'Hide Details' : 'Show Details'}
                      </Button>
                      <Button 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => setShowInstalmentPlan(true)}
                      >
                        Instalment
                      </Button>
                    </td>
                  </tr>
                  {showDetails && selectedPlot?.plotId === plot.plotId && (
                    <tr>
                      <td colSpan="5" className="bg-gray-50 px-8 py-4">
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <p><span className="font-semibold">Booked by:</span> User1</p>
                            <p><span className="font-semibold">Name:</span> {plot.name || 'John Doe'}</p>
                            <p><span className="font-semibold">Contact:</span> {plot.contact || '01234578'}</p>
                            <p><span className="font-semibold">CNIC No:</span> {plot.cnic || '98765-43210-567-8'}</p>
                            <p><span className="font-semibold">Address:</span> {plot.address || '123 Main St'}</p>
                            <p><span className="font-semibold">Sub-category:</span> {plot.subcategory}</p>
                            <p><span className="font-semibold">Number of Instalments:</span> 48</p>
                            <p><span className="font-semibold">Paid Instalments:</span> 3</p>
                            <p><span className="font-semibold">Total Amount:</span> 1,600,000</p>
                            <p><span className="font-semibold">Total Amount Paid:</span> 80,000</p>
                            <p><span className="font-semibold">Down Payment:</span> 50,000</p>
                            <p><span className="font-semibold">Remaining Amount:</span> 5,000,000</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-4">Instalment History</h4>
                            <div className="space-y-2">
                              <p>1. PKR 10,000 - Date: 2023-01-15</p>
                              <p>2. PKR 10,000 - Date: 2023-02-15</p>
                              <p>3. PKR 10,000 - Date: 2023-03-15</p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ownership Form */}
        {showOwnershipForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Change of Ownership</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Allottee Details */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Allottee details</h3>
                  <div className="space-y-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Enter name"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('allottee', 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Enter father name"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('allottee', 'fatherName', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Contact number"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('allottee', 'contact', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Postcode"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('allottee', 'postcode', e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Address"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('allottee', 'address', e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="CNIC no"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('allottee', 'cnic', e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="email@gmail"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('allottee', 'email', e.target.value)}
                      />
                      <p className="text-red-500 text-sm mt-1">Please, enter valid email address</p>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer">
                      <input
                        type="file"
                        id="allotteePhoto"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload('allottee', e.target.files[0])}
                      />
                      <label htmlFor="allotteePhoto" className="cursor-pointer">
                        <span className="flex justify-center mb-2">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </span>
                        Upload photo
                      </label>
                      <p className="text-sm text-gray-500 mt-2">Attach file. File size of your documents should not exceed 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Next to Kin Details */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Next to kin details</h3>
                  <div className="space-y-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Enter name"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('nextToKin', 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Enter father name"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('nextToKin', 'fatherName', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Contact number"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('nextToKin', 'contact', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Postcode"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('nextToKin', 'postcode', e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Address"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('nextToKin', 'address', e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="CNIC no"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('nextToKin', 'cnic', e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="email@gmail"
                        className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black"
                        onChange={(e) => handleOwnershipChange('nextToKin', 'email', e.target.value)}
                      />
                      <p className="text-red-500 text-sm mt-1">Please, enter valid email address</p>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 p-8 text-center cursor-pointer">
                      <input
                        type="file"
                        id="nextToKinPhoto"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload('nextToKin', e.target.files[0])}
                      />
                      <label htmlFor="nextToKinPhoto" className="cursor-pointer">
                        <span className="flex justify-center mb-2">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </span>
                        Upload photo
                      </label>
                      <p className="text-sm text-gray-500 mt-2">Attach file. File size of your documents should not exceed 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={handleGenerateReceipt}
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
                >
                  GENERATE RECEIPT
                </button>
                <button
                  onClick={() => setShowOwnershipForm(false)}
                  className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Confirm Changes</h3>
              <p>Are you sure you want to change the ownership details?</p>
              <div className="mt-4 flex justify-end space-x-4">
                <Button onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
                <Button onClick={confirmOwnershipChange} className="bg-blue-600 text-white">
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* System Generated Instalment Plan Dialog */}
        {showInstalmentPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
              <h2 className="text-3xl font-bold text-center mb-12">
                System Generated Instalment Plan
              </h2>

              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-xl">Remaining Amount</span>
                  <span className="text-xl">7000</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl">Remaining Instalments:</span>
                  <span className="text-xl">2</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl">Last Paid:</span>
                  <span className="text-xl">3000</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl">Last Paid Date:</span>
                  <span className="text-xl">2023-02-15</span>
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={handlePayInstalment}
                    className="bg-red-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-red-600"
                  >
                    PAY INSTALMENT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pay Instalment Dialog */}
        {showPayInstalment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full">
              <h2 className="text-3xl font-bold text-center mb-12">
                Pay Instalment
              </h2>

              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <span className="text-xl">Remaining Amount</span>
                  <span className="text-xl">7000</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl">Remaining Instalments:</span>
                  <span className="text-xl">2</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl">Select month to pay:</span>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="March 2023" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="march2023">March 2023</SelectItem>
                      <SelectItem value="april2023">April 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl">Enter amount:</span>
                  <input
                    type="text"
                    placeholder="Enter amount paid"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    className="w-[300px] border-b border-gray-300 pb-2 focus:outline-none focus:border-black text-right"
                  />
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleSavePayment}
                    className="bg-black text-white px-16 py-3 rounded-lg text-lg hover:bg-gray-800"
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Dialog */}
        {showSuccessDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-green-600 mb-4">Success!</h3>
              <p className="mb-6">Payment has been recorded successfully.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setShowSuccessDialog(false);
                    setShowPayInstalment(false);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Okay
                </button>
                <button
                  onClick={handleGenerateReceipt}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Generate Receipt
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Receipt Confirmation Dialog */}
        {showReceiptConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Confirm Generate Receipt</h3>
              <p className="mb-6">Are you sure you want to generate the receipt?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowReceiptConfirmation(false)}
                  className="px-4 py-2 text-gray-800 border rounded-lg hover:text-gray-600 hover:shadow-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmGenerateReceipt}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-400"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination and Summary */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <span className="text-sm">Found {filteredPlots.length} items out of {plotData.length}</span>
            <button
              className="text-red-500 hover:text-red-600"
              onClick={() => {
                setCategory('All');
                setSubcategory('All');
                setStartDate(null);
                setEndDate(null);
                setSearchTerm('');
              }}
            >
              Clear filters
            </button>
          </div>
        </div>

        {/* Back to Dashboard Button */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={() => navigate('/user/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TotalBookedPlots;
