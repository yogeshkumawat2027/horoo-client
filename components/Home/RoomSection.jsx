"use client";
import RoomCard from './cards/RoomCard';
import { FaBed } from 'react-icons/fa';

export default function RoomSection() {

  const rawRoomData = [
    {
      horooId: "HRL0001",
      horooName: "Comfortable Single Room Near Metro",
      state: { name: "Delhi" },
      city: { name: "New Delhi" },
      area: { name: "Karol Bagh" },
      pincode: "110005",
      roomType: ["Single"],
      availableFor: ["Boys", "Girls"],
      ownerPrice: 8500,
      horooPrice: 10000,
      mainImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "AC", "Attached Bathroom"],
      roomSize: "120 sq ft",
      quantity: 1,
      availability: true,
      isVerified: true
    },
    {
      horooId: "HRL0002",
      horooName: "Luxury Double Room with Balcony",
      state: { name: "Maharashtra" },
      city: { name: "Mumbai" },
      area: { name: "Andheri West" },
      pincode: "400058",
      roomType: ["Double"],
      availableFor: ["Boys"],
      ownerPrice: 15000,
      horooPrice: 18000,
      mainImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "AC", "Balcony", "Parking"],
      roomSize: "200 sq ft",
      quantity: 1,
      availability: true,
      isVerified: true
    },
    {
      horooId: "HRL0003",
      horooName: "Flexible Rooms for Students",
      state: { name: "Karnataka" },
      city: { name: "Bangalore" },
      area: { name: "Koramangala" },
      pincode: "560034",
      roomType: ["Single", "Double", "Triple"],
      availableFor: ["Boys", "Girls"],
      ownerPrice: 6000,
      horooPrice: 7500,
      mainImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "Study Table", "Wardrobe"],
      roomSize: "150 sq ft",
      quantity: 3,
      availability: true,
      isVerified: true
    },
    {
      horooId: "HRL0004",
      horooName: "Premium Single Room with Kitchen",
      state: { name: "Tamil Nadu" },
      city: { name: "Chennai" },
      area: { name: "T Nagar" },
      pincode: "600017",
      roomType: ["Single"],
      availableFor: ["Family"],
      ownerPrice: 12000,
      horooPrice: 14000,
      mainImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "AC", "Kitchen", "Parking"],
      roomSize: "180 sq ft",
      quantity: 1,
      availability: true,
      isVerified: true
    }
  ];

  const rooms = rawRoomData;

  return (
    <section className="py-6 pb-3 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FaBed className="text-xl md:text-3xl text-orange-600" />
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              Featured Rooms
            </h2>
          </div>
          
          {/* Mobile See More Text - Far right */}
          <a 
            href="/rooms"
            className="md:hidden text-orange-600 font-medium text-sm pr-2"
          >
            See more
          </a>
          
          {/* Desktop See More Button */}
          <div className="hidden md:block">
            <a
              href="/rooms"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <FaBed className="text-sm" />
              All Rooms
            </a>
          </div>
        </div>
        
        {/* Hidden description for desktop */}
        <div className="hidden md:block mb-4">
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover comfortable and affordable rooms across India.
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
            {rooms.slice(0, 4).map((room, index) => (
              <div key={room.horooId || index} className="flex-shrink-0" style={{width: '75vw'}}>
                <RoomCard {...room} />
              </div>
            ))}
            
       
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {rooms.slice(0, 4).map((room, index) => (  //only show 8 rooms on desktop
            <RoomCard
              key={room.horooId || index}
              {...room}
            />
          ))}
        </div>

      
      </div>
    </section>
  );
}
