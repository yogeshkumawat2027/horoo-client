"use client";
import { FaPhone, FaWhatsapp } from 'react-icons/fa';

export default function Support() {
  const phoneNumber = "+919166260477";
  const displayNumber = "+91 9166260477";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Need Help?</h3>
        <p className="text-gray-600">Contact our support team</p>
      </div>

      {/* Phone Number Display */}
      <div className="bg-white rounded-lg p-4 mb-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-xl font-semibold text-gray-800">
          <FaPhone className="text-blue-600" />
          <span>{displayNumber}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {/* Call Button */}
        <button
          onClick={handleCall}
          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
        >
          <FaPhone size={18} />
          <span>Call Now</span>
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
        >
          <FaWhatsapp size={20} />
          <span>WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
