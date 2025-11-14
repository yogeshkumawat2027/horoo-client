"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaBed } from 'react-icons/fa';
import ShowImages from '@/components/Properties/ShowImages';
import PriceCard from '@/components/Properties/PriceCard';
import PropertyLocation from '@/components/Properties/PropertyLocation';
import CommercialDetails from '@/components/Properties/CommercialDetails';
import RequestFormPopup from "@/components/Request/RequestFormPopup";
import ThankYouPopup from "@/components/Request/ThankYouPopup";

const API = 'http://localhost:5000/api';

export default function Page() {
  const params = useParams();
  const [commercial, setCommercial] = useState(null);
  const [loading, setLoading] = useState(true);

  // Popup visibility states
  const [openFormPopup, setOpenFormPopup] = useState(false);
  const [openThanksPopup, setOpenThanksPopup] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchCommercialDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  // Check if button was disabled for this horooId
  useEffect(() => {
    if (commercial?.horooId) {
      const disabledUntil = localStorage.getItem(`request_disabled_${commercial.horooId}`);
      if (disabledUntil) {
        const now = Date.now();
        const remaining = parseInt(disabledUntil) - now;
        
        if (remaining > 0) {
          setIsButtonDisabled(true);
          setTimeLeft(Math.ceil(remaining / 1000));
          
          const interval = setInterval(() => {
            const currentRemaining = parseInt(disabledUntil) - Date.now();
            if (currentRemaining > 0) {
              setTimeLeft(Math.ceil(currentRemaining / 1000));
            } else {
              setIsButtonDisabled(false);
              setTimeLeft(0);
              localStorage.removeItem(`request_disabled_${commercial.horooId}`);
              clearInterval(interval);
            }
          }, 1000);
          
          return () => clearInterval(interval);
        } else {
          localStorage.removeItem(`request_disabled_${commercial.horooId}`);
        }
      }
    }
  }, [commercial?.horooId]);

  const fetchCommercialDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/commercial/${params.id}`);
      const data = await res.json();
      
      if (data.success) {
        setCommercial(data.commercial);
      }
    } catch (error) {
      console.error('Error fetching commercial details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading commercial details...</p>
        </div>
      </div>
    );
  }

  if (!commercial) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaBed className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Commercial Not Found</h2>
          <p className="text-gray-600 mb-6">The commercial you're looking for doesn't exist.</p>
          <Link 
            href="/commercials"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-semibold"
          >
            <FaArrowLeft />
            Back to Commercials
          </Link>
        </div>
      </div>
    );
  }

  // Prepare images array
  const allImages = [commercial.mainImage, ...(commercial.otherImages || [])].filter(Boolean);

  const handleBookingRequest = () => {
    setOpenFormPopup(true);
  };

  const handleRequestSuccess = () => {
    setOpenThanksPopup(true);
    setIsButtonDisabled(true);
    
    const disabledUntil = Date.now() + 120000;
    localStorage.setItem(`request_disabled_${commercial.horooId}`, disabledUntil.toString());
    setTimeLeft(120);
    
    const interval = setInterval(() => {
      const remaining = disabledUntil - Date.now();
      if (remaining > 0) {
        setTimeLeft(Math.ceil(remaining / 1000));
      } else {
        setIsButtonDisabled(false);
        setTimeLeft(0);
        localStorage.removeItem(`request_disabled_${commercial.horooId}`);
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-2 py-2">
          <Link 
            href="/commercials"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium transition-colors"
          >
            <FaArrowLeft />
            Back to Commercials
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
              propertyName={commercial.horooName || commercial.propertyName}
              area={commercial.area?.name}
              city={commercial.city?.name}
              state={commercial.state?.name}
              pincode={commercial.pincode}
              nearbyAreas={commercial.nearbyAreas}
            />

            {/* Price Card - Show on mobile only */}
            <div className="lg:hidden">
              <PriceCard
                horooId={commercial.horooId}
                ownerPrice={commercial.ownerPrice}
                horooPrice={commercial.horooPrice}
                pricePlans={commercial.pricePlans}
                availability={commercial.availability}
                onBookingRequest={handleBookingRequest}
                isButtonDisabled={isButtonDisabled}
                timeLeft={timeLeft}
              />
            </div>

            {/* Property Details */}
            <CommercialDetails
              commercialType={commercial.commercialType}
              availableFor={commercial.availableFor}
              commercialSize={commercial.commercialSize}
              facilities={commercial.facilities}
              description={commercial.description}
              youtubeLink={commercial.youtubeLink}
            />
          </div>

          {/* Right Column - Pricing & Booking (Desktop only) */}
          <div className="hidden lg:block lg:col-span-1">
            <PriceCard
              horooId={commercial.horooId}
              ownerPrice={commercial.ownerPrice}
              horooPrice={commercial.horooPrice}
              pricePlans={commercial.pricePlans}
              availability={commercial.availability}
              onBookingRequest={handleBookingRequest}
              isButtonDisabled={isButtonDisabled}
              timeLeft={timeLeft}
            />
          </div>
        </div>
      </div>

      {/* FORM POPUP */}
      <RequestFormPopup
        open={openFormPopup}
        setOpen={setOpenFormPopup}
        horooId={commercial.horooId}
        onSuccess={handleRequestSuccess}
      />

      {/* THANK YOU POPUP */}
      <ThankYouPopup
        open={openThanksPopup}
        setOpen={setOpenThanksPopup}
      />
    </div>
  );
}