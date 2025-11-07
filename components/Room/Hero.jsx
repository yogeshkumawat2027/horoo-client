"use client";
import { useEffect, useState } from 'react';
import { 
  FaSearch, 
  FaUsers, 
  FaBed, 
  FaMapMarkerAlt, 
  FaHome,
  FaFilter
} from 'react-icons/fa';
import RoomCardSection from './RoomCardSection';

export default function Hero() {
  const [filters, setFilters] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch(`${api}/states`);
        const data = await res.json();
        setStates(data.states || data || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchStates();
  }, [api]);

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setFilters(prev => ({ ...prev, state: stateId, city: '', area: '' }));

    try {
      if (!stateId) return setCities([]);
      const res = await fetch(`${api}/cities/${stateId}`);
      const data = await res.json();
      setCities(data.cities || data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setFilters(prev => ({ ...prev, city: cityId, area: '' }));

    try {
      if (!cityId) return setAreas([]);
      const res = await fetch(`${api}/areas/${cityId}`);
      const data = await res.json();
      setAreas(data.areas || data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFilterClick = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const clearFilters = () => setFilters({});

  // Quick filter options with 3D cards
  const quickFilters = [
    {
      name: 'Boys',
      icon: FaUsers,
      filterType: 'availableFor',
      value: 'Boys',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Girls',
      icon: FaUsers,
      filterType: 'availableFor',
      value: 'Girls',
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      name: 'Family',
      icon: FaHome,
      filterType: 'availableFor',
      value: 'Family',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Single',
      icon: FaBed,
      filterType: 'roomType',
      value: 'Single',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      name: 'Double',
      icon: FaBed,
      filterType: 'roomType',
      value: 'Double',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      name: 'Triple',
      icon: FaBed,
      filterType: 'roomType',
      value: 'Triple',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ];

  return (
    <>
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-100 py-6 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="text-center mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaBed className="text-3xl md:text-4xl text-orange-600" />
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Find Your Perfect{' '}
                <span className="text-orange-600 relative">
                  Room
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-300 rounded-full transform scale-x-0 animate-pulse"></div>
                </span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
              Find comfortable and affordable rooms for rent across India. 
              Your perfect room is just a click away.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8 md:mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by area, pincode, horoo id..."
                  className="w-full px-6 py-4 text-lg border-2 border-gray-400 rounded-full focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 shadow-lg text-gray-800 font-medium placeholder-gray-600"
                  onChange={handleSearchChange}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105">
                  <FaSearch className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <FaFilter className="text-lg text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-800">Search Filters</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                {/* Available For */}
                <select 
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 font-medium"
                  onChange={(e) => handleFilterClick('availableFor', e.target.value)}
                  value={filters.availableFor || ''}
                >
                  <option value="" className="text-gray-600">Available For</option>
                  <option value="Boys" className="text-gray-800">Boys</option>
                  <option value="Girls" className="text-gray-800">Girls</option>
                  <option value="Family" className="text-gray-800">Family</option>
                </select>

                {/* Room Type */}
                <select 
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 font-medium"
                  onChange={(e) => handleFilterClick('roomType', e.target.value)}
                  value={filters.roomType || ''}
                >
                  <option value="" className="text-gray-600">Room Type</option>
                  <option value="Single" className="text-gray-800">Single</option>
                  <option value="Double" className="text-gray-800">Double</option>
                  <option value="Triple" className="text-gray-800">Triple</option>
                </select>

                {/* State */}
                <select 
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 font-medium"
                  onChange={handleStateChange} 
                  value={filters.state || ''}
                >
                  <option value="" className="text-gray-600">Choose State</option>
                  {states.map(s => (
                    <option key={s._id || s.id} value={s._id || s.id} className="text-gray-800">{s.name}</option>
                  ))}
                </select>

                {/* City */}
                <select 
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 font-medium"
                  onChange={handleCityChange} 
                  value={filters.city || ''}
                >
                  <option value="" className="text-gray-600">Choose City</option>
                  {cities.map(c => (
                    <option key={c._id || c.id} value={c._id || c.id} className="text-gray-800">{c.name}</option>
                  ))}
                </select>

                {/* Area */}
                <select 
                  className="w-full px-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 font-medium"
                  onChange={(e) => setFilters(prev => ({ ...prev, area: e.target.value }))} 
                  value={filters.area || ''}
                >
                  <option value="" className="text-gray-600">Choose Area</option>
                  {areas.map(a => (
                    <option key={a._id || a.id} value={a._id || a.id} className="text-gray-800">{a.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={clearFilters}
                  className="px-6 py-3 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RoomCardSection filters={filters} />
    </>
  );
}
