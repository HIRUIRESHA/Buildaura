import React, { useState, useEffect } from "react";
import { Building2, MapPin, Star, ArrowRight, Users, CheckCircle } from "lucide-react";
import { getCarts } from "../services/companyCartServices";

const Companies = () => {
  const [carts, setCarts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch company carts from backend
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const data = await getCarts();
        setCarts(data?.carts || data || []);
      } catch (error) {
        console.error("Error fetching company carts:", error);
        setCarts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCarts();
  }, []);

  // Categories
  const categoryList = [
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "industrial", label: "Industrial" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "renovation", label: "Renovation & Remodeling" },
  ];

  // Filter 
  const filters = [
    { id: "all", label: "All Companies", count: carts.length },
    ...categoryList.map((cat) => ({
      id: cat.id,
      label: cat.label,
      count: carts.filter((c) => (c.category || "all") === cat.id).length,
    })),
  ];

  const filteredCarts = carts.filter((cart) => {
    const matchesSearch =
      cart.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.specialization?.toLowerCase().includes(searchTerm.toLowerCase());

    const cartCategory = cart.category || "all";
    const matchesFilter = selectedFilter === "all" || cartCategory === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-6 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Browse{" "}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Companies
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find the best construction company for your next project. Discover verified professionals with proven track records.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12 flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search companies, locations, or specializations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-lg transition-all duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {loading && <p className="text-center py-16">Loading company carts...</p>}
        {!loading && filteredCarts.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No companies found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Carts Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${filteredCarts.length === 0 ? "opacity-50 pointer-events-none" : ""}`}>
          {filteredCarts.map((cart) => (
            <div
              key={cart._id}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                {cart.image ? (
                  <img
                    src={cart.image}
                    alt={cart.companyName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {cart.verified && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" /> Verified
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" /> {cart.rating || 0}
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2">{cart.companyName}</h3>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-semibold">{cart.experience || "No experience info"}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{cart.location || "No location info"}</span>
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {cart.specialization || "No specialization provided"}
                </p>

                <div className="flex flex-wrap gap-2">
                  {(cart.features || []).slice(0, 5).map((feature, idx) => (
                    <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                      {feature}
                    </span>
                  ))}
                  {(cart.features || []).length > 5 && <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">+ more</span>}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{cart.projects || 0} Projects</span>
                  </div>
                  <button className="group/btn bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
