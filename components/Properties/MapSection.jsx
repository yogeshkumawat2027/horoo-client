"use client";
import { useEffect, useRef, useState } from 'react';
import { FaMap, FaDirections, FaLocationArrow, FaExternalLinkAlt, FaUser } from 'react-icons/fa';

export default function MapSection({ latitude, longitude, mapLink, propertyName, horooAddress }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const directionsLayerId = useRef('directions-route');
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingDirections, setIsLoadingDirections] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const [mapboxLoaded, setMapboxLoaded] = useState(false);

  // Extract coordinates from Google Maps link or use provided lat/lng
  useEffect(() => {
    // First priority: use provided latitude and longitude
    if (latitude && longitude) {
      setCoords({ 
        lat: typeof latitude === 'number' ? latitude : parseFloat(latitude), 
        lng: typeof longitude === 'number' ? longitude : parseFloat(longitude) 
      });
      return;
    }

    // Second priority: try to extract from mapLink
    if (mapLink) {
      // Try to extract coordinates from Google Maps link
      // Formats: 
      // 1. https://www.google.com/maps?q=28.7041,77.1025
      // 2. https://maps.google.com/?q=28.7041,77.1025
      // 3. https://www.google.com/maps/@28.7041,77.1025,15z
      // 4. https://goo.gl/maps/... (shortened, harder to extract)
      
      const patterns = [
        /[@?](-?\d+\.\d+),(-?\d+\.\d+)/,  // @lat,lng or ?q=lat,lng
        /q=(-?\d+\.\d+),(-?\d+\.\d+)/,     // q=lat,lng
      ];

      for (const pattern of patterns) {
        const match = mapLink.match(pattern);
        if (match) {
          setCoords({ lat: parseFloat(match[1]), lng: parseFloat(match[2]) });
          return;
        }
      }
    }
  }, [mapLink, latitude, longitude]);

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
    if (!mapboxLoaded || !mapContainerRef.current || !coords.lat || !coords.lng) return;

    const mapboxgl = window.mapboxgl;
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!accessToken) {
      console.warn('Mapbox token not found. Please add NEXT_PUBLIC_MAPBOX_TOKEN to .env');
      return;
    }

    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [coords.lng, coords.lat],
      zoom: 14
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add property marker with popup always open
    const popup = new mapboxgl.Popup({ 
      offset: 25,
      closeButton: false,
      closeOnClick: false,
      maxWidth: '280px'
    }).setHTML(`
      <div style="padding: 8px; max-width: 260px;">
        <div style="font-weight: 600; color: #ea580c; font-size: 14px; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${propertyName}
        </div>
        <div style="font-size: 12px; color: #4b5563; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${horooAddress || 'Property Location'}
        </div>
      </div>
    `);

    new mapboxgl.Marker({ color: '#ea580c' })
      .setLngLat([coords.lng, coords.lat])
      .setPopup(popup)
      .addTo(map)
      .togglePopup(); // Open popup by default

    // Add click event to mark location
    map.on('click', (e) => {
      const clickedLat = e.lngLat.lat;
      const clickedLng = e.lngLat.lng;

      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }

      // Create custom user icon marker
      const el = document.createElement('div');
      el.className = 'custom-user-marker';
      el.innerHTML = '<div style="background: #3b82f6; border: 3px solid white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg style="width: 20px; height: 20px; fill: white;" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg></div>';

      userMarkerRef.current = new mapboxgl.Marker({ element: el })
        .setLngLat([clickedLng, clickedLat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML('<div class="p-2"><strong>Your Location</strong></div>')
        )
        .addTo(map);

      setUserLocation({ lat: clickedLat, lng: clickedLng });
      setRouteInfo(null); // Clear route info when location changes
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapboxLoaded, coords, propertyName, horooAddress]);

  // Use current location (GPS)
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        setUserLocation({ lat: userLat, lng: userLng });
        setIsLoadingLocation(false);
        setRouteInfo(null); // Clear route info

        if (userMarkerRef.current) {
          userMarkerRef.current.remove();
        }

        if (mapRef.current && window.mapboxgl) {
          const mapboxgl = window.mapboxgl;
          
          // Create custom user icon marker
          const el = document.createElement('div');
          el.className = 'custom-user-marker';
          el.innerHTML = '<div style="background: #3b82f6; border: 3px solid white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg style="width: 20px; height: 20px; fill: white;" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg></div>';

          userMarkerRef.current = new mapboxgl.Marker({ element: el })
            .setLngLat([userLng, userLat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML('<div class="p-2"><strong>Your Location</strong></div>')
            )
            .addTo(mapRef.current);

          const bounds = new mapboxgl.LngLatBounds();
          bounds.extend([coords.lng, coords.lat]);
          bounds.extend([userLng, userLat]);
          
          mapRef.current.fitBounds(bounds, {
            padding: 50,
            maxZoom: 14
          });
        }
      },
      (error) => {
        setIsLoadingLocation(false);
        // Silently handle location errors (permission denied, timeout, etc.)
      }
    );
  };

  // Get directions on map
  const handleGetDirections = async () => {
    if (!coords.lat || !coords.lng || !mapRef.current) return;

    if (!userLocation) {
      return;
    }

    setIsLoadingDirections(true);
    setRouteInfo(null);

    try {
      const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.lng},${userLocation.lat};${coords.lng},${coords.lat}?geometries=geojson&access_token=${accessToken}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const geojson = {
          type: 'Feature',
          properties: {},
          geometry: route.geometry
        };

        const map = mapRef.current;

        if (map.getLayer(directionsLayerId.current)) {
          map.removeLayer(directionsLayerId.current);
        }
        if (map.getSource(directionsLayerId.current)) {
          map.removeSource(directionsLayerId.current);
        }

        map.addSource(directionsLayerId.current, {
          type: 'geojson',
          data: geojson
        });

        map.addLayer({
          id: directionsLayerId.current,
          type: 'line',
          source: directionsLayerId.current,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3b82f6',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });

        const coordinates = geojson.geometry.coordinates;
        const bounds = coordinates.reduce((bounds, coord) => {
          return bounds.extend(coord);
        }, new window.mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.fitBounds(bounds, {
          padding: 50
        });

        // Set route info to display below map
        const distance = (route.distance / 1000).toFixed(1);
        const duration = Math.round(route.duration / 60);
        setRouteInfo({ distance, duration });
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    } finally {
      setIsLoadingDirections(false);
    }
  };

  // Open in Google Maps
  const handleOpenGoogleMaps = () => {
    if (!coords.lat || !coords.lng) return;

    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${coords.lat},${coords.lng}`;
      window.open(url, '_blank');
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
      window.open(url, '_blank');
    }
  };

  if (!coords.lat || !coords.lng) {
    return null;
  }

  return (
    <div className="bg-white p-4 md:p-6 border-t border-gray-100">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
        <FaMap className="text-orange-600" />
        Location Map
      </h3>

      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-3 bg-gray-100 shadow-sm"
        style={{ minHeight: '256px' }}
      />

      {/* Route Info */}
      {routeInfo && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-gray-600">Distance</p>
                <p className="text-lg font-bold text-blue-700">{routeInfo.distance} km</p>
              </div>
              <div className="w-px h-10 bg-blue-300"></div>
              <div>
                <p className="text-xs text-gray-600">Duration</p>
                <p className="text-lg font-bold text-blue-700">{routeInfo.duration} min</p>
              </div>
            </div>
            <FaDirections className="text-2xl text-blue-600" />
          </div>
        </div>
      )}

      {/* Action Buttons - All in One Row */}
      <div className="grid grid-cols-3 gap-2">
        {/* Use Current Location Button */}
        <button
          onClick={handleUseCurrentLocation}
          disabled={isLoadingLocation}
          className="flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-3 rounded-lg font-medium transition-all shadow-sm hover:shadow-md disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
          title="Use Current Location"
        >
          <FaLocationArrow className="text-lg" />
          <span className="text-xs font-semibold whitespace-nowrap">
            {isLoadingLocation ? 'Loading...' : 'My Location'}
          </span>
        </button>

        {/* Get Directions Button */}
        <button
          onClick={handleGetDirections}
          disabled={isLoadingDirections}
          className="flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-3 py-3 rounded-lg font-medium transition-all shadow-sm hover:shadow-md disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
          title="Get Directions"
        >
          <FaDirections className="text-lg" />
          <span className="text-xs font-semibold whitespace-nowrap">
            {isLoadingDirections ? 'Loading...' : 'Directions'}
          </span>
        </button>

        {/* Open in Google Maps Button */}
        <button
          onClick={handleOpenGoogleMaps}
          className="flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-3 py-3 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
          title="Open in Google Maps"
        >
          <FaExternalLinkAlt className="text-lg" />
          <span className="text-xs font-semibold whitespace-nowrap">Google Maps</span>
        </button>
      </div>

      {!mapboxLoaded && (
        <div className="text-center text-sm text-gray-500 mt-2">
          Loading map...
        </div>
      )}
    </div>
  );
}
