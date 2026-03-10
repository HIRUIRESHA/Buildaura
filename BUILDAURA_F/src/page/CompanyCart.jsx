import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CompanyCart = () => {
  const { auth, setHasCart } = useContext(AuthContext);
  const user = auth?.user;

  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [cartId, setCartId] = useState(null);

  const [formData, setFormData] = useState({
    companyId: '',
    companyName: '',
    experience: '',
    location: '',
    specialization: '',
    image: null,
    rating: 5,
    category: 'residential',
    features: [],
    verified: false
  });

  useEffect(() => {
    const storedCompany = JSON.parse(localStorage.getItem("company"));
    if (storedCompany) {
      setFormData(prev => ({
        ...prev,
        companyId: storedCompany.companyId || '',
        companyName: storedCompany.name || ''
      }));

      axios.get(`http://localhost:5000/api/companycarts/company/${storedCompany.companyId}`)
        .then(res => {
          if (res.data) {
            setFormData({
              companyId: res.data.companyId,
              companyName: res.data.companyName,
              experience: res.data.experience || '',
              location: res.data.location || '',
              specialization: res.data.specialization || '',
              image: null,
              rating: res.data.rating || 5,
              category: res.data.category || 'residential',
              features: res.data.features || [],
              verified: res.data.verified || false
            });
            setCartId(res.data._id);
            setImagePreview(res.data.image || null);
            setIsEditing(false);
            setHasCart(true); 
          }
        })
        .catch(err => console.error(err));
    }
  }, [setHasCart]);

  const categories = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'renovation', label: 'Renovation' }
  ];

  const availableFeatures = [
    'Free Consultation',
    '24/7 Support',
    'Emergency Services',
    'Licensed & Insured',
    'Warranty Included',
    'Eco-Friendly',
    'Same Day Service',
    'Online Booking',
    'Free Estimates',
    'Quality Guarantee'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFeatureChange = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyId || !formData.companyName) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('companyId', formData.companyId);
      submitData.append('companyName', formData.companyName);
      submitData.append('experience', formData.experience);
      submitData.append('location', formData.location);
      submitData.append('specialization', formData.specialization);
      submitData.append('rating', formData.rating);
      submitData.append('category', formData.category);
      submitData.append('features', JSON.stringify(formData.features));
      submitData.append('verified', formData.verified);

      if (formData.image && formData.image instanceof File) submitData.append('image', formData.image);

      if (cartId) {
        await axios.put(`http://localhost:5000/api/companycarts/${cartId}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Company cart updated successfully!');
      } else {
        const res = await axios.post('http://localhost:5000/api/companycarts', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setCartId(res.data._id);
        setHasCart(true); 
        alert('Company cart created successfully!');
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error saving cart:', error);
      alert(error?.response?.data?.message || 'Error saving cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    const storedCompany = JSON.parse(localStorage.getItem("company"));
    setFormData({
      companyId: storedCompany?.companyId || '',
      companyName: storedCompany?.name || '',
      experience: '',
      location: '',
      specialization: '',
      image: null,
      rating: 5,
      category: 'residential',
      features: [],
      verified: false
    });
    setImagePreview(null);
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{cartId ? 'View Company Cart' : 'Create Company Cart'}</h2>
          <p className="text-gray-600">Match company create cart connect with clients</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="companyId" className="block text-sm font-medium text-gray-700 mb-2">
                Company ID <span className="text-red-500">*</span>
              </label>
              <input type="text" id="companyId" name="companyId" value={formData.companyId} disabled className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100" />
            </div>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input type="text" id="companyName" name="companyName" value={formData.companyName} disabled className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleInputChange} placeholder="e.g., 10+ years" disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter service location" disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>

            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <input type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleInputChange} placeholder="Enter specialization area" disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select id="category" name="category" value={formData.category} onChange={handleInputChange} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {categories.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select id="rating" name="rating" value={formData.rating} onChange={handleInputChange} disabled={!isEditing} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n>1?'s':''}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">Cart Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                      {isEditing && (
                        <button type="button" onClick={() => { setImagePreview(null); setFormData(prev => ({ ...prev, image: null })); document.getElementById('image-upload').value = ''; }} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200">Remove Image</button>
                      )}
                    </div>
                  ) : (
                    <>
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {isEditing && (
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                            <span>Upload a file</span>
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                      )}
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
              {isEditing && <input id="image-upload" name="image" type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Features</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {availableFeatures.map(feature => (
                  <div key={feature} className="flex items-center">
                    <input type="checkbox" id={`feature-${feature}`} checked={formData.features.includes(feature)} onChange={() => handleFeatureChange(feature)} disabled={!isEditing} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <label htmlFor={`feature-${feature}`} className="ml-2 text-sm text-gray-700">{feature}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="verified" name="verified" checked={formData.verified} onChange={handleInputChange} disabled={!isEditing} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <label htmlFor="verified" className="ml-2 text-sm font-medium text-gray-700">Verified Company</label>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              {cartId && !isEditing && (
                <button type="button" onClick={() => setIsEditing(true)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Edit</button>
              )}
              {isEditing && (
                <>
                  <button type="button" onClick={handleReset} disabled={loading} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Reset</button>
                  <button type="submit" disabled={loading} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">{loading ? (cartId ? 'Updating...' : 'Creating...') : (cartId ? 'Update Cart' : 'Create Cart')}</button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyCart;
