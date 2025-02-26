import { useState, useMemo } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { PiCellSignalFull } from "react-icons/pi";

const TotalInstalmentDue = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);
  
  // Mock data - replace with your actual data
  const instalments = [
    {
      plotId: "L1",
      name: "John Doe",
      dueDate: "2023-10-15",
      dueAmount: 2000000,
      category: "residential",
      details: {
        bookedBy: "User1",
        contact: "012345678",
        cnic: "98765-43210-567-8",
        address: "123 Main St",
        subCategory: "L1",
        totalInstalments: 48,
        paidInstalments: 3,
        totalAmount: 1600000,
        totalPaid: 80000,
        downPayment: 50000,
        remainingAmount: 5000000,
        instalmentHistory: [
          { amount: 10000, date: "2023-01-15" },
          { amount: 10000, date: "2023-02-15" },
          { amount: 10000, date: "2023-03-15" },
        ]
      }
    },
   
    {
      plotId: "L3",
      name: "khan Doe",
      dueDate: "2023-10-15", 
      dueAmount: 2000000,
      category: "commercial",
      details: {
        bookedBy: "User1",
        contact: "012345678",
        cnic: "98765-43210-567-8",
        address: "123 Main St",
        subCategory: "R1",
        totalInstalments: 48,
        paidInstalments: 3,
        totalAmount: 1600000,
        totalPaid: 80000,
        downPayment: 50000,
        remainingAmount: 5000000,
        instalmentHistory: [
          { amount: 10000, date: "2023-01-15" },
          { amount: 10000, date: "2023-02-15" },
          { amount: 10000, date: "2023-03-15" },
        ]
      }
    },
    {
      plotId: "L2",
      name: "Admin",
      dueDate: "2023-10-15",
      dueAmount: 2000000,
      category: "residential",
      details: {
        bookedBy: "User1",
        contact: "012345678",
        cnic: "98765-43210-567-8",
        address: "123 Main St", 
        subCategory: "L1",
        totalInstalments: 48,
        paidInstalments: 3,
        totalAmount: 1600000,
        totalPaid: 80000,
        downPayment: 50000,
        remainingAmount: 5000000,
        instalmentHistory: [
          { amount: 10000, date: "2023-01-15" },
          { amount: 10000, date: "2023-02-15" },
          { amount: 10000, date: "2023-03-15" },
        ]
      }
    },
  ];

  const filteredInstalments = useMemo(() => {
    return instalments.filter(instalment => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        instalment.plotId.toLowerCase().includes(searchLower) ||
        instalment.name.toLowerCase().includes(searchLower) ||
        instalment.details.contact.includes(searchLower);

      // Category filter  
      const matchesCategory = !category || category === 'all' || 
        instalment.category === category;

      // Subcategory filter
      const matchesSubCategory = !subCategory || subCategory === 'all' ||
        instalment.details.subCategory === subCategory;

      // Date range filter
      const instalmentDate = new Date(instalment.dueDate);
      const isAfterStart = !startDate || instalmentDate >= startDate;
      const isBeforeEnd = !endDate || instalmentDate <= endDate;

      return matchesSearch && matchesCategory && matchesSubCategory && 
        isAfterStart && isBeforeEnd;
    });
  }, [instalments, searchQuery, category, subCategory, startDate, endDate]);

  const toggleDetails = (plotId) => {
    setExpandedRow(expandedRow === plotId ? null : plotId);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCategory("");
    setSubCategory("");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="p-2 sm:p-4">
      {/* Navbar */}
      <nav className="bg-black rounded-lg shadow-lg mb-4 sm:mb-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex justify-between gap-4 sm:gap-16 items-center h-16">
            <div className="flex items-center">
              <Link to="/admin/dashboard">
                <img
                  src="/MainLogo.svg"
                  alt="Main Logo"
                  className="h-24 sm:h-36 w-auto mt-2 -ml-2 sm:ml-0"
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

      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
        <Select value={subCategory} onValueChange={setSubCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by Subcategory" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="L1">L1</SelectItem>
            <SelectItem value="R1">R1</SelectItem>
            <SelectItem value="C1">C1</SelectItem>
            <SelectItem value="MM1">MM1</SelectItem>

          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="commercial">Street</SelectItem>

          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-[200px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : "Start Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-[200px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "PPP") : "End Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Input
          placeholder="Search by ID, name or contact..."
          className="w-full sm:w-[200px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-5 bg-gray-100 p-4 font-semibold">
            <div>Plot ID</div>
            <div>Name</div>
            <div>Due Date</div>
            <div>Due Amount</div>
            <div>Details</div>
          </div>

          {filteredInstalments.map((instalment) => (
            <div key={instalment.plotId} className="border-t">
              <div className="grid grid-cols-5 p-4">
                <div>{instalment.plotId}</div>
                <div>{instalment.name}</div>
                <div>{instalment.dueDate}</div>
                <div>{instalment.dueAmount.toLocaleString()}</div>
                <div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => toggleDetails(instalment.plotId)}
                  >
                    {expandedRow === instalment.plotId ? "Hide Details" : "Show Details"}
                  </Button>
                </div>
              </div>

              {expandedRow === instalment.plotId && (
                <div className="p-4 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p>Booked by: {instalment.details.bookedBy}</p>
                    <p>Name: {instalment.name}</p>
                    <p>Contact: {instalment.details.contact}</p>
                    <p>CNIC No: {instalment.details.cnic}</p>
                    <p>Address: {instalment.details.address}</p>
                    <p>Sub-category: {instalment.details.subCategory}</p>
                    <p>Number of Instalments: {instalment.details.totalInstalments}</p>
                    <p>Paid Instalments: {instalment.details.paidInstalments}</p>
                    <p>Total Amount: {instalment.details.totalAmount.toLocaleString()}</p>
                    <p>Total Amount Paid: {instalment.details.totalPaid.toLocaleString()}</p>
                    <p>Down Payment: {instalment.details.downPayment.toLocaleString()}</p>
                    <p>Remaining Amount: {instalment.details.remainingAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Instalment History</h3>
                    <div className="space-y-1">
                      {instalment.details.instalmentHistory.map((history, index) => (
                        <p key={index}>
                          {index + 1}. PKR {history.amount.toLocaleString()} - Date: {history.date}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
        <div className="flex items-center gap-2">
          <span>Found {filteredInstalments.length} items out of {instalments.length}</span>
          <Button variant="link" className="text-red-500" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="destructive" onClick={() => navigate('/admin/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default TotalInstalmentDue;
