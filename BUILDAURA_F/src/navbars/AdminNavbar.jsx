import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';
import { UserCircle2 } from 'lucide-react';

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    navigate('/');
  };

  const links = [
    // { name: 'Dashboard', to: '/admin/dash' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-16 w-16 object-contain" />
          <span className="text-xl font-bold text-orange-600">BuilAura</span>
        </div>

        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.to}
                className={`hover:text-orange-600 transition-colors duration-200 ${
                  location.pathname === link.to ? 'text-orange-600 font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center space-x-3 relative">
          {auth?.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 hover:bg-gray-100 rounded-full px-2 py-1"
              >
                <UserCircle2 className="w-8 h-8 text-orange-600" />
                <span className="font-medium text-gray-700">{auth.user?.firstName || 'Admin'}</span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
                  <button
                    onClick={() => navigate('/admin/settings')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>

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

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 py-2 space-y-2 bg-gray-50">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className={`block px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-white rounded transition-colors duration-200 ${
                location.pathname === link.to ? 'text-orange-600 font-semibold' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {auth?.isLoggedIn && (
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => navigate('/admin/settings')}
                className="w-full text-left px-4 py-2 bg-white rounded hover:bg-gray-100"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 bg-white rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
