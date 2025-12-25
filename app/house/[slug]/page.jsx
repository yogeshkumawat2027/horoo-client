"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaBed } from 'react-icons/fa';
import ShowImages from '@/components/Properties/ShowImages';
import PropertyHeader from '@/components/Properties/PropertyHeader';
import PriceAndContact from '@/components/Properties/PriceAndContact';
import AddressAndNearby from '@/components/Properties/AddressAndNearby';
import MapSection from '@/components/Properties/MapSection';
import HouseDetails from '@/components/Properties/HouseDetails';
import RequestFormPopup from "@/components/Request/RequestFormPopup";
import ThankYouPopup from "@/components/Request/ThankYouPopup";
import HouseRecommend from "@/components/Recomended/HouseRecommend";
import ReviewSection from "@/components/Properties/ReviewSection";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Page() {
  const params = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Popup visibility states
  const [openFormPopup, setOpenFormPopup] = useState(false);
  const [openThanksPopup, setOpenThanksPopup] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (params.slug) {
      fetchHouseDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  // Check if button was disabled for this horooId
  useEffect(() => {
    if (house?.horooId) {
      const disabledUntil = localStorage.getItem(`request_disabled_${house.horooId}`);
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
              localStorage.removeItem(`request_disabled_${house.horooId}`);
              clearInterval(interval);
            }
          }, 1000);
          
          return () => clearInterval(interval);
        } else {
          localStorage.removeItem(`request_disabled_${house.horooId}`);
        }
      }
    }
  }, [house?.horooId]);

  const fetchHouseDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/house/${params.slug}`);
      const data = await res.json();
      
      if (data.success) {
        setHouse(data.house);
      }
    } catch (error) {
      console.error('Error fetching house details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading house details...</p>
        </div>
      </div>
    );
  }

  if (!house) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaBed className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">House Not Found</h2>
          <p className="text-gray-600 mb-6">The house you're looking for doesn't exist.</p>
          <Link 
            href="/house"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-semibold"
          >
            <FaArrowLeft />
            Back to Houses
          </Link>
        </div>
      </div>
    );
  }

  // Prepare images array
  const allImages = [house.mainImage, ...(house.otherImages || [])].filter(Boolean);

  const handleBookingRequest = () => {
    setOpenFormPopup(true);
  };

  const handleRequestSuccess = () => {
    setOpenThanksPopup(true);
    setIsButtonDisabled(true);
    
    const disabledUntil = Date.now() + 120000;
    localStorage.setItem(`request_disabled_${house.horooId}`, disabledUntil.toString());
    setTimeLeft(120);
    
    const interval = setInterval(() => {
      const remaining = disabledUntil - Date.now();
      if (remaining > 0) {
        setTimeLeft(Math.ceil(remaining / 1000));
      } else {
        setIsButtonDisabled(false);
        setTimeLeft(0);
        localStorage.removeItem(`request_disabled_${house.horooId}`);
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <>
      <title>{house.horooName} - Horoo</title>
      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-2 py-2">
            <Link 
              href="/house"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium transition-colors"
            >
              <FaArrowLeft />
              Back to Houses
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-2 pb-4 md:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-0 bg-white">
              {/* Image Gallery */}
              <ShowImages images={allImages} />

              <PropertyHeader
                propertyName={house.horooName || house.propertyName}
                area={house.area?.name}
                city={house.city?.name}
                state={house.state?.name}
                pincode={house.pincode}
                averageRating={house.averageRating}
                totalRatings={house.totalRatings}
              />

              {/* Price Card - Show on mobile only */}
              <div className="lg:hidden">
                <PriceAndContact
                  ownerPrice={house.ownerPrice}
                  horooPrice={house.horooPrice}
                  ownerMobile={house.owner?.mobile}
                  ownerWhatsapp={house.owner?.whatsapp}
                  priceSuffix="/month"
                  isVerified={house.owner?.isVerified}
                  onBookingRequest={handleBookingRequest}
                  isButtonDisabled={isButtonDisabled}
                  timeLeft={timeLeft}
                />
              </div>

              {/* Property Details */}
              <HouseDetails
                houseType={house.houseType}
                availableFor={house.availableFor}
                houseSize={house.houseSize}
                facilities={house.facilities}
              />

              <AddressAndNearby
                horooAddress={house.horooAddress}
                nearbyAreas={house.nearbyAreas}
              />

              <MapSection
                latitude={house.latitude}
                longitude={house.longitude}
                mapLink={house.mapLink}
                propertyName={house.horooName}
                horooAddress={house.horooAddress}
              />

              {/* Reviews Section */}
              <ReviewSection
                propertyId={house._id}
                propertyType="House"
                averageRating={house.averageRating}
                totalRatings={house.totalRatings}
                reviews={house.reviews || []}
                onReviewAdded={fetchHouseDetails}
              />

              <HouseDetails
                description={house.description}
                youtubeLink={house.youtubeLink}
              />
            </div>

            {/* Right Column - Pricing & Booking (Desktop only) */}
            <div className="hidden lg:block lg:col-span-1">
              <PriceAndContact
                ownerPrice={house.ownerPrice}
                horooPrice={house.horooPrice}
                ownerMobile={house.owner?.mobile}
                ownerWhatsapp={house.owner?.whatsapp}
                priceSuffix="/month"
                isVerified={house.owner?.isVerified}
                onBookingRequest={handleBookingRequest}
                isButtonDisabled={isButtonDisabled}
                timeLeft={timeLeft}
              />
            </div>
          </div>
        </div>

        {/* Recommended Houses Section */}
        <HouseRecommend
          currentHorooId={house.horooId}
          areaId={house.area?._id}
          cityId={house.city?._id}
        />

        {/* FORM POPUP */}
        <RequestFormPopup
          open={openFormPopup}
          setOpen={setOpenFormPopup}
          horooId={house.horooId}
          onSuccess={handleRequestSuccess}
        />

        {/* THANK YOU POPUP */}
        <ThankYouPopup
          open={openThanksPopup}
          setOpen={setOpenThanksPopup}
        />
      </div>
    </>
  );
}