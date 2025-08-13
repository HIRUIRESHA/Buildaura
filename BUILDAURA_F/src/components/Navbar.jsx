import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthButtons, setShowAuthButtons] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAuthButtons = () => {
    setShowAuthButtons(!showAuthButtons);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-15 w-15 object-contain" />
          <span className="text-xl font-bold text-orange-600">BuilAura</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-orange-600 transition-colors duration-200">Home</Link></li>
          <li><Link to="/about" className="hover:text-orange-600 transition-colors duration-200">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-orange-600 transition-colors duration-200">Contact Us</Link></li>
          <li><Link to="/companies" className="hover:text-orange-600 transition-colors duration-200">Companies</Link></li>
        </ul>

        {/* Desktop Buttons Row: Get Started + Login + Sign Up */}
        <div className="hidden md:flex items-center space-x-3">
          <button 
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition-colors duration-200"
            onClick={toggleAuthButtons}
          >
            Get Started
          </button>

          {showAuthButtons && (
            <>
              <Link to="/login" className="bg-white border border-orange-600 text-orange-600 px-4 py-2 rounded hover:bg-orange-50 transition">
                Login
              </Link>
              <Link to="/signup" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-orange-600 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 py-2 space-y-2 bg-gray-50">
          <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-white rounded transition-colors duration-200">Home</Link>
          <Link to="/companies" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-white rounded transition-colors duration-200">Companies</Link>
          <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-white rounded transition-colors duration-200">About Us</Link>
          <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-white rounded transition-colors duration-200">Contact Us</Link>

          {/* Mobile Get Started Button + Login/Signup in Column */}
          <button 
            className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition-colors duration-200"
            onClick={toggleAuthButtons}
          >
            Get Started
          </button>

          {showAuthButtons && (
            <div className="flex flex-col gap-2 mt-2">
              <Link to="/login" className="bg-white border border-orange-600 text-orange-600 text-center px-4 py-2 rounded hover:bg-orange-50 transition">
                Login
              </Link>
              <Link to="/signup" className="bg-orange-600 text-white text-center px-4 py-2 rounded hover:bg-orange-700 transition">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
