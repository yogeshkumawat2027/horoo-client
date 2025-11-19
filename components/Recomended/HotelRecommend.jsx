"use client";
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HotelCard from '../Home/cards/HotelCard';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function HotelRecommend({ currentHorooId, areaId, cityId }) {
  const areaScrollRef = useRef(null);
  const cityScrollRef = useRef(null);
  const [areaHotels, setAreaHotels] = useState([]);
  const [cityHotels, setCityHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        // Fetch area-based recommendations
        if (areaId) {
          const areaRes = await fetch(`${API}/hotel/filter-for-user?area=${areaId}`);
          const areaData = await areaRes.json();
          if (areaData.success) {
            setAreaHotels(areaData.hotels || []);
          }
        }

        // Fetch city-based recommendations
        if (cityId) {
          const cityRes = await fetch(`${API}/hotel/filter-for-user?city=${cityId}`);
          const cityData = await cityRes.json();
          if (cityData.success) {
            setCityHotels(cityData.hotels || []);
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

  // Filter out current hotel from recommendations
  const filteredAreaHotels = areaHotels.filter(hotel => hotel.horooId !== currentHorooId);
  const filteredCityHotels = cityHotels.filter(hotel => hotel.horooId !== currentHorooId);

  // Scroll function for large screens
  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Check if we have any hotels to show
  const hasAreaHotels = filteredAreaHotels.length > 0;
  const hasCityHotels = filteredCityHotels.length > 0;

  if (!hasAreaHotels && !hasCityHotels) {
    return null; // Don't render if no recommendations
  }

  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
          Recommended Hotels
        </h2>

        {/* Area Based Recommendations */}
        {hasAreaHotels && (
          <div className="mb-8 md:mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Hotels in Same Area
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
              {filteredAreaHotels.map((hotel) => (
                <div
                  key={hotel.horooId}
                  className="flex-shrink-0 w-72 md:w-80 snap-start"
                >
                  <HotelCard
                    horooId={hotel.horooId}
                    horooName={hotel.horooName}
                    state={hotel.state}
                    city={hotel.city}
                    area={hotel.area}
                    pincode={hotel.pincode}
                    hotelType={hotel.hotelType}
                    roomType={hotel.roomType}
                    ownerPrice={hotel.ownerPrice}
                    horooPrice={hotel.horooPrice}
                    mainImage={hotel.mainImage}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* City Based Recommendations */}
        {hasCityHotels && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                Hotels in {filteredCityHotels[0]?.city?.name || 'Same City'}
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
              {filteredCityHotels.map((hotel) => (
                <div
                  key={hotel.horooId}
                  className="flex-shrink-0 w-72 md:w-80 snap-start"
                >
                  <HotelCard
                    horooId={hotel.horooId}
                    horooName={hotel.horooName}
                    state={hotel.state}
                    city={hotel.city}
                    area={hotel.area}
                    pincode={hotel.pincode}
                    hotelType={hotel.hotelType}
                    roomType={hotel.roomType}
                    ownerPrice={hotel.ownerPrice}
                    horooPrice={hotel.horooPrice}
                    mainImage={hotel.mainImage}
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
