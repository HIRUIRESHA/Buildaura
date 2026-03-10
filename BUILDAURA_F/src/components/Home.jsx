import React from 'react';
import engImage from '../assets/eng_b.png';
import {ArrowRight,CheckCircle,TrendingUp,Users,Play,Building,Star} from 'lucide-react'; 
import { Link } from "react-router-dom";


function Home() {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* Left */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 px-6 py-3 rounded-full text-sm font-semibold shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300">
              <span className="mr-2">🚀</span>
              Leading Construction Management Platform
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Build{' '}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Smarter
                </span>
                .{' '}
                <br className="hidden sm:block" />
                Manage{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Better
                </span>
                .{' '}
                <br className="hidden sm:block" />
                Deliver{' '}
                <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                  Faster
                </span>
                .
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl leading-relaxed">
                A powerful construction project management platform that brings clients, companies, engineers, and managers together in perfect harmony.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: CheckCircle, text: "Real-time Collaboration" },
                { icon: TrendingUp, text: "Advanced Analytics" },
                { icon: Users, text: "Team Management" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-gray-100">
                  <feature.icon className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to = "/signup">
              <button className="group bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button></Link>
              <button className="group border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-400 transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-gray-200">
              {[
                { number: "500+", label: "Projects Managed", icon: Building },
                { number: "100+", label: "Professionals", icon: Users },
                { number: "2M+", label: "Sq Ft Supervised", icon: TrendingUp }
              ].map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-orange-500 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right  */}
          <div className="relative lg:pl-8">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 transform hover:-translate-y-2 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent z-10"></div>
                <img
                  src={engImage}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-black to-gray-800 rounded-2xl p-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                <ArrowRight className="w-8 h-8 text-white group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
              </div>
            </div>

            <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full border-2 border-white flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-current" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">4.9/5 Rating</div>
                  <div className="text-xs text-gray-500">From 1000+ reviews</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-12 left-8 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">98% Success Rate</div>
                  <div className="text-xs text-gray-500">Project completion</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm mb-8 font-medium">
            Trusted by leading construction companies worldwide
          </p>
          <div className="flex justify-center items-center space-x-12 opacity-60 hover:opacity-80 transition-opacity">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-24 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-gray-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
