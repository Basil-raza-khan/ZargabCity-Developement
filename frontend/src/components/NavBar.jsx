import React, { useState } from 'react'
import { Button } from "@/components/ui/button"

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white w-full">
      <div className="container mx-auto px-4">
        <nav className="w-full bg-black border-b border-gray-800 fixed top-0 left-0 right-0">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-24">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img 
                  src="/MainLogo.svg" 
                  alt="Main Logo" 
                  className="h-40 w-auto md:h-40 mt-3"
                />
                {/* Replace this with image once you have the SVG file */}
              </div>

              {/* Navigation Buttons */}
              <div className="hidden md:flex items-center space-x-6">
                {/* Property Buttons with Black Background */}
                <Button className="bg-black text-white hover:bg-gray-800 text-sm">
                  Buy Property
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800 text-sm">
                  Manage Property
                </Button>
                
                {/* Navigation Buttons with Red Background */}
                <Button className="bg-red-600 text-white hover:bg-red-700 text-sm">
                  Log in as Admin
                </Button>
                <Button className="bg-red-600 text-white hover:bg-red-700 text-sm">
                  Log in as User
                </Button>
                <Button className="bg-red-600 text-white hover:bg-red-700 text-sm">
                  Expense Manager
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800" onClick={toggleMenu}>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMenuOpen ? (
                      // X icon when menu is open
                      <path d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      // Hamburger icon when menu is closed
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </Button>
              </div>
            </div>

            {/* Mobile menu, show/hide based on menu state */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Property Buttons in Mobile Menu */}
                <Button
                  className="block w-full text-center text-white bg-black hover:bg-gray-800 text-sm"
                >
                  Buy Property
                </Button>
                <Button
                  className="block w-full text-center text-white bg-black hover:bg-gray-800 text-sm"
                >
                  Manage Property
                </Button>
                
                {/* Navigation Buttons in Mobile Menu */}
                <Button
                  className="block w-full text-center text-white bg-red-600 hover:bg-red-700 text-sm"
                >
                  Log in as Admin
                </Button>
                <Button
                  className="block w-full text-center text-white bg-red-600 hover:bg-red-700 text-sm"
                >
                  Log in as User
                </Button>
                <Button
                  className="block w-full text-center text-white bg-red-600 hover:bg-red-700 text-sm"
                >
                  Expense Manager
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default NavBar
