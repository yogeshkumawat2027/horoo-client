"use client";
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

export default function PropertyHeader({ 
  propertyName,
  area,
  city,
  state,
  pincode,
  averageRating,
  totalRatings
}) {
  return (
    <div className="bg-white p-4 md:p-6">
      {/* Property Name with Rating */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800 flex-1">
          {propertyName}
        </h1>
        
        {/* Rating Badge */}
        {averageRating !== undefined && totalRatings !== undefined && (
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-lg flex-shrink-0">
            <FaStar className="text-yellow-500 text-sm md:text-base" />
            <span className="text-sm md:text-lg font-bold text-gray-800">
              {averageRating?.toFixed(1) || '0.0'}
            </span>
            {/* <span className="text-xs md:text-sm text-gray-500">
              ({totalRatings || 0})
            </span> */}
          </div>
        )}
      </div>
      
      {/* Location - Single Line */}
      <div className="flex items-center gap-2 text-gray-600">
        <FaMapMarkerAlt className="text-orange-600 flex-shrink-0" />
        <p className="text-sm md:text-base font-medium">
          {area}, {city}, {state} - {pincode}
        </p>
      </div>
    </div>
  );
}
