"use client";
import CommercialCard from './cards/CommercialCard';
import { FaWarehouse } from 'react-icons/fa';

export default function CommercialSection() {

  const rawCommercialData = [
    {
      horooId: "HCM0001",
      horooName: "Prime Office Space in Business District",
      state: { name: "Delhi" },
      city: { name: "New Delhi" },
      area: { name: "Connaught Place" },
      pincode: "110001",
      commercialType: ["Office", "Co-working"],
      availableFor: ["Business", "Startup"],
      ownerPrice: 45000,
      horooPrice: 50000,
      mainImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["WiFi", "AC", "Parking", "Security", "Reception"],
      commercialSize: "1200 sq ft",
      quantity: 1,
      availability: true,
      isVerified: true
    },
    {
      horooId: "HCM0002",
      horooName: "Modern Retail Shop in Shopping Mall",
      state: { name: "Maharashtra" },
      city: { name: "Mumbai" },
      area: { name: "Bandra West" },
      pincode: "400050",
      commercialType: ["Retail", "Shop"],
      availableFor: ["Business", "Brand"],
      ownerPrice: 35000,
      horooPrice: 40000,
      mainImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["Display Windows", "AC", "CCTV", "High Footfall"],
      commercialSize: "800 sq ft",
      quantity: 1,
      availability: true,
      isVerified: true
    },
    {
      horooId: "HCM0003",
      horooName: "Warehouse Space for Storage",
      state: { name: "Karnataka" },
      city: { name: "Bangalore" },
      area: { name: "Electronic City" },
      pincode: "560100",
      commercialType: ["Warehouse", "Godown"],
      availableFor: ["Business", "E-commerce"],
      ownerPrice: 25000,
      horooPrice: 30000,
      mainImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["Loading Dock", "24/7 Access", "Security", "High Ceiling"],
      commercialSize: "2500 sq ft",
      quantity: 1,
      availability: true,
      isVerified: true
    },
    {
      horooId: "HCM0004",
      horooName: "Restaurant Space in Food Court",
      state: { name: "Tamil Nadu" },
      city: { name: "Chennai" },
      area: { name: "T Nagar" },
      pincode: "600017",
      commercialType: ["Restaurant", "Food Court"],
      availableFor: ["Business", "Food Industry"],
      ownerPrice: 40000,
      horooPrice: 45000,
      mainImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      facilities: ["Kitchen Setup", "Dining Area", "Ventilation", "Water Supply"],
      commercialSize: "950 sq ft",
      quantity: 1,
      availability: true,
      isVerified: true
    }
  ];

  const commercials = rawCommercialData;

  return (
    <section className="py-6 pb-3 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FaWarehouse className="text-xl md:text-3xl text-orange-600" />
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              Commercial Spaces
            </h2>
          </div>
          
          {/* Mobile See More Text - Far right */}
          <a 
            href="/commercial"
            className="md:hidden text-orange-600 font-medium text-sm pr-2"
          >
            See more
          </a>
          
          {/* Desktop See More Button */}
          <div className="hidden md:block">
            <a
              href="/commercial"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <FaWarehouse className="text-sm" />
              All Commercial
            </a>
          </div>
        </div>
        
        {/* Hidden description for desktop */}
        <div className="hidden md:block mb-4">
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover prime commercial spaces perfect for your business needs.
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
            {commercials.slice(0, 4).map((commercial, index) => (
              <div key={commercial.horooId || index} className="flex-shrink-0" style={{width: '75vw'}}>
                <CommercialCard {...commercial} />
              </div>
            ))}
            
          
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {commercials.slice(0, 4).map((commercial, index) => (  
            <CommercialCard
              key={commercial.horooId || index}
              {...commercial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}