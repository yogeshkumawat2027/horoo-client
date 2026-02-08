"use client";
import { useState } from 'react';
import { FaHome, FaBed, FaBuilding, FaHotel, FaWarehouse, FaUserFriends, FaPhone, FaWhatsapp, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ListRentalPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    propertyType: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const propertyTypes = [
    { value: 'room', label: 'Room', icon: FaBed },
    { value: 'flat', label: 'Flat', icon: FaBuilding },
    { value: 'hostel', label: 'Hostel', icon: FaUserFriends },
    { value: 'hotel', label: 'Hotel', icon: FaHotel },
    { value: 'house', label: 'House', icon: FaHome },
    { value: 'commercial', label: 'Commercial', icon: FaWarehouse }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handlePropertyTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      propertyType: type
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.mobile.match(/^[0-9]{10}$/)) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (!formData.address.trim()) {
      setError('Please enter property address');
      return false;
    }
    if (!formData.propertyType) {
      setError('Please select a property type');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API}/listing-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          mobile: '',
          address: '',
          propertyType: ''
        });
        
        // Auto-hide success message after 8 seconds
        setTimeout(() => setSuccess(false), 8000);
      } else {
        setError(data.message || 'Failed to submit request. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error('Error submitting listing request:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = "+918279053200";
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = "tel:+918279053200";
  };

  const handleEmail = () => {
    window.location.href = "mailto:horoobooking@gmail.com";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3 md:mb-4">
            List Your Property with{' '}
            <span className="text-orange-600">Horoo</span>
          </h1>
          <p className="hidden md:block text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with thousands of potential tenants. List your property today and start earning rental income effortlessly.
          </p>
          <div className="mt-4 md:mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-orange-600" />
              <span>Quick Listing</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-orange-600" />
              <span>Wide Reach</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-200">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
                <FaHome className="text-orange-600" />
                Property Listing Request
              </h2>

              {success && (
                <div className="mb-4 md:mb-6 bg-green-50 border-2 border-green-500 text-green-800 px-5 py-4 rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-lg mb-1">Your request is sent!</p>
                      <p className="text-sm text-green-700">Our team will connect with you soon.</p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-4 md:mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Name Field */}
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Mobile Field */}
                <div className="mb-4">
                  <label htmlFor="mobile" className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Address Field */}
                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                    Property Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete property address"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition resize-none placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Property Type Selection */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-semibold mb-3 text-sm md:text-base">
                    Property Type <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {propertyTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <label
                          key={type.value}
                          className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.propertyType === type.value
                              ? 'border-orange-600 bg-orange-50 text-orange-600'
                              : 'border-gray-300 hover:border-orange-400 text-gray-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="propertyType"
                            value={type.value}
                            checked={formData.propertyType === type.value}
                            onChange={(e) => handlePropertyTypeSelect(e.target.value)}
                            className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                          />
                          <IconComponent className="text-xl" />
                          <span className="font-medium text-sm flex-1">{type.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 md:py-4 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg"
                >
                  {loading ? 'Submitting...' : 'Submit Listing Request'}
                </button>
              </form>

              <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-600">
                By submitting, you agree to our terms and conditions
              </div>
            </div>
          </div>

          {/* Support Card Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl shadow-xl p-6 border border-orange-200 sticky top-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Need Help?</h3>
                <p className="text-gray-600">Our team is here to assist you</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 mb-6">
                {/* Phone Number */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-gray-800">
                    <FaPhone className="text-orange-600 text-xl" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                      <p className="font-semibold text-lg">+91 8279053200</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 text-gray-800">
                    <FaEnvelope className="text-orange-600 text-xl" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Email</p>
                      <p className="font-semibold">horoobooking@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCall}
                  className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  <FaPhone size={18} />
                  <span>Call Now</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
                >
                  <FaWhatsapp size={20} />
                  <span>WhatsApp</span>
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-orange-200">
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-semibold text-orange-600">Available:</span> Monday - Saturday
                  <br />
                  9:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why List With Us Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Why List Your Property with Horoo?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserFriends className="text-orange-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Wide Audience</h3>
              <p className="text-gray-600">
                Reach thousands of verified tenants actively searching for properties
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-orange-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Process</h3>
              <p className="text-gray-600">
                Simple listing process with our team handling all the details
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHome className="text-orange-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Support</h3>
              <p className="text-gray-600">
                Get dedicated support from our team throughout the listing process
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
