import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, User, CheckCircle, Sparkles, Zap, Shield } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-orange-600 relative overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-bounce animation-delay-1000 opacity-60"></div>
      </div>

      <div className="relative z-10 p-6 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl">

          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-12 lg:p-16">
              <div className="text-center mb-16">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center mr-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    BuildAura
                  </h1>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
                  Welcome to the Future of Construction
                </h2>
                <p className="text-xl text-black-300 max-w-2xl mx-auto">
                  Choose your path and join thousands of professionals revolutionizing the construction industry
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-16">

                <Link
                  to="/companysign"
                  className="group relative bg-gradient-to-br from-orange-500/20 to backdrop-blur-xl border border-orange-300/30 hover:border-orange-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/25 hover:scale-105 rounded-3xl overflow-hidden no-underline"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/5 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative p-8 lg:p-10 flex flex-col h-full">
                    <div className="relative mx-auto mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse opacity-20 scale-110"></div>
                      <div className="relative w-24 h-24 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Building2 className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-black mb-6 text-center">
                      Company Registration
                    </h3>
                    <p className="text-gray-600 text-lg mb-8 text-center flex-grow">
                      Empower your construction business with cutting-edge project management and team collaboration tools
                    </p>

                    {/* Features List */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center text-gray-400 group-hover:text-black transition-colors">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">Advanced Project Management</span>
                      </div>
                      <div className="flex items-center text-gray-400 group-hover:text-black transition-colors">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">Real-time Team Collaboration</span>
                      </div>
                      <div className="flex items-center text-gray-400 group-hover:text-black transition-colors">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">Comprehensive Client Portal</span>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-center group-hover:from-orange-400 group-hover:to-red-400 transition-all duration-300">
                      <span className="text-white font-bold text-lg">Start Building Today →</span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/userregister"
                  className="group relative bg-gradient-to-br from-yellow-500/20 to-white-500/20 backdrop-blur-xl border border-yellow-300/30 hover:border-yellow-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 rounded-3xl overflow-hidden no-underline"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative p-8 lg:p-10 flex flex-col h-full">
                    <div className="relative mx-auto mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-20 scale-110"></div>
                      <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <User className="w-12 h-12 text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-black mb-6 text-center">
                      Professional Registration
                    </h3>
                    <p className="text-gray-500 text-lg mb-8 text-center flex-grow">
                      Join as a client or site engineer and experience seamless project collaboration like never before
                    </p>

                    {/* Features List */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center text-gray-400 group-hover:text-black transition-colors">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">Seamless Project Integration</span>
                      </div>
                      <div className="flex items-center text-gray-400 group-hover:text-black transition-colors">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">Instant Communication Hub</span>
                      </div>
                      <div className="flex items-center text-gray-400 group-hover:text-black transition-colors">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">Mobile-First Experience</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-4 text-center group-hover:from-yellow-400 group-hover:to-orange-400 transition-all duration-300">
                      <span className="text-white font-bold text-lg">Join the Team →</span>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-8 mb-12 text-black">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>Secure & Trusted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span>Lightning Fast</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>AI-Powered</span>
                </div>
              </div>

              {/* Sign In Section */}
              <div className="text-center">
                <p className="text-xl text-black mb-8">Already part of the BuildAura family?</p>
                <Link
                  to="/login"
                  className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-black hover:bg-white/20 hover:border-white/40 rounded-2xl transition-all duration-300 text-lg font-semibold"
                >
                  <span>Sign In to Continue</span>
                  <div className="ml-2 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">→</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}