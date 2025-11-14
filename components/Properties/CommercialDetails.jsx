"use client";
import { 
  FaBed, 
  FaUsers, 
  FaRulerCombined, 
  FaCheckCircle,
  FaYoutube
} from 'react-icons/fa';

export default function PropertyDetails({ 
  commercialType = [],
  availableFor = [],
  commercialSize,
  facilities = [],
  description,
  youtubeLink
}) {
  // Extract YouTube video ID
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYoutubeVideoId(youtubeLink);

  return (
    <div className="space-y-6">
      {/* Commercial Details */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        {/* Commercial Type, Available For, Commercial Size - All in one line */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-2">
          {/* Commercial Type */}
          {commercialType && commercialType.length > 0 && (
            <div className="flex md:flex-col items-center gap-2"> 
            
              {/* <FaBed className="text-orange-600 text-sm md:text-base" /> */}
              <div className="text-xs md:text-sm font-semibold text-gray-700">Commercial Type:</div>
              <div className="flex flex-wrap gap-1.5">
                {commercialType.map((type, idx) => (
                  <span 
                    key={idx} 
                    className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 px-3 py-1 rounded-lg text-xs md:text-sm font-medium shadow-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Available For */}
          {availableFor && availableFor.length > 0 && (
            <div className="flex md:flex-col items-center gap-2">
              {/* <FaUsers className="text-green-600 text-sm md:text-base" /> */}
              <span className="text-xs md:text-sm font-semibold text-gray-700">Available For:</span>
              <div className="flex flex-wrap gap-1.5">
                {availableFor.map((type, idx) => (
                  <span 
                    key={idx} 
                    className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-3 py-1 rounded-lg text-xs md:text-sm font-medium shadow-sm"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Commercial Size */}
          {commercialSize && (
            <div className="flex md:flex-col items-center gap-2">
              {/* <FaRulerCombined className="text-blue-600 text-sm md:text-base" /> */}
              <span className="text-xs md:text-sm font-semibold text-gray-700">Size:</span>
              <span className="text-gray-800 font-semibold text-xs md:text-sm bg-blue-50 px-3 py-1 rounded-lg">{commercialSize}</span>
            </div>
          )}
        </div>
      </div>

      {/* Facilities */}
      {facilities && facilities.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaCheckCircle className="text-green-600" />
            Facilities & Amenities
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {facilities.map((facility, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-gray-700">
                <FaCheckCircle className="text-green-500 text-xs flex-shrink-0" />
                <span className="text-xs md:text-sm">{facility}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4">Description</h3>
          <div 
            className="text-sm md:text-base text-gray-600 leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}

      {/* YouTube Video */}
      {videoId && (
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaYoutube className="text-red-600" />
            Watch This Property Vlog
          </h3>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Property Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
