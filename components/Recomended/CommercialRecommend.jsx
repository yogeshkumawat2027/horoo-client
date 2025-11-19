"use client";
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CommercialCard from '../Home/cards/CommercialCard';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function CommercialRecommend({ currentHorooId, areaId, cityId }) {
  const areaScrollRef = useRef(null);
  const cityScrollRef = useRef(null);
  const [areaCommercials, setAreaCommercials] = useState([]);
  const [cityCommercials, setCityCommercials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // Fetch area-based recommendations
        if (areaId) {
          const areaRes = await fetch(`${API}/commercial/filter-for-user?area=${areaId}`);
          const areaData = await areaRes.json();
          if (areaData.success) {
            setAreaCommercials(areaData.commercials || []);
          }
        }

        // Fetch city-based recommendations
        if (cityId) {
          const cityRes = await fetch(`${API}/commercial/filter-for-user?city=${cityId}`);
          const cityData = await cityRes.json();
          if (cityData.success) {
            setCityCommercials(cityData.commercials || []);
          }
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [areaId, cityId]);

  // Filter out current commercial from recommendations
  const filteredAreaCommercials = areaCommercials.filter(commercial => commercial.horooId !== currentHorooId);
  const filteredCityCommercials = cityCommercials.filter(commercial => commercial.horooId !== currentHorooId);

  // Scroll function for large screens
  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Check if we have any commercials to show
  const hasAreaCommercials = filteredAreaCommercials.length > 0;
  const hasCityCommercials = filteredCityCommercials.length > 0;

  if (!hasAreaCommercials && !hasCityCommercials) {
    return null; // Don't render if no recommendations
  }

  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
          Recommended Commercial Properties
        </h2>

        {/* Area Based Recommendations */}
        {hasAreaCommercials && (
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Commercial Properties in Same Area
              </h3>
              {/* Navigation buttons - visible only on large screens */}
              <div className="hidden lg:flex gap-2">
                <button
                  onClick={() => scroll(areaScrollRef, 'left')}
                  className="p-2 rounded-full bg-white shadow-md hover:bg-orange-50 hover:shadow-lg transition-all"
                  aria-label="Scroll left"
                >
                  <FaChevronLeft className="text-orange-600" />
                </button>
                <button
                  onClick={() => scroll(areaScrollRef, 'right')}
                  className="p-2 rounded-full bg-white shadow-md hover:bg-orange-50 hover:shadow-lg transition-all"
                  aria-label="Scroll right"
                >
                  <FaChevronRight className="text-orange-600" />
                </button>
              </div>
            </div>

            {/* Scrollable Container */}
            <div
              ref={areaScrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredAreaCommercials.map((commercial) => (
                <div
                  key={commercial.horooId}
                  className="flex-shrink-0 w-72 md:w-80 snap-start"
                >
                  <CommercialCard
                    horooId={commercial.horooId}
                    horooName={commercial.horooName}
                    state={commercial.state}
                    city={commercial.city}
                    area={commercial.area}
                    pincode={commercial.pincode}
                    propertyType={commercial.propertyType}
                    availableFor={commercial.availableFor}
                    ownerPrice={commercial.ownerPrice}
                    horooPrice={commercial.horooPrice}
                    mainImage={commercial.mainImage}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* City Based Recommendations */}
        {hasCityCommercials && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Commercial Properties in {filteredCityCommercials[0]?.city?.name || 'Same City'}
              </h3>
              {/* Navigation buttons - visible only on large screens */}
              <div className="hidden lg:flex gap-2">
                <button
                  onClick={() => scroll(cityScrollRef, 'left')}
                  className="p-2 rounded-full bg-white shadow-md hover:bg-orange-50 hover:shadow-lg transition-all"
                  aria-label="Scroll left"
                >
                  <FaChevronLeft className="text-orange-600" />
                </button>
                <button
                  onClick={() => scroll(cityScrollRef, 'right')}
                  className="p-2 rounded-full bg-white shadow-md hover:bg-orange-50 hover:shadow-lg transition-all"
                  aria-label="Scroll right"
                >
                  <FaChevronRight className="text-orange-600" />
                </button>
              </div>
            </div>

            {/* Scrollable Container */}
            <div
              ref={cityScrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredCityCommercials.map((commercial) => (
                <div
                  key={commercial.horooId}
                  className="flex-shrink-0 w-72 md:w-80 snap-start"
                >
                  <CommercialCard
                    horooId={commercial.horooId}
                    horooName={commercial.horooName}
                    state={commercial.state}
                    city={commercial.city}
                    area={commercial.area}
                    pincode={commercial.pincode}
                    propertyType={commercial.propertyType}
                    availableFor={commercial.availableFor}
                    ownerPrice={commercial.ownerPrice}
                    horooPrice={commercial.horooPrice}
                    mainImage={commercial.mainImage}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hide scrollbar globally for this component */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
