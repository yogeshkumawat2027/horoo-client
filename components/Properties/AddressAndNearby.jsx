"use client";

export default function AddressAndNearby({ 
  horooAddress,
  nearbyAreas = []
}) {
  return (
    <div className="bg-white lg:grid lg:grid-cols-2 lg:gap-0">
      {/* Address */}
      {horooAddress && (
        <div className="p-4 md:p-6 lg:border-r lg:border-gray-100">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">
            Address
          </h3>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {horooAddress}
          </p>
        </div>
      )}

      {/* Nearby Areas */}
      {nearbyAreas && nearbyAreas.length > 0 && (
        <div className="p-4 md:p-6 border-t lg:border-t-0 border-gray-100">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">
            Nearby Areas
          </h3>
          <div className="flex flex-wrap gap-2">
            {nearbyAreas.map((area, idx) => (
              <span 
                key={idx} 
                className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 px-4 py-2 rounded-lg text-xs md:text-sm font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
