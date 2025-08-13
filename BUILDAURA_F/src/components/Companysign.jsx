import React, { useState } from 'react';
import {
  Building2,
  Mail,
  Lock,
  Phone,
  MapPin,
  Users,
  Briefcase,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CompanySign() {
  const navigate = useNavigate();

  const [companyForm, setCompanyForm] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    companySize: '',
    industry: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Form submission handler
  const handleCompanySubmit = (e) => {
    e.preventDefault();

    if (companyForm.password !== companyForm.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Company registered successfully!');
      // Reset form or redirect user here
    }, 2000);
  };

  // Navigate back to signup page
  const handleBack = () => {
    navigate('/signup'); // Adjust this route if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 p-4 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-800 transition-colors"
            type="button"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-semibold">Back</span>
          </button>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-800">
                  Company Registration
                </h2>
              </div>
              <p className="text-gray-600">
                Register your construction company to start managing projects
              </p>
            </div>

            <form onSubmit={handleCompanySubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="companyName"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  Company Name
                </label>
                <input
                  id="companyName"
                  value={companyForm.companyName}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, companyName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="companyEmail"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Company Email
                </label>
                <input
                  id="companyEmail"
                  type="email"
                  value={companyForm.email}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="company@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="companyPassword"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <input
                    id="companyPassword"
                    type="password"
                    value={companyForm.password}
                    onChange={(e) =>
                      setCompanyForm({ ...companyForm, password: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="companyConfirmPassword"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </label>
                  <input
                    id="companyConfirmPassword"
                    type="password"
                    value={companyForm.confirmPassword}
                    onChange={(e) =>
                      setCompanyForm({ ...companyForm, confirmPassword: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="companyPhone"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  id="companyPhone"
                  type="tel"
                  value={companyForm.phoneNumber}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, phoneNumber: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Company Address
                </label>
                <input
                  id="address"
                  value={companyForm.address}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, address: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter company address"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="companySize"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Company Size
                  </label>
                  <select
                    value={companyForm.companySize}
                    onChange={(e) =>
                      setCompanyForm({ ...companyForm, companySize: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="" disabled>
                      Select size
                    </option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="200+">200+ employees</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="industry"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    Industry
                  </label>
                  <select
                    value={companyForm.industry}
                    onChange={(e) =>
                      setCompanyForm({ ...companyForm, industry: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="" disabled>
                      Select industry
                    </option>
                    <option value="residential">Residential Construction</option>
                    <option value="commercial">Commercial Construction</option>
                    <option value="industrial">Industrial Construction</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="renovation">Renovation & Remodeling</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? 'Creating Company Account...' : 'Register Company'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
