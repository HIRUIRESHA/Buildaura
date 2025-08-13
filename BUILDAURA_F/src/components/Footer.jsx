import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BA</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  BuildAura
                </h3>
                <p className="text-sm text-slate-400">Aura Builder Group</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              Crafted by Aura Builder Group — Your trusted partner in smart, seamless, and 
              efficient construction project management solutions.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-700 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-700 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-slate-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              Useful Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Project Guidelines for New Clients
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Construction Workflow Overview
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Submit a New Project
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Billing & Invoicing Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white relative">
              Contact Us
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Address: No. 123, Builder Street, Colombo, Sri Lanka
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-green-400 flex-shrink-0" />
                <a 
                  href="tel:+94712643536" 
                  className="text-slate-300 hover:text-green-400 transition-colors duration-200 text-sm"
                >
                  Phone: +7 (212) 64-33-36
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-purple-400 flex-shrink-0" />
                <a 
                  href="mailto:info@buildaura.com" 
                  className="text-slate-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                >
                  Email: info@buildaura.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © 2025 BuildAura by Aura Builder Group. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
