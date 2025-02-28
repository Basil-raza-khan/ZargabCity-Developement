import { useState } from "react";
import Navbar from "./Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { IoIosArrowDropdown } from "react-icons/io";
import AnimatedComponent from "../animations/AnimatedComponent";

const TotalAvailablePlots = () => {
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingType, setBookingType] = useState(null);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showInstallmentForm, setShowInstallmentForm] = useState(false);

  const [plotData] = useState([
    { date: "09/24", plotId: "L1", name: "John Doe", category: "Residential", status: "Available" },
    { date: "09/24", plotId: "R1", name: "John Doe", category: "Residential", status: "Available" },
    { date: "09/24", plotId: "C1", name: "John Doe", category: "Commercial", status: "Available" },
    { date: "09/24", plotId: "MM1", name: "John Doe", category: "Amenities", status: "Available" },
  ]);

  const CashBookingForm = () => (
    <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
      <DialogContent className="max-w-[90%] w-[800px] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Booking Form on Cash</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Allottee details</h3>
            <Input placeholder="Enter name" />
            <Input placeholder="Enter father name" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Contact number" />
              <Input placeholder="Postcode" />
            </div>
            <Input placeholder="Address" />
            <Input placeholder="CNIC No" />
            <Input placeholder="email@gmail" />
            <p className="text-xs text-red-500">Please write valid email address</p>
            <Input placeholder="Enter total amount" />
            <Input placeholder="Enter amount paid" />
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <p>Upload photo</p>
              <p className="text-xs text-gray-500">Max file size of your document should not exceed 10MB</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Next to kin details</h3>
            <Input placeholder="Enter name" />
            <Input placeholder="Enter father name" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Contact number" />
              <Input placeholder="Postcode" />
            </div>
            <Input placeholder="Address" />
            <Input placeholder="CNIC No" />
            <Input placeholder="email@gmail" />
            <p className="text-xs text-red-500">Please write valid email address</p>
            <Input placeholder="Enter total amount" />
            <Input placeholder="Enter amount paid" />
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <p>Upload photo</p>
              <p className="text-xs text-gray-500">Max file size of your document should not exceed 10MB</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-6 pb-6">
          <Button 
            className="w-full bg-black text-white"
            onClick={() => setShowAlert(true)}
          >
            SUBMIT
          </Button>
          <Button 
            variant="destructive" 
            className="w-full "
            onClick={() => setShowBookingForm(false)}
          >
            Go Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const InstallmentBookingForm = () => (
    <Dialog open={showInstallmentForm} onOpenChange={setShowInstallmentForm}>
      <DialogContent className="max-w-[90%] w-[800px] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Booking Form on Installments</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Allottee details</h3>
            <Input placeholder="Enter name" />
            <Input placeholder="Enter father name" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Contact number" />
              <Input placeholder="Postcode" />
            </div>
            <Input placeholder="Address" />
            <Input placeholder="CNIC No" />
            <Input placeholder="email@gmail" />
            <p className="text-xs text-red-500">Please write valid email address</p>
            <Input placeholder="Enter total amount" />
            <Input placeholder="Enter amount paid" />
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <p>Upload photo</p>
              <p className="text-xs text-gray-500">Max file size of your document should not exceed 10MB</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Next to kin details</h3>
            <Input placeholder="Enter name" />
            <Input placeholder="Enter father name" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Contact number" />
              <Input placeholder="Postcode" />
            </div>
            <Input placeholder="Address" />
            <Input placeholder="CNIC No" />
            <Input placeholder="email@gmail" />
            <p className="text-xs text-red-500">Please write valid email address</p>
            <Input placeholder="Enter total amount" />
            <Input placeholder="Enter amount paid" />
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <p>Upload photo</p>
              <p className="text-xs text-gray-500">Max file size of your document should not exceed 10MB</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-semibold mb-4">Instalment Plan</h3>
          <div className="space-y-4">
            <Input type="date" />
            <Input placeholder="Enter total amount" />
            <Input placeholder="Enter down payment" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select number of installments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12 Months</SelectItem>
                <SelectItem value="24">24 Months</SelectItem>
                <SelectItem value="36">36 Months</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-2">
              <input type="checkbox" id="udhaar" />
              <label htmlFor="udhaar">I want to protect my data by signing an NDA</label>
            </div>

            <Button 
              className="w-full bg-black text-white"
              onClick={() => setShowAlert(true)}
            >
              GENERATE PLAN
            </Button>
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => setShowInstallmentForm(false)}
            >
              Go Back
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const ConfirmationDialog = () => (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Please confirm your submission.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            setShowAlert(false);
            setShowSuccess(true);
          }} className="bg-red-500 hover:bg-red-600 text-white">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const SuccessDialog = () => (
    <AlertDialog open={showSuccess} onOpenChange={setShowSuccess} >
      <AlertDialogContent className="bg-green-200 border border-green-500 text-black">
        <AlertDialogHeader>
          <AlertDialogTitle>Success!</AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            Your form has been submitted successfully.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center">
          <AlertDialogAction onClick={() => {
            setShowSuccess(false);
            setShowBookingForm(false);
            setShowInstallmentForm(false);
            navigate('/user/download-forms');
          }} className="bg-green-500 hover:bg-green-600 text-white rounded-lg">
            Okay
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const filteredData = plotData.filter(plot => {
    const matchesCategory = category === "all" || plot.category === category;
    const matchesSearch = plot.plotId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plot.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <AnimatedComponent>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Residential">Residential</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Amenities">Amenities</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="search"
            placeholder="Search"
            className="max-w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plot ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((plot, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{plot.date}</td>
                  <td className="px-6 py-4">{plot.plotId}</td>
                  <td className="px-6 py-4">{plot.name}</td>
                  <td className="px-6 py-4">{plot.category}</td>
                  <td className="px-6 py-4">{plot.status}</td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="destructive" size="sm">Book <IoIosArrowDropdown /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => {
                          setBookingType('cash');
                          setShowBookingForm(true);
                        }}>
                          Book on Cash
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setBookingType('installment');
                          setShowInstallmentForm(true);
                        }}>
                          Book on Installment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            <Button variant="outline">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
          <div className="flex items-center gap-2">
            <span>Found {filteredData.length} items out of {plotData.length}</span>
            <Button 
              variant="link" 
              className="text-red-500"
              onClick={() => {
                setCategory("all");
                setSearchQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        </div>

        <div className="flex justify-center mt-6">
        
          <Button variant="default" className="bg-red-600 hover:bg-red-500 text-white"
            onClick={() => {
                navigate('/user/dashboard');
              }}>
            Back to Dashboard
          </Button>
        </div>
      </div>

      {showBookingForm && <CashBookingForm />}
      {showInstallmentForm && <InstallmentBookingForm />}
      <ConfirmationDialog />
      <SuccessDialog />
      </AnimatedComponent>
    </div>
  );
};

export default TotalAvailablePlots; 