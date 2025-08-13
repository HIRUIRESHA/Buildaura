import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Building2 } from 'lucide-react';

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      
      {/* Main Container */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-2">
            {/* Left - Login Form */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                <p className="text-gray-600 mb-6">Enter your credentials to access your account</p>

                <form className="space-y-6">
                  {/* User ID Field */}
                  <div>
                    <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                      User ID
                    </label>
                    <input
                      id="userId"
                      type="text"
                      placeholder="Enter your email"
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Link to="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Sign In
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="mx-3 text-sm text-gray-500">or</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                  <button className="w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </button>

                  <button className="w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                    Sign in with Apple
                  </button>
                </div>

                {/* Sign Up Link */}
                <p className="mt-6 text-sm text-center text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>

            {/* Right - Optional Illustration */}
            <div className="hidden lg:flex items-center justify-center bg-orange-50">
              <div className="max-w-md p-6 text-center">
                <h3 className="text-2xl font-semibold text-orange-600 mb-4">
                  Welcome to BuildAura!
                </h3>
                <p className="text-gray-600">
                  Log in to manage your construction projects, collaborate with teams, and monitor progress in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
