import React, { useEffect, useContext } from 'react';
import { 
  ShoppingCart, Eye, Plus, Users, Calendar, MapPin, Phone, Mail,
  Star, CheckCircle, ArrowRight, Activity
} from 'lucide-react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CompanyHome = () => {
  const { auth, hasCart, setHasCart } = useContext(AuthContext); 
  const user = auth?.user;

  const companyData = {
    name: "BuildMaster Construction Ltd.",
    logo: "🏗️",
    established: "2015",
    location: "New York, NY",
    phone: "+1 (555) 123-4567",
    email: "info@buildmaster.com",
    employees: "150+",
    projectsCompleted: "500+",
    rating: 4.9
  };

  const checkCart = async () => {
    if (!user?.companyId) {
      setHasCart(false); 
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/companycarts/company/${user.companyId}`);
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        setHasCart(true);
      } else {
        setHasCart(false);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) setHasCart(false);
      else console.error("Error checking cart:", err);
    }
  };

  useEffect(() => {
    checkCart();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-ping"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-4xl mb-4 animate-bounce">
            🏗️
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
            BuildAura
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Complete Construction Site Management Solution
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
            <span className="text-white ml-2 font-semibold">Trusted by 1000+ Companies</span>
          </div>
        </header>

        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{companyData.logo}</div>
              <h2 className="text-4xl font-bold text-white mb-2">{companyData.name}</h2>
              <div className="flex items-center justify-center space-x-2 text-yellow-400 mb-4">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-xl font-semibold">{companyData.rating}</span>
                <span className="text-white/80">Company Rating</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 text-center border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105">
                <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">Est. {companyData.established}</div>
                <div className="text-blue-200 text-sm">Years of Excellence</div>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 text-center border border-green-400/30 hover:border-green-400/60 transition-all duration-300 hover:scale-105">
                <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{companyData.employees}</div>
                <div className="text-green-200 text-sm">Team Members</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 text-center border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 hover:scale-105">
                <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{companyData.projectsCompleted}</div>
                <div className="text-purple-200 text-sm">Projects Completed</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 text-center border border-orange-400/30 hover:border-orange-400/60 transition-all duration-300 hover:scale-105">
                <Activity className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">Active</div>
                <div className="text-orange-200 text-sm">Status</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3 text-white/90 hover:text-white transition-colors duration-300">
                <MapPin className="w-6 h-6 text-blue-400" />
                <span className="text-lg">{companyData.location}</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/90 hover:text-white transition-colors duration-300">
                <Phone className="w-6 h-6 text-green-400" />
                <span className="text-lg">{companyData.phone}</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/90 hover:text-white transition-colors duration-300">
                <Mail className="w-6 h-6 text-purple-400" />
                <span className="text-lg">{companyData.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-orange-600/20 via-red-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-12 border border-orange-400/30 shadow-2xl">
            <div className="mb-8">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <ShoppingCart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">
                {hasCart ? "Cart Management" : "Start Your Journey"}
              </h3>
              <p className="text-xl text-orange-200 mb-8 leading-relaxed">
                {hasCart 
                  ? "Your cart has been created successfully! View and manage your cart and do changes."
                  : "Create your company cart and showcase your construction expertise with BuildAura, connect with clients, highlight your services, and grow your business."
                }
              </p>
            </div>

            <Link
              to="/companycart"
              className={`group relative inline-block font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 ${
                hasCart
                  ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white focus:ring-blue-300/50"
                  : "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white focus:ring-orange-300/50"
              }`}
            >
              <div className="flex items-center justify-center space-x-3">
                {hasCart ? (
                  <>
                    <Eye className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    <span>View Your Cart</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create Your Company Cart</span>
                  </>
                )}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>

            <div className="mt-8 text-center">
              <p className="text-white/70 text-sm">
                💡 One cart per company • Secure & Reliable • 24/7 Support
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHome;
