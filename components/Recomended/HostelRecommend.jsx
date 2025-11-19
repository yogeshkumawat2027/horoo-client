"use client";
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HostelCard from '../Home/cards/HostelCard';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function HostelRecommend({ currentHorooId, areaId, cityId }) {
  const areaScrollRef = useRef(null);
  const cityScrollRef = useRef(null);
  const [areaHostels, setAreaHostels] = useState([]);
  const [cityHostels, setCityHostels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // Fetch area-based recommendations
        if (areaId) {
          const areaRes = await fetch(`${API}/hostels/filter-for-user?area=${areaId}`);
          const areaData = await areaRes.json();
          if (areaData.success) {
            setAreaHostels(areaData.hostels || []);
          }
        }

        // Fetch city-based recommendations
        if (cityId) {
          const cityRes = await fetch(`${API}/hostels/filter-for-user?city=${cityId}`);
          const cityData = await cityRes.json();
          if (cityData.success) {
            setCityHostels(cityData.hostels || []);
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

  // Filter out current hostel from recommendations
  const filteredAreaHostels = areaHostels.filter(hostel => hostel.horooId !== currentHorooId);
  const filteredCityHostels = cityHostels.filter(hostel => hostel.horooId !== currentHorooId);

  // Scroll function for large screens
  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Check if we have any hostels to show
  const hasAreaHostels = filteredAreaHostels.length > 0;
  const hasCityHostels = filteredCityHostels.length > 0;

  if (!hasAreaHostels && !hasCityHostels) {
    return null; // Don't render if no recommendations
  }

  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
          Recommended Hostels
        </h2>

        {/* Area Based Recommendations */}
        {hasAreaHostels && (
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Hostels in Same Area
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
              {filteredAreaHostels.map((hostel) => (
                <div
                  key={hostel.horooId}
                  className="flex-shrink-0 w-72 md:w-80 snap-start"
                >
                  <HostelCard
                    horooId={hostel.horooId}
                    horooName={hostel.horooName}
                    state={hostel.state}
                    city={hostel.city}
                    area={hostel.area}
                    pincode={hostel.pincode}
                    hostelType={hostel.hostelType}
                    availableFor={hostel.availableFor}
                    ownerPrice={hostel.ownerPrice}
                    horooPrice={hostel.horooPrice}
                    mainImage={hostel.mainImage}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* City Based Recommendations */}
        {hasCityHostels && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Hostels in {filteredCityHostels[0]?.city?.name || 'Same City'}
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
              {filteredCityHostels.map((hostel) => (
                <div
                  key={hostel.horooId}
                  className="flex-shrink-0 w-72 md:w-80 snap-start"
                >
                  <HostelCard
                    horooId={hostel.horooId}
                    horooName={hostel.horooName}
                    state={hostel.state}
                    city={hostel.city}
                    area={hostel.area}
                    pincode={hostel.pincode}
                    hostelType={hostel.hostelType}
                    availableFor={hostel.availableFor}
                    ownerPrice={hostel.ownerPrice}
                    horooPrice={hostel.horooPrice}
                    mainImage={hostel.mainImage}
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
