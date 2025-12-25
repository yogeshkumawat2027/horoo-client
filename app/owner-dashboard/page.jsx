"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaBuilding, FaBed, FaHome, FaWarehouse, FaHotel, FaUserFriends, FaPlus, FaMapMarkerAlt } from 'react-icons/fa';

export default function OwnerDashboardPage() {
  const router = useRouter();
  const [ownerData, setOwnerData] = useState(null);
  const [listings, setListings] = useState({
    flats: [],
    rooms: [],
    commercials: [],
    houses: [],
    hostels: [],
    hotelRooms: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('ownerToken');
    const owner = localStorage.getItem('ownerData');
    
    if (!token || !owner || owner === 'undefined' || owner === 'null') {
      router.push('/list-rental');
      return;
    }
    
    try {
      const parsedOwner = JSON.parse(owner);
      if (!parsedOwner || !parsedOwner.mobile) {
        router.push('/list-rental');
        return;
      }
      setOwnerData(parsedOwner);
      fetchOwnerListings(parsedOwner.mobile);
    } catch (error) {
      console.error('Error parsing owner data:', error);
      localStorage.removeItem('ownerToken');
      localStorage.removeItem('ownerData');
      router.push('/list-rental');
    }
  }, [router]);

  const fetchOwnerListings = async (mobile) => {
    setLoading(true);
    try {
      const [flatsRes, roomsRes, commercialsRes, housesRes, hostelsRes, hotelRoomsRes] = await Promise.all([
        fetch(`http://localhost:5000/api/flats?ownerMobile=${mobile}`).catch(() => ({ ok: false })),
        fetch(`http://localhost:5000/api/rooms?ownerMobile=${mobile}`).catch(() => ({ ok: false })),
        fetch(`http://localhost:5000/api/commercials?ownerMobile=${mobile}`).catch(() => ({ ok: false })),
        fetch(`http://localhost:5000/api/houses?ownerMobile=${mobile}`).catch(() => ({ ok: false })),
        fetch(`http://localhost:5000/api/hostels?ownerMobile=${mobile}`).catch(() => ({ ok: false })),
        fetch(`http://localhost:5000/api/hotel-rooms?ownerMobile=${mobile}`).catch(() => ({ ok: false }))
      ]);

      const newListings = {
        flats: flatsRes.ok ? (await flatsRes.json()).flats || [] : [],
        rooms: roomsRes.ok ? (await roomsRes.json()).rooms || [] : [],
        commercials: commercialsRes.ok ? (await commercialsRes.json()).commercials || [] : [],
        houses: housesRes.ok ? (await housesRes.json()).houses || [] : [],
        hostels: hostelsRes.ok ? (await hostelsRes.json()).hostels || [] : [],
        hotelRooms: hotelRoomsRes.ok ? (await hotelRoomsRes.json()).hotelRooms || [] : []
      };

      setListings(newListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ownerToken');
    localStorage.removeItem('ownerData');
    router.push('/list-rental');
  };

  const getAllListings = () => {
    return [
      ...listings.flats.map(item => ({ ...item, type: 'flat', typeName: 'Flat', route: 'flats' })),
      ...listings.rooms.map(item => ({ ...item, type: 'room', typeName: 'Room', route: 'rooms' })),
      ...listings.commercials.map(item => ({ ...item, type: 'commercial', typeName: 'Commercial', route: 'commercials' })),
      ...listings.houses.map(item => ({ ...item, type: 'house', typeName: 'House', route: 'house' })),
      ...listings.hostels.map(item => ({ ...item, type: 'hostel', typeName: 'Hostel', route: 'hostels' })),
      ...listings.hotelRooms.map(item => ({ ...item, type: 'hotel', typeName: 'Hotel Room', route: 'hotels' }))
    ];
  };

  const getFilteredListings = () => {
    if (activeTab === 'all') return getAllListings();
    
    const typeMap = {
      flats: { items: listings.flats, type: 'flat', typeName: 'Flat', route: 'flats' },
      rooms: { items: listings.rooms, type: 'room', typeName: 'Room', route: 'rooms' },
      commercials: { items: listings.commercials, type: 'commercial', typeName: 'Commercial', route: 'commercials' },
      houses: { items: listings.houses, type: 'house', typeName: 'House', route: 'house' },
      hostels: { items: listings.hostels, type: 'hostel', typeName: 'Hostel', route: 'hostels' },
      hotels: { items: listings.hotelRooms, type: 'hotel', typeName: 'Hotel Room', route: 'hotels' }
    };
    
    const selected = typeMap[activeTab];
    return selected ? selected.items.map(item => ({ ...item, type: selected.type, typeName: selected.typeName, route: selected.route })) : [];
  };

  const getPublicUrl = (listing) => {
    return `/${listing.route}/${listing.slug || listing._id}`;
  };

  if (!ownerData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const filteredListings = getFilteredListings();

  const listingTypes = [
    { id: 'flats', label: 'Flats', icon: FaBuilding, count: listings.flats.length, route: '/owner-dashboard/addflat', color: 'blue' },
    { id: 'rooms', label: 'Rooms', icon: FaBed, count: listings.rooms.length, route: '/owner-dashboard/addroom', color: 'green' },
    { id: 'houses', label: 'Houses', icon: FaHome, count: listings.houses.length, route: '/owner-dashboard/addhouse', color: 'orange' },
    { id: 'commercials', label: 'Commercials', icon: FaWarehouse, count: listings.commercials.length, route: '/owner-dashboard/addcommercial', color: 'purple' },
    { id: 'hostels', label: 'Hostels', icon: FaUserFriends, count: listings.hostels.length, route: '/owner-dashboard/addhostel', color: 'pink' },
    { id: 'hotels', label: 'Hotel Rooms', icon: FaHotel, count: listings.hotelRooms.length, route: '/owner-dashboard/addhotel', color: 'indigo' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
              <p className="mt-1 text-sm text-gray-600">Welcome back, {ownerData.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-orange-600 hover:text-orange-700 font-semibold transition duration-200"
              >
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add New Listing Buttons */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Listing</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {listingTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <Link
                  key={type.id}
                  href={type.route}
                  className="bg-white border-2 border-gray-200 hover:border-orange-500 rounded-lg p-4 text-center transition-all duration-200 hover:shadow-lg group"
                >
                  <IconComponent className="text-3xl text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-semibold text-gray-700 mb-1">{type.label}</p>
                  <div className="flex items-center justify-center space-x-1 text-orange-600">
                    <FaPlus className="text-xs" />
                    <span className="text-xs font-medium">Add New</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              {getAllListings().length > 0 && (
                <button
                  onClick={() => setActiveTab('all')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'all'
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  All Listings ({getAllListings().length})
                </button>
              )}
              {listingTypes.filter(tab => tab.count > 0).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-orange-600 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your listings...</p>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {activeTab === 'all' ? 'No Listings Yet' : `No ${listingTypes.find(t => t.id === activeTab)?.label} Yet`}
            </h3>
            <p className="text-gray-600 mb-6">Start adding your rental properties to get started!</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing, index) => (
                <Link
                  key={`${listing.type}-${listing._id}-${index}`}
                  href={getPublicUrl(listing)}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-52 bg-gray-200 overflow-hidden">
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.propertyName || listing.title || listing.name || listing.flatName || listing.roomName || 'Property'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="text-6xl">🏠</div>
                      </div>
                    )}
                    {/* Type Badge */}
                    <div className="absolute top-3 right-3 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                      {listing.typeName}
                    </div>
                    {/* Price Badge */}
                    {(listing.rent || listing.price || listing.monthlyRent) && (
                      <div className="absolute bottom-3 left-3 bg-white bg-opacity-95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                        <p className="text-xs text-gray-600 mb-0.5">Monthly Rent</p>
                        <p className="text-lg font-bold text-orange-600">
                          ₹{listing.rent || listing.price || listing.monthlyRent}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Property Name */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
                      {listing.propertyName || listing.title || listing.name || listing.flatName || listing.roomName || listing.hostelName || listing.hotelName || listing.houseName || listing.commercialName || listing.messName || 'Property Listing'}
                    </h3>
                    
                    {/* Location */}
                    <div className="flex items-start space-x-2 text-gray-600 mb-4">
                      <FaMapMarkerAlt className="text-orange-600 mt-1 flex-shrink-0 text-sm" />
                      <p className="text-sm line-clamp-2 leading-relaxed">
                        {listing.fullAddress || 
                         listing.address || 
                         listing.location || 
                         (typeof listing.area === 'object' ? listing.area?.name : listing.area) || 
                         (typeof listing.city === 'object' ? listing.city?.name : listing.city) || 
                         'Location not available'}
                      </p>
                    </div>

                    {/* Bottom Info */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      {/* Status */}
                      <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        listing.isActive !== false && listing.status !== 'inactive'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {listing.isActive !== false && listing.status !== 'inactive' ? '✓ Active' : '⚠ Inactive'}
                      </div>
                      
                      {/* View Details */}
                      <span className="text-orange-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
