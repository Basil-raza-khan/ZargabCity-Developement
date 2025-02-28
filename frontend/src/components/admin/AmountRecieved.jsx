import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import Navbar from "../user/Navbar";
import AnimatedComponent from "../animations/AnimatedComponent";
const AmountReceived = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [allData, setAllData] = useState([
    {
      date: "2023-10-01",
      particulars: "R101", 
      name: "John Doe",
      contact: "123-456-7890",
      amount: 1000,
      employee: "Employee A"
    },
    {
        date: "2023-10-01",
        particulars: "C101", 
        name: "John Doe",
        contact: "123-456-7890",
        amount: 2000,
        employee: "Employee A"
      },
    {
      date: "2023-10-02",
      particulars: "R101",
      name: "Jane Smith", 
      contact: "987-654-3210",
      amount: 1500,
      employee: "Employee B"
    }
  ]);
  const [filteredData, setFilteredData] = useState(allData);

  useEffect(() => {
    let filtered = [...allData];
    
    if (startDate && endDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    setFilteredData(filtered);
  }, [startDate, endDate, allData]);

  const handleExportCSV = () => {
    const headers = ["Date", "Particulars", "Name", "Contact No", "Amount", "Employee"];
    const csvData = filteredData.map(row => 
      [row.date, row.particulars, row.name, row.contact, row.amount, row.employee]
    );
    
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'amount_received.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateTotal = () => {
    return filteredData.reduce((sum, row) => sum + row.amount, 0);
  };

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredData(allData);
  };

  return (
    <div className="min-h-screen ">
      <Navbar />
      <AnimatedComponent>
      <div className="container mx-auto px-4 py-8 mt-10 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Total Amount Received</h1>
        
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Start Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
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
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>End Date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Particulars</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.particulars}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${row.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{row.employee}</td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td colSpan="4" className="px-6 py-4 font-medium">Total:</td>
                <td className="px-6 py-4 font-medium">${calculateTotal()}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleExportCSV} className="bg-red-500 hover:bg-red-600 text-white">
            Export as CSV
          </Button>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            <Button variant="outline">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
          <div className="flex items-center gap-2">
            <span>Found {filteredData.length} items out of {allData.length}</span>
            <Button variant="link" className="text-red-500" onClick={clearFilters}>Clear Filters</Button>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="default" className="bg-black text-white">
            Back to Dashboard
          </Button>
        </div>
      </div>
      </AnimatedComponent>
    </div>
  );
};

export default AmountReceived;
