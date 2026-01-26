import Link from 'next/link';
import { FaMapMarkerAlt, FaUsers, FaBed, FaRupeeSign, FaStar } from 'react-icons/fa';

export default function HostelCard({
  horooId,
  horooName,
  state,
  city,
  area,
  pincode,
  roomType = [],
  availableFor = [],
  ownerPrice,
  horooPrice,
  mainImage,
  roomSize,
  slug,
  averageRating = 3.5,
  totalRatings = 0
}) {
  // Use slug if available, fallback to horooId for backward compatibility
  const urlSlug = slug || horooId;

  // Format room types for display
  const formatRoomTypes = (types) => {
    if (!types || types.length === 0) return 'Room Available';
    return types.join(', ');
  };

  // Format available for display
  const formatAvailableFor = (available) => {
    if (!available || available.length === 0) return 'Anyone';
    return available.join(' • ');
  };

  // Format location (calculate once)
  const line1Parts = [];
  const line2Parts = [];
  
  // First line: Area, City
  if (area?.name) line1Parts.push(area.name);
  if (city?.name) line1Parts.push(city.name);
  
  // Second line: State, Pincode
  if (state?.name) line2Parts.push(state.name);
  if (pincode) line2Parts.push(pincode);
  
  const locationLine1 = line1Parts.join(', ');
  const locationLine2 = line2Parts.join(', ');

  return (
    <Link 
      href={`/hostels/${urlSlug}`}
      className="block w-full"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-orange-200 cursor-pointer">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={mainImage || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'}
          alt={horooName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Property Name and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors flex-1">
            {horooName}
          </h3>
          
          {/* Rating Badge */}
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg ml-2">
            <FaStar className="text-yellow-500 text-sm" />
            <span className="text-sm font-bold text-gray-800">
              {averageRating?.toFixed(1) || '3.5'}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 mb-3">
          <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0" />
          <div className="text-sm text-gray-600 leading-relaxed">
            {locationLine1 && (
              <div className="font-medium">{locationLine1}</div>
            )}
            {locationLine2 && (
              <div className="text-xs text-gray-500">{locationLine2}</div>
            )}
          </div>
        </div>

        {/* Hostel Details */}
        <div className="space-y-2 mb-4">
          {roomType && roomType.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Room Type:</span>
              <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded">
                {formatRoomTypes(roomType)}
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500">Available For:</span>
            <span className="text-xs text-gray-700 bg-green-100 px-2 py-1 rounded">
              {formatAvailableFor(availableFor)}
            </span>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-4">
          <div className="flex items-center gap-3">
            {/* Horoo Price (with strike-through) */}
            {horooPrice && horooPrice !== ownerPrice && (
              <div className="flex items-center text-gray-500">
                <FaRupeeSign className="text-xs" />
                <span className="text-sm line-through">
                  {horooPrice.toLocaleString()}
                </span>
              </div>
            )}
            
            {/* Owner Price (main price) */}
            <div className="flex items-center text-orange-600">
              <FaRupeeSign className="text-sm font-bold" />
              <span className="text-xl font-bold">
                {ownerPrice?.toLocaleString() || 'Price on request'}
              </span>
              <span className="text-sm text-gray-500 ml-1">/month</span>
            </div>
          </div>
          
          {/* Discount Badge */}
          {horooPrice && horooPrice !== ownerPrice && (
            <div className="mt-1">
              <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                Save ₹{(horooPrice - ownerPrice).toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Explore Button */}
        {/* <Link 
          href={`/hostels/${horooId}`}
          className="block w-full"
        >
          <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-md">
            Explore Details
          </button>
        </Link> */}
      </div>
    </div>
    </Link>
  );
}
