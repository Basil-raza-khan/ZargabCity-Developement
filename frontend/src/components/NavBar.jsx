import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  
  // Add check for expense manager dashboard
  const isExpenseManagerDashboard = location.pathname === '/expense-manager/dashboard'

  // Add authType to URL check
  const isAuthPage = (type) => {
    return [
      `/auth/${type}/login`,
      `/auth/${type}/forgot-password`,
      `/auth/${type}/reset-password`
    ].includes(location.pathname)
  }

  const isPasswordResetPage = (type) => {
    return [
      `/auth/${type}/forgot-password`,
      `/auth/${type}/reset-password`
    ].includes(location.pathname)
  }

  const isAnyAuthPage = isAuthPage('admin') || isAuthPage('expense')
  const isAdminAuthPage = isAuthPage('admin')
  const isExpenseAuthPage = isAuthPage('expense')
  const isAnyPasswordResetPage = isPasswordResetPage('admin') || isPasswordResetPage('expense')

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="container mx-auto px-4">
        <nav className="w-full bg-black border-b border-gray-800 fixed top-0 left-0 right-0">
          <div className="max-w-[1400px] mx-auto px-8 lg:px-24">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="/">
                  <img 
                    src="/MainLogo.svg" 
                    alt="Main Logo" 
                    className="h-40 w-auto md:h-40 mt-3"
                  />
                </Link>
              </div>

              {/* Navigation Buttons */}
              <div className="hidden md:flex items-center space-x-6">
                {/* Property Buttons with Black Background */}
                {!isAnyAuthPage && (
                  <>
                    <Button className="bg-black text-white hover:bg-gray-800 text-sm">
                      Buy Property
                    </Button>
                    <Button className="bg-black text-white hover:bg-gray-800 text-sm">
                      Manage Property
                    </Button>
                  </>
                )}
                
                {/* Auth Navigation Buttons */}
                {isAnyPasswordResetPage ? (
                  <Link to="/auth/user/login">
                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                      Log in as User
                    </Button>
                  </Link>
                ) : isAdminAuthPage ? (
                  <>
                    <Link to="/auth/user/login">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Log in as User
                      </Button>
                    </Link>
                    <Link to="/auth/expense/login">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Expense Manager
                      </Button>
                    </Link>
                  </>
                ) : isExpenseAuthPage ? (
                  <>
                    <Link to="/auth/user/login">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Log in as User
                      </Button>
                    </Link>
                    <Link to="/auth/admin/login">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Log in as Admin
                      </Button>
                    </Link>
                  </>
                ) : !isAnyAuthPage && (
                  <>
                    <Link to="/auth/admin/login">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        Log in as Admin
                      </Button>
                    </Link>
                    {!isExpenseManagerDashboard && (
                      <Link to="/auth/expense/login">
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                          Expense Manager
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800" onClick={toggleMenu}>
                  <svg
                    className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg
                    className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
              <div className="px-2 pt-2 pb-3 space-y-3">
                {/* Property Buttons in Mobile Menu */}
                {!isAnyAuthPage && (
                  <>
                    <Button
                      className="block w-full text-center text-white bg-black hover:bg-gray-800 text-sm mb-2"
                    >
                      Buy Property
                    </Button>
                    <Button
                      className="block w-full text-center text-white bg-black hover:bg-gray-800 text-sm mb-2"
                    >
                      Manage Property
                    </Button>
                  </>
                )}
                
                {/* Auth Navigation Buttons in Mobile Menu */}
                {isAnyPasswordResetPage ? (
                  <Link to="/auth/user/login">
                    <Button className="block w-full text-center text-white bg-red-600 hover:bg-red-700 text-sm">
                      Log in as User
                    </Button>
                  </Link>
                ) : isAdminAuthPage ? (
                  <>
                    <Link to="/auth/user/login">
                      <Button className="block w-full text-center text-white bg-red-600 hover:bg-red-700 text-sm mb-2">
                        Log in as User
                      </Button>
                    </Link>
                    <Link to="/auth/expense/login" className="block mb-2">
                      <Button className="w-full text-center text-white bg-red-600 hover:bg-red-700 text-sm">
                        Expense Manager
                      </Button>
                    </Link>
                  </>
                ) : isExpenseAuthPage ? (
                  <>
                    <Link to="/auth/user/login">
                      <Button className="block w-full text-center text-white bg-red-600 hover:bg-red-700 text-sm mb-2">
                        Log in as User
                      </Button>
                    </Link>
                    <Link to="/auth/admin/login" className="block mb-2">
                      <Button className="w-full text-center text-white bg-red-600 hover:bg-red-700 text-sm">
                        Log in as Admin
                      </Button>
                    </Link>
                  </>
                ) : !isAnyAuthPage && (
                  <>
                    <Link to="/auth/admin/login" className="block mb-2">
                      <Button className="w-full text-center text-white bg-red-600 hover:bg-red-700 text-sm">
                        Log in as Admin
                      </Button>
                    </Link>
                    {!isExpenseManagerDashboard && (
                      <Link to="/auth/expense/login" className="block mb-2">
                        <Button className="w-full text-center text-white bg-red-600 hover:bg-red-700 text-sm">
                          Expense Manager
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default NavBar