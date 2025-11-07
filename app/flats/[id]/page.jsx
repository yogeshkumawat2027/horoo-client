"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaBed } from 'react-icons/fa';
import ShowImages from '@/components/Properties/ShowImages';
import PriceCard from '@/components/Properties/PriceCard';
import PropertyLocation from '@/components/Properties/PropertyLocation';
import FlatDetails from '@/components/Properties/FlatDetails';

const API = 'https://horoo-backend-latest.onrender.com/api';

export default function Page() {
  const params = useParams();
  const [flat, setFlat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchFlatDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const fetchFlatDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/flat/${params.id}`);
      const data = await res.json();
      
      if (data.success) {
        setFlat(data.flat);
      }
    } catch (error) {
      console.error('Error fetching flat details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading flat details...</p>
        </div>
      </div>
    );
  }

  if (!flat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaBed className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Flat Not Found</h2>
          <p className="text-gray-600 mb-6">The flat you're looking for doesn't exist.</p>
          <Link 
            href="/flats"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-semibold"
          >
            <FaArrowLeft />
            Back to Flats
          </Link>
        </div>
      </div>
    );
  }

  // Prepare images array
  const allImages = [flat.mainImage, ...(flat.otherImages || [])].filter(Boolean);

  const handleBookingRequest = () => {
    // Handle booking request logic here
    alert('Booking request functionality will be implemented');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-2 py-2">
          <Link 
            href="/flats"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium transition-colors"
          >
            <FaArrowLeft />
            Back to Flats
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-2 pb-4 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ShowImages images={allImages} />

            {/* Property Location */}
            <PropertyLocation
              propertyName={flat.horooName || flat.propertyName}
              area={flat.area?.name}
              city={flat.city?.name}
              state={flat.state?.name}
              pincode={flat.pincode}
              nearbyAreas={flat.nearbyAreas}
            />

            {/* Price Card - Show on mobile only */}
            <div className="lg:hidden">
              <PriceCard
                horooId={flat.horooId}
                ownerPrice={flat.ownerPrice}
                horooPrice={flat.horooPrice}
                pricePlans={flat.pricePlans}
                availability={flat.availability}
                onBookingRequest={handleBookingRequest}
              />
            </div>

            {/* Property Details */}
            <FlatDetails
              flatType={flat.flatType}
              availableFor={flat.availableFor}
              roomSize={flat.roomSize}
              facilities={flat.facilities}
              description={flat.description}
              youtubeLink={flat.youtubeLink}
            />
          </div>

          {/* Right Column - Pricing & Booking (Desktop only) */}
          <div className="hidden lg:block lg:col-span-1">
            <PriceCard
              horooId={flat.horooId}
              ownerPrice={flat.ownerPrice}
              horooPrice={flat.horooPrice}
              pricePlans={flat.pricePlans}
              availability={flat.availability}
              onBookingRequest={handleBookingRequest}
            />
          </div>
        </div>
      </div>
    </div>
  );
}