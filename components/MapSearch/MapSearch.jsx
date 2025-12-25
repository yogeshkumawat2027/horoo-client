"use client";
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaArrowLeft, FaSearch, FaLocationArrow, FaTimes, FaRupeeSign, FaBed, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function MapSearch({ 
  propertyType = 'flat', // flat, room, hotel, hostel, house, mess, commercial
  apiEndpoint = 'flats-for-user',
  detailPagePath = '/flats',
  title = 'Smart Map Search'
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const markersRef = useRef([]);
  
  const [mapboxLoaded, setMapboxLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRange, setSelectedRange] = useState(5000); // Default 5km in meters
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Delhi locations with coordinates
  const delhiLocations = [
    { name: 'Connaught Place, Central Delhi', lat: 28.7041, lng: 77.1025 },
    { name: 'Chandni Chowk, Old Delhi', lat: 28.6562, lng: 77.2410 },
    { name: 'India Gate, Central Delhi', lat: 28.6289, lng: 77.2065 },
    { name: 'Lajpat Nagar, South Delhi', lat: 28.5677, lng: 77.2431 },
    { name: 'Saket, South Delhi', lat: 28.5245, lng: 77.2066 },
    { name: 'Karol Bagh, West Delhi', lat: 28.6519, lng: 77.1909 },
    { name: 'Dwarka Sector 10, West Delhi', lat: 28.5921, lng: 77.0460 },
    { name: 'Mayur Vihar, East Delhi', lat: 28.6127, lng: 77.2773 },
    { name: 'Vasant Kunj, South Delhi', lat: 28.5177, lng: 77.1593 },
    { name: 'Rohini, North Delhi', lat: 28.7458, lng: 77.1189 },
    { name: 'Nehru Place, South Delhi', lat: 28.5494, lng: 77.2501 },
    { name: 'Rajiv Chowk Metro Station', lat: 28.6328, lng: 77.2197 },
    { name: 'Kashmere Gate, North Delhi', lat: 28.6676, lng: 77.2273 },
    { name: 'Greater Kailash, South Delhi', lat: 28.5494, lng: 77.2424 },
    { name: 'Pitampura, North Delhi', lat: 28.6957, lng: 77.1310 }
  ];

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchContainerRef = useRef(null);

  const ranges = [
    { label: '100m', value: 100 },
    { label: '500m', value: 500 },
    { label: '1km', value: 1000 },
    { label: '2km', value: 2000 },
    { label: '3km', value: 3000 },
    { label: '5km', value: 5000 },
    { label: '10km', value: 10000 },
    { label: '15km', value: 15000 },
    { label: '20km', value: 20000 }
  ];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Load all properties on mount
  useEffect(() => {
    fetchAllProperties();
  }, []);

  // Auto-search for area if provided in URL
  useEffect(() => {
    const areaParam = searchParams.get('area');
    if (areaParam && mapboxLoaded && mapRef.current) {
      setSearchQuery(areaParam);
      // Wait a bit for map to be ready, then search
      setTimeout(() => {
        handleSearch(areaParam);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, mapboxLoaded]);

  // Load Mapbox GL JS
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.mapboxgl) {
      const link = document.createElement('link');
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
      script.async = true;
      script.onload = () => setMapboxLoaded(true);
      document.body.appendChild(script);
    } else if (window.mapboxgl) {
      setMapboxLoaded(true);
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapboxLoaded || !mapContainerRef.current || mapRef.current) return;

    const mapboxgl = window.mapboxgl;
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!accessToken) {
      console.warn('Mapbox token not found');
      return;
    }

    mapboxgl.accessToken = accessToken;

    // Default center (Delhi)
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [77.2090, 28.6139],
      zoom: 11
    });

    map.on('load', () => {
      mapRef.current = map;
    });

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      updateUserLocation(lat, lng);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapboxLoaded]);

  // Filter properties when range or user location changes
  useEffect(() => {
    if (userLocation) {
      filterPropertiesByDistance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange, userLocation, properties]);

  const fetchAllProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/${apiEndpoint}`);
      const data = await res.json();
      
      if (data.success) {
        const propertyData = data[`${propertyType}s`] || data.properties || [];
        setProperties(propertyData);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const filterPropertiesByDistance = () => {
    if (!userLocation) {
      setFilteredProperties([]);
      return;
    }

    const nearby = properties.filter(property => {
      if (!property.latitude || !property.longitude) return false;
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        property.latitude,
        property.longitude
      );
      return distance <= selectedRange;
    });

    setFilteredProperties(nearby);
    displayPropertiesOnMap(nearby);
  };

  const displayPropertiesOnMap = (propertiesToShow) => {
    if (!mapRef.current || !window.mapboxgl) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    const mapboxgl = window.mapboxgl;

    propertiesToShow.forEach(property => {
      // Calculate distance from user if location is set
      let distanceText = '';
      if (userLocation) {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          property.latitude,
          property.longitude
        );
        const distanceKm = (distance / 1000).toFixed(2);
        distanceText = `${distanceKm} km away`;
      }

      // Format address
      const addressParts = [];
      if (property.area?.name) addressParts.push(property.area.name);
      if (property.city?.name) addressParts.push(property.city.name);
      const addressText = addressParts.join(', ') || property.horooAddress || 'Location not specified';

      // Create marker element
      const el = document.createElement('div');
      el.className = 'property-marker';
      el.innerHTML = `
        <div style="background: white; color: #1f2937; padding: 12px; border-radius: 12px; font-size: 12px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2); min-width: 200px; max-width: 250px; border: 2px solid #ea580c;">
          <div style="font-size: 13px; font-weight: 700; color: #ea580c; margin-bottom: 6px; line-height: 1.3;">${property.horooName}</div>
          <div style="font-size: 11px; color: #6b7280; margin-bottom: 6px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${addressText}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb;">
            <div style="font-size: 15px; font-weight: 700; color: #ea580c;">₹${property.horooPrice?.toLocaleString()}<span style="font-size: 10px; font-weight: 500; color: #6b7280;">/mo</span></div>
            ${distanceText ? `<div style="font-size: 11px; color: #059669; font-weight: 600; background: #d1fae5; padding: 3px 8px; border-radius: 6px;">${distanceText}</div>` : ''}
          </div>
        </div>
      `;

      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedProperty(property);
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([property.longitude, property.latitude])
        .addTo(mapRef.current);

      markersRef.current.push(marker);
    });

    // Fit bounds to show all properties
    if (propertiesToShow.length > 0 && userLocation) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([userLocation.lng, userLocation.lat]);
      propertiesToShow.forEach(property => {
        bounds.extend([property.longitude, property.latitude]);
      });
      mapRef.current.fitBounds(bounds, { padding: 100, maxZoom: 14 });
    }
  };

  const updateUserLocation = (lat, lng) => {
    setUserLocation({ lat, lng });

    if (!mapRef.current || !window.mapboxgl) return;

    const mapboxgl = window.mapboxgl;

    // Remove existing user marker
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    // Create custom user marker
    const el = document.createElement('div');
    el.innerHTML = '<div style="background: #3b82f6; border: 3px solid white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg style="width: 20px; height: 20px; fill: white;" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg></div>';

    userMarkerRef.current = new mapboxgl.Marker({ element: el })
      .setLngLat([lng, lat])
      .addTo(mapRef.current);

    mapRef.current.flyTo({
      center: [lng, lat],
      zoom: 13,
      essential: true
    });
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateUserLocation(latitude, longitude);
        setLoading(false);
      },
      (error) => {
        // Silent error handling
        setLoading(false);
      }
    );
  };

  const handleSearch = async (customQuery = null) => {
    const query = customQuery || searchQuery;
    if (!query.trim()) return;

    // Check if it's a suggestion from our list
    const localLocation = delhiLocations.find(loc => 
      loc.name.toLowerCase().includes(query.toLowerCase()) || 
      query.toLowerCase().includes(loc.name.toLowerCase())
    );

    if (localLocation) {
      updateUserLocation(localLocation.lat, localLocation.lng);
      setShowSuggestions(false);
      return;
    }

    // Otherwise, use Mapbox geocoding
    setLoading(true);
    try {
      const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${accessToken}&limit=1`
      );
      const data = await res.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        updateUserLocation(lat, lng);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
      setShowSuggestions(false);
    }
  };

  const handleSearchInputChange = async (value) => {
    setSearchQuery(value);
    
    if (value.trim().length > 2) {
      // Use Mapbox Geocoding API for global suggestions
      try {
        const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${accessToken}&limit=5`
        );
        const data = await res.json();

        if (data.features && data.features.length > 0) {
          const suggestions = data.features.map(feature => ({
            name: feature.place_name,
            lat: feature.center[1],
            lng: feature.center[0]
          }));
          setFilteredSuggestions(suggestions);
          setShowSuggestions(true);
        } else {
          setFilteredSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      // Hide suggestions when less than 3 characters
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchFocus = () => {
    // Show Delhi locations when focusing on empty search
    if (searchQuery.trim().length === 0) {
      setFilteredSuggestions(delhiLocations);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (location) => {
    setSearchQuery(location.name);
    updateUserLocation(location.lat, location.lng);
    setShowSuggestions(false);
  };

  const handlePropertyClick = (property) => {
    router.push(`${detailPagePath}/${property.slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-lg transition-colors"
              title="Go Back"
            >
              <FaArrowLeft className="text-gray-600 text-lg" />
            </button>
            <h1 className="text-lg md:text-2xl font-bold text-gray-800">{title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search and Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <div className="space-y-3">
            {/* Search Bar with Suggestions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative" ref={searchContainerRef}>
                <div className="bg-gray-50 rounded-lg border-2 border-gray-200 overflow-hidden flex focus-within:border-orange-500 transition-all">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    onFocus={handleSearchFocus}
                    placeholder="Search any location (e.g., Delhi, Jaipur, Mumbai)..."
                    className="flex-1 px-4 py-3 text-sm md:text-base bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
                  />
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-4 md:px-6 transition-colors"
                    title="Search"
                  >
                    <FaSearch className="text-sm md:text-base" />
                  </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 max-h-64 overflow-y-auto z-30">
                    {filteredSuggestions.map((location, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(location)}
                        className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                      >
                        <FaLocationArrow className="text-orange-500 flex-shrink-0" />
                        <span className="text-sm md:text-base text-gray-700">{location.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleUseCurrentLocation}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 font-medium text-sm md:text-base whitespace-nowrap"
                title="Use Current Location"
              >
                <FaLocationArrow />
                <span>My Location</span>
              </button>
            </div>

            {/* Range Selector */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Range:</span>
                <div className="flex flex-wrap gap-2">
                  {ranges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => setSelectedRange(range.value)}
                      className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
                        selectedRange === range.value
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 lg:border-r-0">
            <div
              ref={mapContainerRef}
              className="w-full h-[500px] md:h-[600px]"
            />
          </div>

          {/* Info Panel */}
          <div className="hidden lg:block bg-white rounded-xl shadow-lg p-5 overflow-y-auto max-h-[600px]">
            <div className="space-y-4">
              {/* How to Use */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">How to Use</h3>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                  <li>Search for a location or use GPS</li>
                  <li>Click on map to mark your location</li>
                  <li>Select distance range</li>
                  <li>View nearby properties on map</li>
                  <li>Click marker or list item for details</li>
                </ol>
              </div>

              {/* Nearby Properties */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  Nearby Properties ({filteredProperties.length})
                </h3>
                {userLocation ? (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {filteredProperties.slice(0, 10).map((property) => {
                      const distance = calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        property.latitude,
                        property.longitude
                      );
                      const distanceKm = (distance / 1000).toFixed(2);

                      return (
                        <div
                          key={property._id}
                          onClick={() => setSelectedProperty(property)}
                          className="p-3 bg-gray-50 rounded-lg hover:bg-orange-50 cursor-pointer transition-all border border-gray-200 hover:border-orange-300"
                        >
                          <h4 className="font-semibold text-sm text-gray-800 line-clamp-1 mb-1">
                            {property.horooName}
                          </h4>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-orange-600 font-bold">
                              ₹{property.horooPrice?.toLocaleString()}
                            </span>
                            <span className="text-green-600 font-medium">
                              {distanceKm} km
                            </span>
                          </div>
                          {property.flatType && property.flatType.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              {property.flatType[0]}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800 font-medium mb-2">
                      📍 Get Started
                    </p>
                    <p className="text-xs text-blue-700">
                      Mark your location on the map to discover nearby properties
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details Popup - Matching Card Design */}
      {selectedProperty && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 group">
            {/* Close Button - Top Right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProperty(null);
              }}
              className="absolute top-3 right-3 z-10 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow-lg transition-all"
              title="Close"
            >
              <FaTimes className="text-lg" />
            </button>

            {/* Clickable Card Content */}
            <div className="cursor-pointer" onClick={() => handlePropertyClick(selectedProperty)}>
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={selectedProperty.mainImage || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'}
                  alt={selectedProperty.horooName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content Section */}
              <div className="p-5">
                {/* Property Name and Rating */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-orange-600 transition-colors flex-1">
                    {selectedProperty.horooName}
                  </h3>
                  
                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg ml-2">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="text-sm font-bold text-gray-800">
                      {selectedProperty.averageRating?.toFixed(1) || '3.5'}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({selectedProperty.totalRatings || 0})
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 mb-3">
                  <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0" />
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {selectedProperty.area?.name && selectedProperty.city?.name && (
                      <div className="font-medium">{selectedProperty.area.name}, {selectedProperty.city.name}</div>
                    )}
                    {selectedProperty.state?.name && selectedProperty.pincode && (
                      <div className="text-xs text-gray-500">{selectedProperty.state.name}, {selectedProperty.pincode}</div>
                    )}
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-2 mb-4">
                  {selectedProperty.flatType && selectedProperty.flatType.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">Type:</span>
                      <span className="text-xs text-gray-700 bg-blue-100 px-2 py-1 rounded">
                        {selectedProperty.flatType.join(', ')}
                      </span>
                    </div>
                  )}
                  
                  {selectedProperty.availableFor && selectedProperty.availableFor.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">Available For:</span>
                      <span className="text-xs text-gray-700 bg-green-100 px-2 py-1 rounded">
                        {selectedProperty.availableFor.join(' • ')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Pricing Section */}
                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    {/* Horoo Price (with strike-through) */}
                    {selectedProperty.ownerPrice && selectedProperty.horooPrice && selectedProperty.horooPrice > selectedProperty.ownerPrice && (
                      <div className="flex items-center text-gray-500">
                        <FaRupeeSign className="text-xs" />
                        <span className="text-sm line-through">
                          {selectedProperty.horooPrice.toLocaleString()}
                        </span>
                      </div>
                    )}
                    
                    {/* Owner Price (main price) */}
                    <div className="flex items-center text-orange-600">
                      <FaRupeeSign className="text-sm font-bold" />
                      <span className="text-xl font-bold">
                        {(selectedProperty.ownerPrice || selectedProperty.horooPrice)?.toLocaleString() || 'Price on request'}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/month</span>
                    </div>
                  </div>
                  
                  {/* Discount Badge */}
                  {selectedProperty.horooPrice && selectedProperty.ownerPrice && selectedProperty.horooPrice !== selectedProperty.ownerPrice && (
                    <div className="mt-1">
                      <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">
                        Save ₹{(selectedProperty.horooPrice - selectedProperty.ownerPrice).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <button
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  View Full Details →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
