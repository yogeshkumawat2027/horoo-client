"use client";
import Link from 'next/link';
import { 
  FaBed, 
  FaHome, 
  FaBuilding, 
  FaUtensils, 
  FaWarehouse, 
  FaHotel,
  FaSearch,
  FaUserFriends
} from 'react-icons/fa';

export default function HeroLG() {
  const quickNavigation = [
    {
      name: 'Rooms',
      icon: FaBed,
      href: '/rooms',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      name: 'Hostels',
      icon: FaUserFriends,
      href: '/hostels',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      name: 'Flats',
      icon: FaBuilding,
      href: '/flats',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      name: 'Hotels',
      icon: FaHotel,
      href: '/hotels',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      name: 'House',
      icon: FaHome,
      href: '/house',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      name: 'Commercials',
      icon: FaWarehouse,
      href: '/commercials',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-orange-100 py-6 md:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="text-center hidden lg:block md:block mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
            Find Your Perfect{' '}
            <span className="text-orange-600 relative">
              Living Space
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-orange-300 rounded-full transform scale-x-0 animate-pulse"></div>
            </span>
          </h1>
{/*           
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover thousands of rooms, flats, hostels, and commercial spaces across India. 
            Your ideal property is just a click away with{' '}
            <span className="font-semibold text-orange-600">Horoo</span>.
          </p> */}

          {/* Search Bar */}
          {/* <div className="max-w-2xl mx-auto mb-8 md:mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for rooms, hostels, flats..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 shadow-lg"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105">
                <FaSearch className="text-lg" />
              </button>
            </div>
          </div> */}
        </div>

        {/* Quick Navigation */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl hidden lg:block md:block md:text-2xl font-semibold text-gray-800 text-center mb-6 md:mb-8">
            Explore by Category
          </h2>
          
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-6">
            {quickNavigation.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="group flex flex-col items-center p-2 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-orange-200 w-full max-w-[90px] md:max-w-none mx-auto"
                >
                  <div className={`${item.color} text-white p-2 md:p-5 rounded-full mb-2 md:mb-4 transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                    <IconComponent className="text-base md:text-2xl" />
                  </div>
                  
                  <span className="text-xs md:text-base font-semibold text-gray-700 group-hover:text-orange-600 transition-colors duration-300">
                    {item.name}
                  </span>
                  
                  <div className="w-0 group-hover:w-12 h-0.5 bg-orange-500 mt-2 transition-all duration-300 rounded-full"></div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-16 max-w-4xl mx-auto">
          <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
            <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">1000+</div>
            <div className="text-sm md:text-base text-gray-600 font-medium">Properties</div>
          </div>
          
          <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
            <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">50+</div>
            <div className="text-sm md:text-base text-gray-600 font-medium">Cities</div>
          </div>
          
          <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
            <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">500+</div>
            <div className="text-sm md:text-base text-gray-600 font-medium">Happy Users</div>
          </div>
          
          <div className="text-center p-4 bg-white/60 rounded-xl backdrop-blur-sm">
            <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">24/7</div>
            <div className="text-sm md:text-base text-gray-600 font-medium">Support</div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
