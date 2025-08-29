"use client"

import React, { useState, useEffect } from 'react'
import { LogOut, UserRound, ChevronDown } from 'lucide-react'

function NavBar() {
  const [token, setToken] = useState(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  // Mock authentication functions - replace with your actual implementation
  const readToken = () => {
    try {
      const token = localStorage.getItem('authToken')
      return token ? JSON.parse(token) : null
    } catch {
      return null
    }
  }

  const removeToken = async () => {
    localStorage.removeItem('authToken')
    return Promise.resolve()
  }

  useEffect(() => {
    checkAuthStatus()
    
    const handleStorageChange = () => {
      checkAuthStatus()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('authStatusChanged', checkAuthStatus)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authStatusChanged', checkAuthStatus)
    }
  }, [])

  const checkAuthStatus = () => {
    try {
      const currentToken = readToken()
      setToken(currentToken)
    } catch (error) {
      console.error('Error checking auth status:', error)
      setToken(null)
    }
  }
  
  const logout = async () => {
    try {
      await removeToken()
      setToken(null)
      setUserDropdownOpen(false)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <a href="/" className="flex-shrink-0">
            <img
              src="/logo1.png"
              alt="Logo"
              width="80"
              height="32"
              className="hover:opacity-80 transition-opacity"
            />
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "History", "Contact Us"].map((item, index) => (
              <a 
                key={index} 
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s/g, "")}`}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {!token ? (
              <>
                <a
                  href="/register"
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Sign Up
                </a>
                <a 
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </a>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    <UserRound className="w-4 h-4" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-700 max-w-32 truncate">
                      {token.userName}
                    </p>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      userDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {userDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-10"
                      onClick={() => setUserDropdownOpen(false)}
                    />
                    
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                      <div className="py-1">
                        <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                          Signed in as
                          <div className="font-medium text-gray-900 truncate mt-1">
                            {token.userName}
                          </div>
                        </div>
                        <a
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          My Profile
                        </a>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center transition-colors border-t border-gray-100"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar