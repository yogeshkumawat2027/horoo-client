"use client";
import FlatCard from './cards/FlatCard';
import { FaBuilding } from 'react-icons/fa';

export default function FlatSection() {

  // Raw/Dummy data for flats
  const rawFlatData = [
    {
      horooId: "HFL0001",
      slug: "luxurious-2bhk-family-flat",
      horooName: "Luxurious 2BHK Family Flat",
      state: { name: "Delhi" },
      city: { name: "New Delhi" },
      area: { name: "Lajpat Nagar" },
      pincode: "110024",
      flatType: ["2BHK","3BHK"],
      roomType: ["Single", "Double"],
      availableFor: ["Family"],
      ownerPrice: 25000,
      horooPrice: 28000,
      mainImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "AC", "Kitchen", "Parking"],
      roomSize: "850 sq ft",
      quantity: 1,
      availability: true,
      isVerified: true
    },
    {
      horooId: "HFL0002",
      slug: "modern-1bhk-near-it-hub",
      horooName: "Modern 1BHK Near IT Hub",
      state: { name: "Karnataka" },
      city: { name: "Bangalore" },
      area: { name: "Whitefield" },
      pincode: "560066",
      flatType: ["1BHK"],
      roomType: ["Single"],
      availableFor: ["Boys", "Girls"],
      ownerPrice: 18000,
      horooPrice: 22000,
      mainImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "AC", "Modular Kitchen", "24/7 Security"],
      roomSize: "550 sq ft",
      quantity: 1,
      availability: true,
      isVerified: true
    },
    {
      horooId: "HFL0003",
      slug: "spacious-3bhk-for-large-family",
      horooName: "Spacious 3BHK for Large Family",
      state: { name: "Maharashtra" },
      city: { name: "Pune" },
      area: { name: "Koregaon Park" },
      pincode: "411001",
      flatType: ["3BHK"],
      roomType: ["Single", "Double", "Triple"],
      availableFor: ["Family"],
      ownerPrice: 35000,
      horooPrice: 40000,
      mainImage: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "AC", "Balcony", "Gym", "Swimming Pool"],
      roomSize: "1200 sq ft",
      quantity: 1,
      availability: true,
      isVerified: true
    },
    {
      horooId: "HFL0004",
      horooName: "Affordable 2BHK for Students",
      state: { name: "Tamil Nadu" },
      city: { name: "Chennai" },
      area: { name: "Anna Nagar" },
      pincode: "600040",
      flatType: ["2BHK"],
      roomType: ["Double", "Triple"],
      availableFor: ["Boys", "Girls"],
      ownerPrice: 20000,
      horooPrice: 24000,
      mainImage: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "Study Room", "Common Kitchen", "Laundry"],
      roomSize: "750 sq ft",
      quantity: 1,
      availability: true,
      isVerified: true
    }
  ];

  const flats = rawFlatData;

  return (
    <section className="pt-3 pb-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FaBuilding className="text-xl md:text-3xl text-orange-600" />
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              Featured Flats
            </h2>
          </div>
          
          {/* Mobile See More Text - Far right */}
          <a 
            href="/flats"
            className="md:hidden text-orange-600 font-medium text-sm pr-2"
          >
            See more
          </a>
          
          {/* Desktop See More Button */}
          <div className="hidden md:block">
            <a
              href="/flats"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <FaBuilding className="text-sm" />
              All Flats
            </a>
          </div>
        </div>
        
        {/* Hidden description for desktop */}
        <div className="hidden md:block mb-4">
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover spacious and comfortable flats perfect for families and individuals.
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
            {flats.slice(0, 4).map((flat, index) => (
              <div key={flat.horooId || index} className="flex-shrink-0" style={{width: '75vw'}}>
                <FlatCard {...flat} />
              </div>
            ))}
            
            
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {flats.slice(0, 4).map((flat, index) => (  
            <FlatCard
              key={flat.horooId || index}
              {...flat}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
