"use client";
import HostelCard from './cards/HostelCard';
import { FaBed } from 'react-icons/fa';

export default function HostelSection() {

  // Raw/Dummy data for hostels
  const rawHostelData = [
    {
      horooId: "HHL0001",
      horooName: "Safe Girls Hostel Near University",
      state: { name: "Delhi" },
      city: { name: "New Delhi" },
      area: { name: "Kamla Nagar" },
      pincode: "110007",
      roomType: ["Single", "Double"],
      availableFor: ["Girls"],
      ownerPrice: 7500,
      horooPrice: 9000,
      mainImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "AC", "Mess", "Laundry", "Security"],
      roomSize: "110 sq ft",
      quantity: 20,
      availability: true,
      isVerified: true
    },
    {
      horooId: "HHL0002",
      horooName: "Modern Boys Hostel with Gym",
      state: { name: "Maharashtra" },
      city: { name: "Pune" },
      area: { name: "Kothrud" },
      pincode: "411038",
      roomType: ["Single", "Double", "Triple"],
      availableFor: ["Boys"],
      ownerPrice: 9500,
      horooPrice: 12000,
      mainImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "AC", "Gym", "Mess", "Study Room", "24/7 Security"],
      quantity: 15,
      availability: true,
      isVerified: true
    },
    {
      horooId: "HHL0003",
      horooName: "Budget Friendly Student Hostel",
      state: { name: "Karnataka" },
      city: { name: "Bangalore" },
      area: { name: "BTM Layout" },
      pincode: "560029",
      roomType: ["Triple"],
      availableFor: ["Boys", "Girls"],
      ownerPrice: 5500,
      horooPrice: 7000,
      mainImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "Common Kitchen", "Study Area", "Laundry"],
      quantity: 30,
      availability: true,
      isVerified: true
    },
    {
      horooId: "HHL0004",
      horooName: "Premium Co-living Hostel",
      state: { name: "Tamil Nadu" },
      city: { name: "Chennai" },
      area: { name: "Velachery" },
      pincode: "600042",
      roomType: ["Single", "Double"],
      availableFor: ["Boys", "Girls"],
      ownerPrice: 11000,
      horooPrice: 13500,
      mainImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "AC", "Swimming Pool", "Cafeteria", "Recreation Room"],
      quantity: 12,
      availability: true,
      isVerified: true
    }
  ];

  const hostels = rawHostelData;

  return (
    <section className="py-6 pb-3 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FaBed className="text-xl md:text-3xl text-orange-600" />
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              Featured Hostels
            </h2>
          </div>
          
          {/* Mobile See More Text - Far right */}
          <a 
            href="/hostels"
            className="md:hidden text-orange-600 font-medium text-sm pr-2"
          >
            See more
          </a>
          
          {/* Desktop See More Button */}
          <div className="hidden md:block">
            <a
              href="/hostels"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <FaBed className="text-sm" />
              All Hostels
            </a>
          </div>
        </div>
        
        {/* Hidden description for desktop */}
        <div className="hidden md:block mb-4">
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover safe and comfortable hostels for students and professionals.
          </p>
        </div>

        {/* Mobile: Horizontal Scroll, Desktop: Grid */}
        {/* Mobile Horizontal Scroll */}
        <div className="md:hidden mb-6 -mx-4">
          <style jsx>{`
            .scroll-container::-webkit-scrollbar {
              display: none;
            }
            .scroll-container {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          <div className="scroll-container flex overflow-x-auto gap-4 pb-4 pl-4 pr-16">
            {hostels.slice(0, 4).map((hostel, index) => (
              <div key={hostel.horooId || index} className="flex-shrink-0" style={{width: '75vw'}}>
                <HostelCard {...hostel} />
              </div>
            ))}
            
            {/* See More Button in place of 5th card */}
            <div className="flex-shrink-0 flex items-center justify-center" style={{width: '75vw'}}>
              <a
                href="/hostels"
                className="bg-white rounded-xl shadow-md border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center h-48 w-full group py-6 px-4"
              >
                <div className="bg-orange-100 group-hover:bg-orange-200 p-6 rounded-full mb-4 transition-colors">
                  <FaBed className="text-3xl text-orange-600" />
                </div>
                
                <p className="text-sm text-gray-600 text-center px-4">
                  Discover {hostels.length > 4 ? hostels.length - 4 : 'more'} amazing hostels
                </p>
                <div className="mt-3 bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm group-hover:bg-orange-700 transition-colors">
                  Explore All →
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {hostels.slice(0, 4).map((hostel, index) => (  
            <HostelCard
              key={hostel.horooId || index}
              {...hostel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
