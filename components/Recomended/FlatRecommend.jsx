"use client";
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import FlatCard from '../Home/cards/FlatCard';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function FlatRecommend({ currentHorooId, areaId, cityId }) {
  const areaScrollRef = useRef(null);
  const cityScrollRef = useRef(null);
  const [areaFlats, setAreaFlats] = useState([]);
  const [cityFlats, setCityFlats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // Fetch area-based recommendations
        if (areaId) {
          const areaRes = await fetch(`${API}/flats/filter-for-user?area=${areaId}`);
          const areaData = await areaRes.json();
          if (areaData.success) {
            setAreaFlats(areaData.flats || []);
          }
        }

        // Fetch city-based recommendations
        if (cityId) {
          const cityRes = await fetch(`${API}/flats/filter-for-user?city=${cityId}`);
          const cityData = await cityRes.json();
          if (cityData.success) {
            setCityFlats(cityData.flats || []);
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

  // Filter out current flat from recommendations
  const filteredAreaFlats = areaFlats.filter(flat => flat.horooId !== currentHorooId);
  const filteredCityFlats = cityFlats.filter(flat => flat.horooId !== currentHorooId);

  // Scroll function for large screens
  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Check if we have any flats to show
  const hasAreaFlats = filteredAreaFlats.length > 0;
  const hasCityFlats = filteredCityFlats.length > 0;

  if (!hasAreaFlats && !hasCityFlats) {
    return null; // Don't render if no recommendations
  }

  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
          Recommended Flats
        </h2>

        {/* Area Based Recommendations */}
        {hasAreaFlats && (
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Flats in Same Area
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
              {filteredAreaFlats.map((flat) => (
                <div
                  key={flat.horooId}
                  className="flex-shrink-0 w-72 md:w-80 snap-start"
                >
                  <FlatCard
                    horooId={flat.horooId}
                    horooName={flat.horooName}
                    state={flat.state}
                    city={flat.city}
                    area={flat.area}
                    pincode={flat.pincode}
                    flatType={flat.flatType}
                    availableFor={flat.availableFor}
                    ownerPrice={flat.ownerPrice}
                    horooPrice={flat.horooPrice}
                    mainImage={flat.mainImage}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* City Based Recommendations */}
        {hasCityFlats && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Flats in {filteredCityFlats[0]?.city?.name || 'Same City'}
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
              {filteredCityFlats.map((flat) => (
                <div
                  key={flat.horooId}
                  className="flex-shrink-0 w-72 md:w-80 snap-start"
                >
                  <FlatCard
                    horooId={flat.horooId}
                    horooName={flat.horooName}
                    state={flat.state}
                    city={flat.city}
                    area={flat.area}
                    pincode={flat.pincode}
                    flatType={flat.flatType}
                    availableFor={flat.availableFor}
                    ownerPrice={flat.ownerPrice}
                    horooPrice={flat.horooPrice}
                    mainImage={flat.mainImage}
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
