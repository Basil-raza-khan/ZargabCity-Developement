import React, { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Navbar from "./NavBar.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import AnimatedComponent from "../animations/AnimatedComponent";


const TotalInstalmentDueUser = () => {
  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState("all");
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sample Data
  const data = [
    { plotId: "L1", name: "John Doe", dueDate: "2023-10-15", dueAmount: 2000000, status: "Pending", nextDueDate: "2023-11-15", totalInstallments: 12, paidInstallments: 3 },
    { plotId: "R1", name: "Jane Smith", dueDate: "2023-10-20", dueAmount: 8000000, status: "Overdue", nextDueDate: "2023-11-20", totalInstallments: 24, paidInstallments: 8 },
    { plotId: "C1", name: "Mike Johnson", dueDate: "2023-10-25", dueAmount: 3000000, status: "Pending", nextDueDate: "2023-11-25", totalInstallments: 36, paidInstallments: 12 },
    { plotId: "MM1", name: "Sarah Williams", dueDate: "2023-10-30", dueAmount: 1000000, status: "Overdue", nextDueDate: "2023-11-30", totalInstallments: 48, paidInstallments: 15 },
  ];

  // Filtered Data
  const filteredData = data.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       item.plotId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = category === "all" || item.plotId.startsWith(category);
    const matchSubcategory = subcategory === "all" || item.plotId.startsWith(subcategory);
    const matchDate = (!startDate || new Date(item.dueDate) >= startDate) && 
                     (!endDate || new Date(item.dueDate) <= endDate);
    return matchSearch && matchCategory && matchSubcategory && matchDate;
  });

  const clearFilters = () => {
    setCategory("all");
    setSubcategory("all");
    setStartDate(null);
    setEndDate(null);
    setSearchTerm("");
  };

  const handleShowDetails = (plot) => {
    setSelectedPlot(plot);
    setShowDetails(true);
  };

  const handlePayment = () => {
    setShowAlert(true);
  };

  return (
    <div className="min-h-screen ">
      <Navbar />
      <AnimatedComponent>
      <div className="p-2 sm:p-6 max-w-7xl mx-auto mt-10 md:mt-0 rounded-lg shadow-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Instalments Due</h1>
          <p className="text-gray-500">Track and manage your due installments</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:flex-wrap lg:flex-nowrap">
          {/* Category Filter */}
          <div className="w-full sm:w-auto">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="L">Residential</SelectItem>
                <SelectItem value="C">Commercial</SelectItem>
                <SelectItem value="MM">Amenities</SelectItem>
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
                <SelectItem value="all">All Subcategories</SelectItem>
                <SelectItem value="L">L Plots</SelectItem>
                <SelectItem value="R">R Plots</SelectItem>
                <SelectItem value="C">C Plots</SelectItem>
                <SelectItem value="MM">MM Plots</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Filters */}
          <div className="w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Start Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : <span>End Date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search */}
          <div className="w-full sm:w-auto lg:flex-1">
            <Input
              type="search"
              placeholder="Search by plot ID or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50 ">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider ">Plot ID</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider">Due Amount</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{item.plotId}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">Rs. {item.dueAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === "Overdue" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => handleShowDetails(item)}
                    >
                      View Details
                    </Button>
                    <Button 
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={handlePayment}
                    >
                      Pay Now
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
          <p className="text-sm text-gray-500">
            Showing {filteredData.length} of {data.length} entries
          </p>
        </div>
      </div>
      </AnimatedComponent>
      {/* Details Dialog */}
      <AlertDialog open={showDetails} onOpenChange={setShowDetails}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Installment Details</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedPlot && (
                <div className="space-y-2">
                  <p><strong>Plot ID:</strong> {selectedPlot.plotId}</p>
                  <p><strong>Owner:</strong> {selectedPlot.name}</p>
                  <p><strong>Next Due Date:</strong> {selectedPlot.nextDueDate}</p>
                  <p><strong>Installments Paid:</strong> {selectedPlot.paidInstallments} of {selectedPlot.totalInstallments}</p>
                  <p><strong>Amount Due:</strong> Rs. {selectedPlot.dueAmount.toLocaleString()}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Payment Confirmation Dialog */}
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to proceed with the payment?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                setShowAlert(false);
                setShowSuccess(true);
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Payment Successful</AlertDialogTitle>
            <AlertDialogDescription>
              Your payment has been processed successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccess(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TotalInstalmentDueUser;
