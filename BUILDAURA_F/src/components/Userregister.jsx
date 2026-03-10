import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, Users, Building2, Eye, EyeOff, Shield, Zap, CheckCircle, ArrowLeft } from "lucide-react";

const API_URL = "http://localhost:5000/api/users";
const COMPANY_API_URL = "http://localhost:5000/api/companies/all"; // fetch all companies

function UserRegister() {
  const navigate = useNavigate();

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "client",
    companyCustomId: "", // store MongoDB _id here
  });

  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch companies for dropdown
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch(COMPANY_API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.companies)) {
          setCompanies(data.companies);
        } else {
          setCompanies([]);
          console.error("Expected array but got:", data);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
        setCompanies([]); // fallback to empty array
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userForm.password !== userForm.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: userForm.firstName,
          lastName: userForm.lastName,
          email: userForm.email,
          password: userForm.password,
          phoneNumber: userForm.phoneNumber,
          role: userForm.role === "site-engineer" ? "engineer" : "client",
          company:
            userForm.role === "site-engineer" ? userForm.companyCustomId : null,
        }),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (res.ok) {
        alert(
          `✅ Registration successful! Welcome ${data.firstName}. Your User ID is ${data.userId}.`
        );
        navigate("/login");
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("⚠️ Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => navigate("/signup");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-orange-600 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-bounce animation-delay-1000 opacity-60"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={handleBack}
              type="button"
              className="group flex items-center gap-3 bg-white backdrop-blur-sm border border-black/20 text-black hover:bg-black/20 hover:border-white/40 px-4 py-2 rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium">Back to Options</span>
            </button>
          </div>

          <div className="bg-white backdrop-blur-2xl border border-black/20 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Professional Registration
                  </h1>
                </div>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Join BuildAura as a client or engineer and start collaborating on amazing projects
                </p>
              </div>

              <div className="flex items-center justify-center space-x-8 mb-12 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm">Secure Registration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">Quick Setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-sm">Verified Platform</span>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-400" />
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={userForm.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-400" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={userForm.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-black flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={userForm.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-black flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-400" />
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={userForm.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-400" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create a secure password"
                        value={userForm.password}
                        onChange={handleChange}
                        required
                        className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 pr-12 text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black flex items-center gap-2">
                      <Lock className="w-4 h-4 text-blue-400" />
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={userForm.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 pr-12 text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-black flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    Professional Role
                  </label>
                  <div className="relative">
                    <select
                      name="role"
                      value={userForm.role}
                      onChange={handleChange}
                      className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="client" className="bg-gray-800 text-gray">Client - Project Owner</option>
                      <option value="site-engineer" className="bg-gray-800 text-white">Site Engineer - Technical Expert</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className={`px-6 py-3 rounded-full text-white text-sm font-medium flex items-center gap-2 ${
                    userForm.role === "client" 
                      ? "bg-gradient-to-r from-yellow-500 to-orange-600" 
                      : "bg-gradient-to-r from-yellow-500 to-orange-600"
                  }`}>
                    <span>{userForm.role === "client" ? "👤" : "⚡"}</span>
                    <span>
                      Registering as {userForm.role === "client" ? "Project Client" : "Site Engineer"}
                    </span>
                  </div>
                </div>

                {userForm.role === "site-engineer" && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-black flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-400" />
                      Select Your Company
                    </label>
                    <div className="relative">
                      <select
                        name="companyCustomId"
                        value={userForm.companyCustomId}
                        onChange={handleChange}
                        required
                        className="w-full bg-white backdrop-blur-sm border border-black/20 rounded-xl px-4 py-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-gray-800 text-gray-400">Choose your company...</option>
                        {companies.map((company) => (
                          <option key={company._id} value={company._id} className="bg-gray-800 text-white">
                            {company.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-xl flex items-center justify-center gap-3 ${
                      userForm.role === "client"
                        ? "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-gellow-400 hover:to-orange-500"
                        : "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Creating Your Account...</span>
                      </>
                    ) : (
                      <>
                        <User className="w-6 h-6" />
                        <span>
                          {userForm.role === "client" ? "Join as Client" : "Join as Engineer"}
                        </span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center mt-6 text-black-400 text-sm">
                  <p>🔒 Your information is encrypted and secure</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;