import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Car, Phone, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="w-7 h-7 text-white" />
              <h3 className="text-2xl font-bold">RentalX</h3>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              Your trusted car rental service. Reliable, affordable, and
              convenient rentals — from economy cars to luxury rides.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="block text-blue-100 hover:text-white text-sm transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/vehicles" 
                  className="block text-blue-100 hover:text-white text-sm transition-colors"
                >
                  Our Vehicles
                </Link>
              </li>
              <li>
                <Link 
                  href="/booking" 
                  className="block text-blue-100 hover:text-white text-sm transition-colors"
                >
                  Book Now
                </Link>
              </li>
              <li>
                <Link 
                  href="/history" 
                  className="block text-blue-100 hover:text-white text-sm transition-colors"
                >
                  Rental Favorite
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="block text-blue-100 hover:text-white text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-blue-100">
                <Phone className="w-4 h-4" />
                <span>(647) 512-2106</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-100">
                <Mail className="w-4 h-4" />
                <span>iqbal.mashal077@gmail.com</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Connect with the Developer</p>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/IqbalMashal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 bg-white text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/iqbalmashal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 bg-white text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-600 pt-6 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <p className="text-sm text-blue-200">
              © 2025 RentWheels. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
