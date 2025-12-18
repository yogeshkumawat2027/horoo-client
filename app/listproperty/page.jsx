"use client";
import { useState, useEffect } from "react";
import { FaHome, FaUser, FaPhone, FaMapMarkerAlt, FaBuilding, FaCheckCircle, FaWhatsapp, FaExclamationCircle, FaTimes, FaClock } from "react-icons/fa";

export default function ListPropertyPage() {
  const API =  'http://localhost:5000/api';
  
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    propertyType: ""
  });
  
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Check localStorage on mount for existing timer
  useEffect(() => {
    const disabledUntil = localStorage.getItem('listproperty_disabled_until');
    if (disabledUntil) {
      const timeRemaining = parseInt(disabledUntil) - Date.now();
      if (timeRemaining > 0) {
        setIsButtonDisabled(true);
        setTimeLeft(Math.ceil(timeRemaining / 1000));
      } else {
        localStorage.removeItem('listproperty_disabled_until');
      }
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsButtonDisabled(false);
            localStorage.removeItem('listproperty_disabled_until');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.address || !formData.propertyType) {
      setErrorMessage("Please fill all fields");
      setShowErrorPopup(true);
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setErrorMessage("Please enter valid 10 digit mobile number");
      setShowErrorPopup(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API}/listing-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Set 5 minute cooldown
        const cooldownTime = 5 * 60 * 1000; // 5 minutes in milliseconds
        const disabledUntil = Date.now() + cooldownTime;
        localStorage.setItem('listproperty_disabled_until', disabledUntil.toString());
        
        setIsButtonDisabled(true);
        setTimeLeft(300); // 5 minutes = 300 seconds
        
        setShowSuccessPopup(true);
        setFormData({
          name: "",
          mobile: "",
          address: "",
          propertyType: ""
        });
      } else {
        setErrorMessage(data.message || "Failed to submit request");
        setShowErrorPopup(true);
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setShowErrorPopup(true);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const propertyTypes = [
    { value: "room", label: "Room" },
    { value: "flat", label: "Flat" },
    { value: "house", label: "House" },
    { value: "hostel", label: "Hostel" },
    { value: "hotel", label: "Hotel" },
    { value: "commercial", label: "Commercial" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative pt-8 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-orange-600">
            Hello Property Owners!
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Become Partner of <span className="text-orange-600">Horoo</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
             Fill the form below to list your property, 
            and our dedicated team will guide you through a seamless listing process.
          </p>
          
          {/* <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-gray-50 px-6 py-3 rounded-full shadow-md border border-gray-200">
              <span className="text-orange-600 font-bold text-xl">1000+</span>
              <span className="text-gray-600 ml-2 text-sm sm:text-base">Properties Listed</span>
            </div>
            <div className="bg-gray-50 px-6 py-3 rounded-full shadow-md border border-gray-200">
              <span className="text-orange-600 font-bold text-xl">500+</span>
              <span className="text-gray-600 ml-2 text-sm sm:text-base">Happy Owners</span>
            </div>
            <div className="bg-gray-50 px-6 py-3 rounded-full shadow-md border border-gray-200">
              <span className="text-orange-600 font-bold text-xl">24hrs</span>
              <span className="text-gray-600 ml-2 text-sm sm:text-base">Quick Response</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Form Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-3xl shadow-lg p-8 md:p-12 border border-gray-200">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-12 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    List Your Property
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">
                    Share your details and we'll reach out within 24 hours
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                      <FaUser className="text-white text-sm" />
                    </div>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all text-gray-800 placeholder-gray-400 group-hover:border-orange-300"
                    required
                  />
                </div>

                {/* Mobile Field */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                      <FaPhone className="text-white text-sm" />
                    </div>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter 10 digit mobile number"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all text-gray-800 placeholder-gray-400 group-hover:border-orange-300"
                    required
                  />
                </div>

                {/* Address Field */}
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                      <FaMapMarkerAlt className="text-white text-sm" />
                    </div>
                    Property Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete property address with landmark"
                    rows="4"
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all resize-none text-gray-800 placeholder-gray-400 group-hover:border-orange-300"
                    required
                  />
                </div>

                {/* Property Type Field */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                      <FaBuilding className="text-white text-sm" />
                    </div>
                    Property Type *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {propertyTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.propertyType === type.value
                            ? "border-orange-500 bg-orange-500 text-white shadow-md"
                            : "border-gray-300 bg-white text-gray-700 hover:border-orange-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="propertyType"
                          value={type.value}
                          checked={formData.propertyType === type.value}
                          onChange={handleChange}
                          className="hidden"
                          required
                        />
                        <span className="font-semibold">
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isButtonDisabled}
                  className={`relative w-full py-5 px-8 rounded-2xl font-bold text-lg text-white transition-all shadow-xl overflow-hidden group ${
                    isSubmitting || isButtonDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 hover:shadow-2xl hover:scale-[1.02]"
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting Your Request...
                      </>
                    ) : isButtonDisabled ? (
                      <>
                        <FaClock className="text-xl" />
                        Request Already Sent
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="text-xl" />
                        Submit Request
                      </>
                    )}
                  </span>
                  {!isSubmitting && !isButtonDisabled && (
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  )}
                </button>

                {/* Timer Display */}
                {isButtonDisabled && timeLeft > 0 && (
                  <div className="flex items-center justify-center gap-2 text-orange-600 bg-orange-50 px-4 py-3 rounded-xl border border-orange-200">
                    <FaClock className="animate-pulse" />
                    <span className="text-sm font-semibold">
                      You can submit again after {formatTime(timeLeft)}
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* WhatsApp Card */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <div className="inline-flex p-4 bg-white rounded-2xl shadow-lg mb-4">
                  <FaWhatsapp className="text-5xl text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Need Help?
                </h3>
                <p className="text-green-50 mb-6 leading-relaxed">
                  Chat with us directly on WhatsApp for instant support and guidance.
                </p>
                <a
                  href="https://wa.me/919166260477?text=Hi%20Horoo%2C%20I%20want%20to%20list%20my%20property"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-green-600 px-6 py-4 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <FaWhatsapp className="text-2xl" />
                  <span>Chat Now</span>
                </a>
                <p className="mt-4 text-sm text-green-100 font-semibold">
                  📱 +91 9166260477
                </p>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="bg-gray-50 rounded-3xl shadow-lg p-8 border border-gray-200">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                Why List With Us?
              </h4>
              <ul className="space-y-3">
                {[
                  "Free property listing",
                  "Verified tenant leads",
                  "24/7 customer support",
                  "Professional photography",
                  "Legal documentation help",
                  "Maximum visibility"
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-700">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-white text-xs" />
                    </div>
                    <span className="font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center transform animate-scaleIn">
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
            
            <div className="inline-flex p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full mb-6">
              <FaCheckCircle className="text-7xl text-green-600" />
            </div>
            
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Success!
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Your request has been submitted successfully. Our team will contact you within 24 hours to guide you through the listing process.
            </p>
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 px-6 rounded-xl font-bold hover:from-green-700 hover:to-green-600 transition-all shadow-lg hover:shadow-xl"
            >
              Got it, Thanks!
            </button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center transform animate-scaleIn">
            <button
              onClick={() => setShowErrorPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
            
            <div className="inline-flex p-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full mb-6">
              <FaExclamationCircle className="text-7xl text-red-600" />
            </div>
            
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Oops!
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              {errorMessage}
            </p>
            <button
              onClick={() => setShowErrorPopup(false)}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-4 px-6 rounded-xl font-bold hover:from-red-700 hover:to-red-600 transition-all shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
