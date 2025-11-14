"use client";
import { useEffect, useState } from 'react';
import {
  FaBed,
  FaUsers,
  FaHome,
  FaUserFriends,
  FaMapMarkerAlt,
  FaTimes,
  FaSyncAlt,
  FaBuilding,
  FaCity,
  FaChevronDown
} from 'react-icons/fa';
import CommercialCard from '@/components/Home/cards/CommercialCard';

const API = 'http://localhost:5000/api';

export default function CommercialPage() {
  // State management
  const [filters, setFilters] = useState({
    state: '',
    city: '',
    area: ''
  });
  
  const [locations, setLocations] = useState({
    states: [],
    cities: [],
    areas: []
  });
  
  const [commercials, setCommercials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch states on mount
  useEffect(() => {
    fetchStates();
    fetchCommercials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch commercials when filters change
  useEffect(() => {
    fetchCommercials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // Fetch all states
  const fetchStates = async () => {
    try {
      const res = await fetch(`${API}/states`);
      const data = await res.json();
      if (data.success) {
        setLocations(prev => ({ ...prev, states: data.states || [] }));
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  // Fetch cities by state
  const fetchCities = async (stateId) => {
    try {
      const res = await fetch(`${API}/cities/${stateId}`);
      const data = await res.json();
      if (data.success) {
        setLocations(prev => ({ ...prev, cities: data.cities || [], areas: [] }));
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  // Fetch areas by city
  const fetchAreas = async (cityId) => {
    try {
      const res = await fetch(`${API}/areas/${cityId}`);
      const data = await res.json();
      if (data.success) {
        setLocations(prev => ({ ...prev, areas: data.areas || [] }));
      }
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  };

  // Fetch commercials with filters
  const fetchCommercials = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.state) params.append('state', filters.state);
      if (filters.city) params.append('city', filters.city);
      if (filters.area) params.append('area', filters.area);

      const hasFilters = Object.values(filters).some(v => v !== '');
      const url = hasFilters 
        ? `${API}/commercial/filter-for-user?${params.toString()}`
        : `${API}/commercial-for-user`;

      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setCommercials(data.commercials || []);
      }
    } catch (error) {
      console.error('Error fetching commercials:', error);
      setCommercials([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle state change
  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setFilters(prev => ({ ...prev, state: stateId, city: '', area: '' }));
    setLocations(prev => ({ ...prev, cities: [], areas: [] }));
    if (stateId) {
      fetchCities(stateId);
    }
  };

  // Handle city change
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setFilters(prev => ({ ...prev, city: cityId, area: '' }));
    setLocations(prev => ({ ...prev, areas: [] }));
    if (cityId) {
      fetchAreas(cityId);
    }
  };

  // Handle area change
  const handleAreaChange = (e) => {
    setFilters(prev => ({ ...prev, area: e.target.value }));
  };

  // Handle quick filter toggle
  const handleQuickFilter = (value, type) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? '' : value
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      state: '',
      city: '',
      area: ''
    });
    setLocations(prev => ({ ...prev, cities: [], areas: [] }));
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Hero Section with Filters - Compact Version */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-100 py-3 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Content - Hidden on Mobile */}
          <div className="text-center mb-4 hidden md:block">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 leading-tight">
              Find Your Perfect{' '}
              <span className="text-orange-600 relative">
                Commercial
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-orange-300 rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
              Discover comfortable and affordable commercials across India
            </p>
          </div>

          {/* Compact Filters Section - Single Line */}
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-3 md:p-5 border border-gray-100">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              
              {/* State Dropdown */}
              <div className="relative flex-1 min-w-[140px] basis-[calc(50%-0.25rem)] md:basis-auto">
                <FaMapMarkerAlt className="absolute left-2.5 top-1/2 -translate-y-1/2 text-orange-600 text-xs pointer-events-none z-10" />
                <FaChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none z-10" />
                <select
                  value={filters.state}
                  onChange={handleStateChange}
                  className="w-full pl-8 pr-7 py-2 md:py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 text-xs md:text-sm font-medium transition-all cursor-pointer hover:border-orange-400 appearance-none"
                >
                  <option value="">State</option>
                  {locations.states.map(state => (
                    <option key={state._id} value={state._id}>{state.name}</option>
                  ))}
                </select>
              </div>

              {/* City Dropdown */}
              <div className="relative flex-1 min-w-[140px] basis-[calc(50%-0.25rem)] md:basis-auto">
                <FaCity className="absolute left-2.5 top-1/2 -translate-y-1/2 text-orange-600 text-xs pointer-events-none z-10" />
                <FaChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none z-10" />
                <select
                  value={filters.city}
                  onChange={handleCityChange}
                  disabled={!filters.state}
                  className="w-full pl-8 pr-7 py-2 md:py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 text-xs md:text-sm font-medium transition-all cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 hover:border-orange-400 appearance-none"
                >
                  <option value="">City</option>
                  {locations.cities.map(city => (
                    <option key={city._id} value={city._id}>{city.name}</option>
                  ))}
                </select>
              </div>

              {/* Area Dropdown */}
              <div className="relative flex-1 min-w-[140px] basis-full md:basis-auto">
                <FaBuilding className="absolute left-2.5 top-1/2 -translate-y-1/2 text-orange-600 text-xs pointer-events-none z-10" />
                <FaChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none z-10" />
                <select
                  value={filters.area}
                  onChange={handleAreaChange}
                  disabled={!filters.city}
                  className="w-full pl-8 pr-7 py-2 md:py-2.5 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 text-xs md:text-sm font-medium transition-all cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 hover:border-orange-400 appearance-none"
                >
                  <option value="">Area</option>
                  {locations.areas.map(area => (
                    <option key={area._id} value={area._id}>{area.name}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="basis-full md:basis-auto flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all text-sm font-medium shadow-md hover:shadow-lg"
                >
                  <FaTimes />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-4 md:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Results Header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 flex items-center gap-2 md:gap-3">
               {/* <span className="text-orange-600">{Commercials.length}</span>  */}
                <span>Commercials</span>
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                {hasActiveFilters ? 'Filtered results' : 'All available commercials'}
              </p>
            </div>
            {/* <button
              onClick={fetchCommercials}
              disabled={loading}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-orange-500 hover:text-orange-600 transition-all text-sm font-semibold shadow-md hover:shadow-lg disabled:opacity-50"
            >
              <FaSyncAlt className={loading ? 'animate-spin' : ''} />
              Refresh
            </button> */}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-56"></div>
                  <div className="p-5 space-y-3">
                    <div className="bg-gray-200 h-5 rounded-lg w-3/4"></div>
                    <div className="bg-gray-200 h-4 rounded-lg w-1/2"></div>
                    <div className="bg-gray-200 h-4 rounded-lg w-2/3"></div>
                    <div className="flex gap-2 mt-4">
                      <div className="bg-gray-200 h-8 rounded-lg flex-1"></div>
                      <div className="bg-gray-200 h-8 rounded-lg flex-1"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && commercials.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full mb-6">
                <FaBed className="text-5xl text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Commercials Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {hasActiveFilters 
                  ? 'Try adjusting your filters to see more results' 
                  : 'No commercials are currently available'}
              </p>
              {hasActiveFilters && (
                <button 
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaTimes />
                  Clear All Filters
                </button>
              )}
            </div>
          )}

          {/* Commercial Grid */}
          {!loading && commercials.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {commercials.map((commercial) => (
                <div 
                  key={commercial._id || commercial.horooId} 
                  className="transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
                >
                  <CommercialCard {...commercial} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
