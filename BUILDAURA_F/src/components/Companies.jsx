import React, { useState } from 'react';
import { Building2, MapPin, Clock, Star, ArrowRight, Search, Filter, Users, Award, CheckCircle } from 'lucide-react';
import aura from '../assets/aura.jpeg';
import coastal from '../assets/coastal.jpeg';
import green from '../assets/green.jpeg';
import sky from '../assets/sky.jpeg';
import urban from '../assets/urban.jpeg';
import metro from '../assets/metro.jpeg';

function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const companies = [
    {
      id: 1,
      name: "Aura Builders Inc.",
      experience: "20+ Years of Experience",
      location: "Colombo, Sri Lanka",
      specialization: "Specializing in commercial and smart office buildings.",
      image: aura,
      rating: 4.9,
      projects: 150,
      category: "commercial",
      features: ["Smart Buildings", "Commercial", "Office Complexes"],
      verified: true
    },
    {
      id: 2,
      name: "SkyLine Constructions",
      experience: "15 Years of Expertise",
      location: "Kandy, Sri Lanka",
      specialization: "High-rise, residential, and mixed-use developments.",
      image: sky,
      rating: 4.8,
      projects: 120,
      category: "residential",
      features: ["High-rise", "Residential", "Mixed-use"],
      verified: true
    },
    {
      id: 3,
      name: "GreenField Projects",
      experience: "10 Years of Experience",
      location: "Galle, Sri Lanka",
      specialization: "Sustainable housing and eco-friendly design.",
      image: green,
      rating: 4.7,
      projects: 85,
      category: "sustainable",
      features: ["Eco-friendly", "Sustainable", "Green Design"],
      verified: true
    },
    {
      id: 4,
      name: "Metro Infrastructure",
      experience: "25+ Years of Excellence",
      location: "Negombo, Sri Lanka",
      specialization: "Large-scale infrastructure and public works.",
      image: metro,
      rating: 4.9,
      projects: 200,
      category: "infrastructure",
      features: ["Infrastructure", "Public Works", "Large-scale"],
      verified: true
    },
    {
      id: 5,
      name: "Coastal Developments",
      experience: "12 Years of Innovation",
      location: "Matara, Sri Lanka",
      specialization: "Luxury resorts and coastal property development.",
      image: coastal,
      rating: 4.6,
      projects: 65,
      category: "luxury",
      features: ["Luxury", "Resorts", "Coastal"],
      verified: true
    },
    {
      id: 6,
      name: "Urban Planners Ltd",
      experience: "18 Years of Vision",
      location: "Jaffna, Sri Lanka",
      specialization: "Urban planning and smart city solutions.",
      image: urban,
      rating: 4.8,
      projects: 95,
      category: "urban",
      features: ["Urban Planning", "Smart Cities", "Innovation"],
      verified: true
    }
  ];

  const filters = [
    { id: 'all', label: 'All Companies', count: companies.length },
    { id: 'commercial', label: 'Commercial', count: companies.filter(c => c.category === 'commercial').length },
    { id: 'residential', label: 'Residential', count: companies.filter(c => c.category === 'residential').length },
    { id: 'sustainable', label: 'Sustainable', count: companies.filter(c => c.category === 'sustainable').length },
    { id: 'infrastructure', label: 'Infrastructure', count: companies.filter(c => c.category === 'infrastructure').length }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || company.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-6 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Browse{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Companies
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find the best construction company for your next project. Discover verified professionals with proven track records.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search companies, locations, or specializations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-lg transition-all duration-300"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((company, index) => (
            <div
              key={company.id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={company.image || "/placeholder.svg"}
                  alt={company.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Verified Badge */}
                {company.verified && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </div>
                )}

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                  {company.rating}
                </div>

                {/* Company Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2">{company.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Experience and Location */}
                <div className="space-y-2">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">{company.experience}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{company.location}</span>
                  </div>
                </div>

                {/* Specialization */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {company.specialization}
                </p>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2">
                  {company.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{company.projects} Projects</span>
                  </div>
                  
                  {/* CTA Button */}
                  <button className="group/btn bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No companies found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredCompanies.length > 0 && (
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-gray-800 to-black text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto">
              Load More Companies
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't find the right company?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let us help you connect with the perfect construction partner for your specific needs.
          </p>
          <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 flex items-center mx-auto">
            Get Personalized Recommendations
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Companies;

