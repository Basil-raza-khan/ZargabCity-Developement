import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { PiCellSignalFull } from "react-icons/pi";

const InventoryManagement = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
    }
    // Sample inventory data - replace with your actual data fetching logic
    const [inventory, setInventory] = useState([
        { id: 1, name: 'Product 1', quantity: 10, price: 99.99, category: 'Electronics' },
        { id: 2, name: 'Product 2', quantity: 15, price: 49.99, category: 'Clothing' },
        { id: 3, name: 'Product 3', quantity: 15, price: 49.99, category: 'Clothing' },
        { id: 4, name: 'Product 4', quantity: 15, price: 49.99, category: 'Clothing' },
        { id: 5, name: 'Product 5', quantity: 15, price: 49.99, category: 'Clothing' },


    ])

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [currentItem, setCurrentItem] = useState(null)
    const [newItem, setNewItem] = useState({
        name: '',
        quantity: '',
        price: '',
        category: ''
    })

    const handleAdd = () => {
        const item = {
            id: inventory.length + 1,
            ...newItem
        }
        setInventory([...inventory, item])
        setNewItem({ name: '', quantity: '', price: '', category: '' })
        setIsAddDialogOpen(false)
    }

    const handleEdit = () => {
        setInventory(inventory.map(item =>
            item.id === currentItem.id ? currentItem : item
        ))
        setIsEditDialogOpen(false)
    }

    const handleDelete = (id) => {
        setInventory(inventory.filter(item => item.id !== id))
    }

    return (
        <div className="p-4">
            {/* Navbar */}
            <nav className="bg-black rounded-lg shadow-lg mb-7">
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

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-left">Inventory Management</h1>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>Add New Item</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Inventory Item</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 items-center justify-center">
                            <div className="grid grid-cols-4 items-center justify-center gap-4">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    className="col-span-3"
                                    value={newItem.quantity}
                                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    className="col-span-3"
                                    value={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    className="col-span-3"
                                    value={newItem.category}
                                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                />
                            </div>
                        </div>
                        <Button onClick={handleAdd}>Add Item</Button>
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader className="text-center text-lg font-semibold">
                    <TableRow >
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center" >Quantity</TableHead>
                        <TableHead className="text-center">Price</TableHead>
                        <TableHead className="text-center">Category</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {inventory.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>${item.price}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>
                                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="mr-2"
                                            onClick={() => setCurrentItem(item)}
                                        >
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Inventory Item</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="edit-name">Name</Label>
                                                <Input
                                                    id="edit-name"
                                                    className="col-span-3"
                                                    value={currentItem?.name}
                                                    onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="edit-quantity">Quantity</Label>
                                                <Input
                                                    id="edit-quantity"
                                                    type="number"
                                                    className="col-span-3"
                                                    value={currentItem?.quantity}
                                                    onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="edit-price">Price</Label>
                                                <Input
                                                    id="edit-price"
                                                    type="number"
                                                    className="col-span-3"
                                                    value={currentItem?.price}
                                                    onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="edit-category">Category</Label>
                                                <Input
                                                    id="edit-category"
                                                    className="col-span-3"
                                                    value={currentItem?.category}
                                                    onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <Button onClick={handleEdit}>Save Changes</Button>
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default InventoryManagement