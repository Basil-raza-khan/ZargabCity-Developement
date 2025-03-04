import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import NavBar from '../NavBar';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import AnimatedComponent from '../animations/AnimatedComponent';

const ExpenseManager = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      date: '01/2024',
      particulars: 'Office Rent',
      amount: 25000
    },
    {
      id: 2, 
      date: '01/2024',
      particulars: 'Electricity Bill',
      amount: 5000
    },
    {
      id: 3,
      date: '01/2024', 
      particulars: 'Internet Bill',
      amount: 2000
    },
    {
      id: 4,
      date: '01/2024',
      particulars: 'Office Supplies',
      amount: 3500
    }
  ]);
  const [newExpense, setNewExpense] = useState({
    date: new Date(),
    particulars: '',
    amount: ''
  });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [editingId, setEditingId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editExpense, setEditExpense] = useState(null);

  // Add new expense
  const handleAddExpense = () => {
    if (newExpense.particulars && newExpense.amount) {
      const expense = {
        id: Date.now(),
        date: format(newExpense.date, 'MM/yyyy'),
        particulars: newExpense.particulars,
        amount: parseFloat(newExpense.amount)
      };
      setExpenses([...expenses, expense]);
      setNewExpense({ date: new Date(), particulars: '', amount: '' });
      toast.success("Expense added successfully!", {
        style: { backgroundColor: "#D1E7DD", color: "#0F5132" },
      });
    } else {
      toast.error("Please fill in all expense details", {
        style: { backgroundColor: "#F8D7DA", color: "#842029" },
      });
    }
  };

  // Delete expense
  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    toast.success("Expense deleted successfully!", {
      style: { backgroundColor: "#D1E7DD", color: "#0F5132" },
    });
  };

  // Edit expense
  const handleEditExpense = (expense) => {
    // Convert MM/yyyy string to Date object
    const [month, year] = expense.date.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    
    setEditExpense({
      ...expense,
      date: date
    });
    setEditDialogOpen(true);
  };

  // Update expense
  const handleUpdateExpense = () => {
    setExpenses(expenses.map(expense => 
      expense.id === editExpense.id ? 
      { 
        ...expense,
        date: format(editExpense.date, 'MM/yyyy'),
        particulars: editExpense.particulars,
        amount: parseFloat(editExpense.amount)
      } : expense
    ));
    setEditDialogOpen(false);
    setEditExpense(null);
    toast.success("Expense updated successfully!", {
      style: { backgroundColor: "#D1E7DD", color: "#0F5132" },
    });
  };

  // Filter expenses based on date range
  useEffect(() => {
    if (startDate && endDate) {
      const filtered = expenses.filter(expense => {
        const [month, year] = expense.date.split('/');
        const expenseDate = new Date(parseInt(year), parseInt(month) - 1);
        return expenseDate >= startDate && expenseDate <= endDate;
      });
      setFilteredExpenses(filtered);
    } else {
      setFilteredExpenses(expenses);
    }
  }, [expenses, startDate, endDate]);

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Date', 'Particulars', 'Amount'],
      ...filteredExpenses.map(expense => [
        expense.date,
        expense.particulars,
        expense.amount
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <NavBar />
      
      <AnimatedComponent>
        <div className="container mx-auto px-4 pt-20 max-w-5xl">
          <h1 className="text-3xl font-bold text-center mb-8">Expense Manager</h1>

          {/* Add Expense Form */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newExpense.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newExpense.date ? format(newExpense.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newExpense.date}
                    onSelect={(date) => setNewExpense({ ...newExpense, date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <input
                type="text"
                placeholder="Particulars"
                value={newExpense.particulars}
                onChange={(e) => setNewExpense({ ...newExpense, particulars: e.target.value })}
                className="w-full p-2 border rounded"
              />

              <input
                type="number"
                placeholder="Amount"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <Button
              onClick={handleAddExpense}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white"
            >
              Add Expense
            </Button>
          </div>

          {/* Filter Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
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
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
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
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
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
            </div>
          </div>

          {/* Edit Expense Dialog */}
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Expense</DialogTitle>
              </DialogHeader>
              {editExpense && (
                <div className="grid gap-4 py-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !editExpense.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editExpense.date ? format(editExpense.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={editExpense.date}
                        onSelect={(date) => setEditExpense({ ...editExpense, date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <input
                    type="text"
                    placeholder="Particulars"
                    value={editExpense.particulars}
                    onChange={(e) => setEditExpense({ ...editExpense, particulars: e.target.value })}
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="number"
                    placeholder="Amount"
                    value={editExpense.amount}
                    onChange={(e) => setEditExpense({ ...editExpense, amount: e.target.value })}
                    className="w-full p-2 border rounded"
                  />

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-red-600 hover:bg-red-700 text-white">Save Changes</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-red-50">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will update the expense details. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleUpdateExpense}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Expenses Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Expenses List</h2>
              <Button
                onClick={exportToCSV}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Export as CSV
              </Button>
            </div>

            <div className="overflow-x-auto ">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">Particulars</th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {filteredExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{expense.date}</td>
                      <td className="px-6 py-4">{expense.particulars}</td>
                      <td className="px-6 py-4">{expense.amount.toLocaleString()} Rs</td>
                      <td className="px-6 py-4 flex justify-center items-center">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            onClick={() => handleEditExpense(expense)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className="bg-red-600 hover:bg-red-700 text-white">
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-red-50">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete this expense. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteExpense(expense.id)}>
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AnimatedComponent>
    </div>
  );
};

export default ExpenseManager;
