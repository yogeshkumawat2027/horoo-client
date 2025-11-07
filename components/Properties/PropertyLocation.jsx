"use client";
import { FaMapMarkerAlt, FaLock } from 'react-icons/fa';

export default function PropertyLocation({ 
  propertyName,
  area,
  city,
  state,
  pincode,
  nearbyAreas = []
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      {/* Property Name */}
      <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-4">
        {propertyName}
      </h1>
      
      {/* Location - Single Line */}
      <div className="flex items-center gap-2 text-gray-600 mb-4">
        <FaMapMarkerAlt className="text-orange-600 flex-shrink-0" />
        <p className="text-sm md:text-base font-medium">
          {area}, {city}, {state} - {pincode}
        </p>
      </div>

      {/* Nearby Areas */}
      {nearbyAreas && nearbyAreas.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-3">Nearby Areas</h3>
          <div className="flex flex-wrap gap-2">
            {nearbyAreas.map((area, idx) => (
              <span 
                key={idx} 
                className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 px-4 py-2 rounded-lg text-xs md:text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Exact Location Notice */}
      {/* <div className="flex items-start gap-2 bg-gray-100 rounded-lg p-3 text-gray-600">
        <FaLock className="mt-0.5 flex-shrink-0 text-sm" />
        <p className="text-xs md:text-sm">
          <span className="font-semibold">Exact Location</span> will be provided after booking
        </p>
      </div> */}
    </div>
  );
}
