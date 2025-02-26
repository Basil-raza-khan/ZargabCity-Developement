import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RiMenu3Line } from 'react-icons/ri';
import { FaHome } from 'react-icons/fa';
import { PiCellSignalFull } from 'react-icons/pi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { FiDownload, FiPrinter } from 'react-icons/fi';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const TotalBookedPlots = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [category, setCategory] = useState('All');
    const [subcategory, setSubcategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPlots, setFilteredPlots] = useState([]);
    const [expandedPlotId, setExpandedPlotId] = useState(null);
    const [showPrintDialog, setShowPrintDialog] = useState(false);
    const [selectedPlotDetails, setSelectedPlotDetails] = useState(null);

    // Updated mock data with details
    const bookedPlots = [
        {
            date: '2024-03-09',
            plotId: 'L1',
            name: 'John Doe',
            category: 'Residential',
            status: 'Booked',
            details: {
                bookedBy: 'User1',
                owner: 'John Doe',
                contact: '012345678',
                address: '123 Main St',
                cnic: '98765-43210-567-8',
                subcategoryDetail: 'L1',
                numberOfInstalments: 48,
                paidInstalments: 3,
                totalAmount: 1600000,
                totalAmountPaid: 80000,
                downPayment: 50000,
                remainingAmount: 5000000,
                allotteeImage: '/path/to/allottee.jpg',
                nextToKinImage: '/path/to/nextToKin.jpg',
                instalmentHistory: [
                    { amount: 'PKR 10000', date: '2023-01-15' },
                    { amount: 'PKR 10000', date: '2023-02-15' },
                    { amount: 'PKR 10000', date: '2023-03-15' },
                ]
            }
        },
        { date: '2024-03-10', plotId: 'R1', name: 'Jane Smith', category: 'Residential', status: 'Booked' },
        { date: '2024-03-11', plotId: 'C1', name: 'Bob Wilson', category: 'Commercial', status: 'Booked' },
        { date: '2024-03-12', plotId: 'MM1', name: 'Alice Brown', category: 'Amenities', status: 'Booked' },
    ];

    // Filter function
    const filterPlots = () => {
        let filtered = [...bookedPlots];

        // Category filter
        if (category !== 'All') {
            filtered = filtered.filter(plot => plot.category === category);
        }

        // Subcategory filter
        if (subcategory !== 'All') {
            filtered = filtered.filter(plot => plot.plotId.startsWith(subcategory));
        }

        // Date range filter
        if (startDate && endDate) {
            filtered = filtered.filter(plot => {
                const plotDate = new Date(plot.date);
                return plotDate >= startDate && plotDate <= endDate;
            });
        }

        // Search term filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(plot =>
                plot.name.toLowerCase().includes(searchLower) ||
                plot.plotId.toLowerCase().includes(searchLower) ||
                plot.category.toLowerCase().includes(searchLower)
            );
        }

        setFilteredPlots(filtered);
    };

    // Effect to run filter on any filter change
    React.useEffect(() => {
        filterPlots();
    }, [category, subcategory, startDate, endDate, searchTerm]);

    const toggleDetails = (plotId) => {
        setExpandedPlotId(expandedPlotId === plotId ? null : plotId);
    };

    const handlePrint = (plot) => {
        setSelectedPlotDetails(plot);
        setShowPrintDialog(true);
    };

    const PrintableForm = ({ plot }) => {
        const componentRef = useRef();

        const handleDownload = () => {
            const element = componentRef.current;
            html2canvas(element).then((canvas) => {
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
                pdf.save(`plot-details-${plot.plotId}.pdf`);
            });
        };

        return (
            <div className="p-8 bg-white">
                <div className="flex justify-end gap-4 mb-6 print:hidden">
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        <FiDownload /> Download PDF
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        <FiPrinter /> Print
                    </button>
                </div>

                <div ref={componentRef} className="max-w-4xl mx-auto bg-white p-8 print:p-4">
                    {/* Header */}
                    <div className="text-center border-b-2 border-gray-800 pb-6 mb-6">
                        <div className="flex justify-center mb-4">
                            <img src="/MainLogo.svg" alt="Company Logo" className="h-48 w-auto" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">PLOT BOOKING DETAILS</h1>
                        <p className="text-gray-600">Reference No: {plot.plotId}</p>
                        <p className="text-gray-600">Date: {format(new Date(plot.date), "dd/MM/yyyy")}</p>
                    </div>

                    {/* Plot Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b">Plot Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm mb-2"><span className="font-semibold">Plot ID:</span> {plot.plotId}</p>
                                <p className="text-sm mb-2"><span className="font-semibold">Category:</span> {plot.category}</p>
                                <p className="text-sm mb-2"><span className="font-semibold">Sub-category:</span> {plot.details.subcategoryDetail}</p>
                                <p className="text-sm mb-2"><span className="font-semibold">Status:</span> {plot.status}</p>
                            </div>
                            <div>
                                <p className="text-sm mb-2"><span className="font-semibold">Total Amount:</span> PKR {plot.details.totalAmount}</p>
                                <p className="text-sm mb-2"><span className="font-semibold">Down Payment:</span> PKR {plot.details.downPayment}</p>
                                <p className="text-sm mb-2"><span className="font-semibold">Remaining Amount:</span> PKR {plot.details.remainingAmount}</p>
                                <p className="text-sm mb-2"><span className="font-semibold">Number of Instalments:</span> {plot.details.numberOfInstalments}</p>
                            </div>
                        </div>
                    </div>

                    {/* Owner Information */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b">Owner Information</h2>
                        <div className="grid grid-cols-2 gap-8">
                            {/* Allottee Details */}
                            <div>
                                <h3 className="font-semibold mb-2">Allottee Details</h3>
                                <div className="flex gap-4">
                                    <div>
                                        <img
                                            src={plot.details.allotteeImage}
                                            alt="Allottee"
                                            className="w-24 h-24 object-cover mb-2 border"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm mb-1"><span className="font-semibold">Name:</span> {plot.details.owner}</p>
                                        <p className="text-sm mb-1"><span className="font-semibold">CNIC:</span> {plot.details.cnic}</p>
                                        <p className="text-sm mb-1"><span className="font-semibold">Contact:</span> {plot.details.contact}</p>
                                        <p className="text-sm mb-1"><span className="font-semibold">Address:</span> {plot.details.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Next of Kin Details */}
                            <div>
                                <h3 className="font-semibold mb-2">Next of Kin Details</h3>
                                <div className="flex gap-4">
                                    <div>
                                        <img
                                            src={plot.details.nextToKinImage}
                                            alt="Next of Kin"
                                            className="w-24 h-24 object-cover mb-2 border"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm mb-1"><span className="font-semibold">Name:</span> {plot.details.nextToKin}</p>
                                        <p className="text-sm mb-1"><span className="font-semibold">CNIC:</span> {plot.details.nextToKinCNIC}</p>
                                        <p className="text-sm mb-1"><span className="font-semibold">Relation:</span> {plot.details.relation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instalment History */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b">Instalment History</h2>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="py-2 px-4 text-left">No.</th>
                                    <th className="py-2 px-4 text-left">Date</th>
                                    <th className="py-2 px-4 text-left">Amount</th>
                                    <th className="py-2 px-4 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plot.details.instalmentHistory.map((instalment, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="py-2 px-4">{index + 1}</td>
                                        <td className="py-2 px-4">{instalment.date}</td>
                                        <td className="py-2 px-4">PKR {instalment.amount}</td>
                                        <td className="py-2 px-4">{instalment.status || 'Paid'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Signatures Section */}
                    <div className="mt-16">
                        <div className="grid grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="border-t-2 border-gray-400 pt-2">
                                    <p className="font-semibold">Allottee Signature</p>
                                    <p className="text-sm text-gray-600">Date: ____________</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="border-t-2 border-gray-400 pt-2">
                                    <p className="font-semibold">Next of Kin Signature</p>
                                    <p className="text-sm text-gray-600">Date: ____________</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="border-t-2 border-gray-400 pt-2">
                                    <p className="font-semibold">Authorized Signature</p>
                                    <p className="text-sm text-gray-600">Company Seal</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 text-center text-sm text-gray-600 border-t pt-4">
                        <p>This is a computer-generated document. No signature is required.</p>
                        <p>For any queries, please contact: support@example.com</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* Navigation Bar */}
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
                                    to="/admin/total-booked-plots"
                                    className="text-white hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                                >
                                    <FaHome className="mr-2" />
                                    Home
                                </Link>
                                <Link
                                    to="/"
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

            <div className="p-4 sm:p-6">
                {/* Filters */}
                <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:flex-wrap lg:flex-nowrap">
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

                    {/* Start Date */}
                    <div className="w-full sm:w-auto">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !startDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? format(startDate, "PPP") : <span>Start Date</span>}
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
                    </div>

                    {/* End Date */}
                    <div className="w-full sm:w-auto">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !endDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {endDate ? format(endDate, "PPP") : <span>End Date</span>}
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
                    </div>

                    {/* Search */}
                    <div className="w-full sm:w-auto lg:ml-auto">
                        <input
                            type="search"
                            placeholder="Search plots..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border rounded px-3 py-1"
                        />
                    </div>
                </div>

                {/* Updated Table with Expandable Details */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[600px]">
                        <thead>
                            <tr className="text-center bg-gray-50">
                                <th className="py-2 px-4 font-semibold">Date</th>
                                <th className="py-2 px-4 font-semibold">Plot ID</th>
                                <th className="py-2 px-4 font-semibold">Name</th>
                                <th className="py-2 px-4 font-semibold">Category</th>
                                <th className="py-2 px-4 font-semibold">Status</th>
                                <th className="py-2 px-4 font-semibold">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlots.map((plot, index) => (
                                <React.Fragment key={index}>
                                    <tr className="border-t hover:bg-gray-50">
                                        <td className="py-3 px-4">{format(new Date(plot.date), "MM/dd")}</td>
                                        <td className="px-4">{plot.plotId}</td>
                                        <td className="px-4">{plot.name}</td>
                                        <td className="px-4">{plot.category}</td>
                                        <td className="px-4">{plot.status}</td>
                                        <td className="px-4">
                                            <button
                                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition-colors"
                                                onClick={() => toggleDetails(plot.plotId)}
                                            >
                                                Show Details
                                            </button>
                                        </td>
                                    </tr>
                                    {expandedPlotId === plot.plotId && plot.details && (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-4">
                                                <div className="bg-gray-50 p-6 rounded-lg relative">
                                                    {/* Two identical sections side by side */}
                                                    <div className="grid grid-cols-2 gap-x-8">
                                                        {/* Left Section */}
                                                        <div className="space-y-2">
                                                            <p className="text-sm">Booked by: {plot.details.bookedBy}</p>
                                                            <p className="text-sm">Owner 1: {plot.details.owner}</p>
                                                            <p className="text-sm">Contact: {plot.details.contact}</p>
                                                            <p className="text-sm">Address: {plot.details.address}</p>
                                                            <p className="text-sm">CNIC No: {plot.details.cnic}</p>
                                                            <p className="text-sm">Sub-category: {plot.details.subcategoryDetail}</p>
                                                            <p className="text-sm">Number of Instalments: {plot.details.numberOfInstalments}</p>
                                                            <p className="text-sm">Paid Instalments: {plot.details.paidInstalments}</p>
                                                            <p className="text-sm">Total Amount: {plot.details.totalAmount}</p>
                                                            <p className="text-sm">Total Amount Paid: {plot.details.totalAmountPaid}</p>
                                                            <p className="text-sm">Down Payment: {plot.details.downPayment}</p>
                                                            <p className="text-sm">Remaining Amount: {plot.details.remainingAmount}</p>

                                                            <div className="flex justify-center gap-8 mt-4">
                                                                <div className="text-center">
                                                                    <img
                                                                        src="https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg" //src={plot.details.allotteeImage} 
                                                                        alt="Allottee"
                                                                        className="w-24 h-24 object-cover mb-2"
                                                                    />
                                                                    <p className="text-sm">Alottee</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <img
                                                                        src="https://img.freepik.com/free-photo/portrait-optimistic-businessman-formalwear_1262-3600.jpg" // src={plot.details.nextToKinImage} 
                                                                        alt="Next to Kin"
                                                                        className="w-24 h-24 object-cover mb-2"
                                                                    />
                                                                    <p className="text-sm">Next to Kin</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Right Section (identical to left) */}
                                                        <div className="space-y-2">
                                                            <p className="text-sm">Booked by: {plot.details.bookedBy}</p>
                                                            <p className="text-sm">Owner 1: {plot.details.owner}</p>
                                                            <p className="text-sm">Contact: {plot.details.contact}</p>
                                                            <p className="text-sm">Address: {plot.details.address}</p>
                                                            <p className="text-sm">CNIC No: {plot.details.cnic}</p>
                                                            <p className="text-sm">Sub-category: {plot.details.subcategoryDetail}</p>
                                                            <p className="text-sm">Number of Instalments: {plot.details.numberOfInstalments}</p>
                                                            <p className="text-sm">Paid Instalments: {plot.details.paidInstalments}</p>
                                                            <p className="text-sm">Total Amount: {plot.details.totalAmount}</p>
                                                            <p className="text-sm">Total Amount Paid: {plot.details.totalAmountPaid}</p>
                                                            <p className="text-sm">Down Payment: {plot.details.downPayment}</p>
                                                            <p className="text-sm">Remaining Amount: {plot.details.remainingAmount}</p>

                                                            <div className="flex justify-center gap-8 mt-4">
                                                                <div className="text-center">
                                                                    <img
                                                                        src="https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg" //src={plot.details.allotteeImage} 
                                                                        alt="Allottee"
                                                                        className="w-24 h-24 object-cover mb-2"
                                                                    />
                                                                    <p className="text-sm">Alottee</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <img
                                                                        src="https://img.freepik.com/free-photo/portrait-optimistic-businessman-formalwear_1262-3600.jpg" // src={plot.details.nextToKinImage} 
                                                                        alt="Next to Kin"
                                                                        className="w-24 h-24 object-cover mb-2"
                                                                    />
                                                                    <p className="text-sm">Next to Kin</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Instalment History Section Below */}
                                                    <div className="mt-6 border-t pt-4">
                                                        <h3 className="font-semibold mb-4 text-sm">Instalment History</h3>
                                                        <div className="space-y-2">
                                                            {plot.details.instalmentHistory.map((instalment, index) => (
                                                                <p key={index} className="text-sm">
                                                                    {index + 1}. {instalment.amount} - Date: {instalment.date}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Print Button */}
                                                    <div className="absolute top-4 right-4">
                                                        <button
                                                            onClick={() => handlePrint(plot)}
                                                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white px-3 py-1 rounded shadow"
                                                        >
                                                            <span className="text-sm">Print</span>
                                                            <svg
                                                                className="w-5 h-5"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
                        <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                        <span className="text-sm">Found 4 items out of 4</span>
                        <button
                            className="text-red-500 hover:text-red-600"
                            onClick={() => {/* Handle clear filters */ }}
                        >
                            Clear filters
                        </button>
                    </div>
                </div>

                {/* Back to Dashboard Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                        onClick={() => navigate('/admin/dashboard')}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <Dialog open={showPrintDialog} onOpenChange={setShowPrintDialog}>
                <DialogContent className="max-w-6xl w-full" >
                    {selectedPlotDetails && <PrintableForm plot={selectedPlotDetails} />}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TotalBookedPlots;
