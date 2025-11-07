"use client";
import { useEffect, useState } from 'react';
import RoomCard from '@/components/Home/cards/RoomCard';

export default function RoomCardSection({ filters = {} }) {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query params from filters
      const params = new URLSearchParams();
      if (filters?.state) params.append('state', filters.state);
      if (filters?.city) params.append('city', filters.city);
      if (filters?.area) params.append('area', filters.area);
      if (filters?.roomType) params.append('roomType', filters.roomType);
      if (filters?.availableFor) params.append('availableFor', filters.availableFor);
      if (filters?.search) params.append('search', filters.search);

      // Try both endpoints - first the user endpoint, then all rooms if no results
      let url = `${api}/rooms/filter-for-user?${params.toString()}`;
      console.log('Fetching rooms from:', url);

      let res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch rooms');
      
      let data = await res.json();
      let fetched = data.rooms || [];

      // If no rooms found in user endpoint, try the general rooms endpoint
      if (fetched.length === 0) {
        console.log('No rooms found in user endpoint, trying general endpoint...');
        url = `${api}/rooms`;
        res = await fetch(url);
        if (res.ok) {
          data = await res.json();
          fetched = data.rooms || [];
          console.log('Found', fetched.length, 'rooms from general endpoint');
        }
      }

      console.log('Final rooms count:', fetched.length);
      setRooms(fetched);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Error loading rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  if (loading) {
    return (
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-300 h-3 rounded w-1/2"></div>
                  <div className="bg-gray-300 h-3 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-2">⚠️ Error loading rooms</div>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={fetchRooms}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            {rooms.length > 0 ? `${rooms.length} Room${rooms.length !== 1 ? 's' : ''} Available` : 'Available Rooms'}
          </h2>
        </div>

        {/* Results Grid */}
        {rooms.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
            <p className="text-gray-600 mb-4">
              {filters && Object.keys(filters).length > 0 
                ? 'Try adjusting your search filters or check back later for new listings.' 
                : 'Check back later for new room listings.'}
            </p>
            <button 
              onClick={fetchRooms}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Refresh Results
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rooms.map((room) => (
              <div key={room._id || room.horooId} className="transform transition-all duration-200 hover:scale-105">
                <RoomCard {...room} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
