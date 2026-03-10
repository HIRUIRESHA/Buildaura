import { useState, useEffect, useContext } from 'react';
import { Users, Award, Shield, HardHat, Hammer, Truck, Target, ChevronRight, Star } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link } from "react-router-dom";

export default function ClientHome() {
  const { auth } = useContext(AuthContext); 
  const clientName = auth?.user?.firstName || 'Client';

  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-12 relative">
            <div className="absolute -inset-4 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative">
              <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-700 to-slate-800 mb-4 tracking-tight">
                BuildAura
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 text-slate-400 fill-current" />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-gray-600 font-light tracking-wide">
                Your Premium Construction Management Partner
              </p>
            </div>
          </div>

          <div className="mb-16 relative ">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-2xl blur-xl opacity-20 transform rotate-1"></div>
                 <div className="relative bg-white rounded-2xl px-8 py-6 shadow-lg border border-gray-100 backdrop-blur-sm flex items-center justify-between w-full">

              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-50 px-3 py-1.5 rounded-full">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-medium text-sm">System Online</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-full">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-700 font-medium text-sm">Projects Ready</span>
                </div>
              </div>

              <Link
                to="/projectcart" 
                className="ml-6 group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-20 max-w-6xl mx-auto">
            {[
              { icon: Hammer, title: "Project Management", desc: "Organize tasks & teams with precision", gradient: "from-blue-500 to-purple-500" },
              { icon: Truck, title: "Material Tracking", desc: "Monitor resources & deliveries in real-time", gradient: "from-green-500 to-teal-500" },
              { icon: Users, title: "Team Collaboration", desc: "Seamlessly assign & track workers", gradient: "from-purple-500 to-pink-500" },
              { icon: Shield, title: "Safety Compliance", desc: "Ensure construction safety standards", gradient: "from-red-500 to-orange-500" }
            ].map((feature, index) => (
              <div key={index} className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="relative mb-6 w-fit mx-auto">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                    <div className={`relative bg-gradient-to-br ${feature.gradient} p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <feature.icon className="w-8 h-8 text-white drop-shadow-sm" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="absolute inset-0 bg-white opacity-80"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Trusted by Construction Leaders
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-light">
              Join thousands of successful construction professionals who rely on BuildAura
            </p>
            <div className="flex justify-center">
              <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-full shadow-lg"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "120+", label: "Active Projects", icon: Target, color: "from-blue-500 to-purple-500" },
              { number: "99%", label: "Safety Compliance", icon: Shield, color: "from-green-500 to-emerald-500" },
              { number: "24/7", label: "On-Site Support", icon: Users, color: "from-purple-500 to-pink-500" },
              { number: "15+", label: "Awards Won", icon: Award, color: "from-yellow-500 to-orange-500" }
            ].map((stat, index) => (
              <div key={index} className="group relative bg-white rounded-3xl p-10 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className="relative mb-6 w-fit mx-auto">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                    <div className={`relative bg-gradient-to-br ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <stat.icon className="w-8 h-8 text-white drop-shadow-sm" />
                    </div>
                  </div>
                  <div className="text-4xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform">{stat.number}</div>
                  <div className="text-gray-600 group-hover:text-gray-700 font-medium transition-colors">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Construction Management?</h3>
          <p className="text-lg text-gray-600 mb-8 font-light">Experience the power of modern construction technology</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Start Free Trial
            </button>
            <button className="bg-white border-2 border-gray-300 hover:border-orange-400 text-gray-800 hover:text-orange-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
