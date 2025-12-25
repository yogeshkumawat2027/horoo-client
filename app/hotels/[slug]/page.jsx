"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaBed } from 'react-icons/fa';
import ShowImages from '@/components/Properties/ShowImages';
import PriceCardForHotel from '@/components/Properties/PriceCardForHotel';
import PropertyHeader from '@/components/Properties/PropertyHeader';
import PriceAndContact from '@/components/Properties/PriceAndContact';
import AddressAndNearby from '@/components/Properties/AddressAndNearby';
import MapSection from '@/components/Properties/MapSection';
import HotelDetails from '@/components/Properties/HotelDetails';

import RequestFormPopup from "@/components/Request/RequestFormPopup";
import ThankYouPopup from "@/components/Request/ThankYouPopup";
import HotelRecommend from "@/components/Recomended/HotelRecommend";
import ReviewSection from "@/components/Properties/ReviewSection";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Page() {
  const params = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Popup visibility states
  const [openFormPopup, setOpenFormPopup] = useState(false);
  const [openThanksPopup, setOpenThanksPopup] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (params.slug) fetchHotelDetails();
  }, [params.slug]);

  // Check if button was disabled for this horooId
  useEffect(() => {
    if (hotel?.horooId) {
      const disabledUntil = localStorage.getItem(`request_disabled_${hotel.horooId}`);
      if (disabledUntil) {
        const now = Date.now();
        const remaining = parseInt(disabledUntil) - now;
        
        if (remaining > 0) {
          setIsButtonDisabled(true);
          setTimeLeft(Math.ceil(remaining / 1000));
          
          // Update timer every second
          const interval = setInterval(() => {
            const currentRemaining = parseInt(disabledUntil) - Date.now();
            if (currentRemaining > 0) {
              setTimeLeft(Math.ceil(currentRemaining / 1000));
            } else {
              setIsButtonDisabled(false);
              setTimeLeft(0);
              localStorage.removeItem(`request_disabled_${hotel.horooId}`);
              clearInterval(interval);
            }
          }, 1000);
          
          return () => clearInterval(interval);
        } else {
          localStorage.removeItem(`request_disabled_${hotel.horooId}`);
        }
      }
    }
  }, [hotel?.horooId]);

  const fetchHotelDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/hotel/${params.slug}`);
      const data = await res.json();

      if (data.success) setHotel(data.hotelRoom);

    } catch (error) {
      console.error('Error fetching hotel details:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaBed className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Hotel Not Found</h2>
          <p className="text-gray-600 mb-6">The hotel you're looking for doesn't exist.</p>
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-semibold"
          >
            <FaArrowLeft />
            Back to Hotels
          </Link>
        </div>
      </div>
    );
  }

  const allImages = [hotel.mainImage, ...(hotel.otherImages || [])].filter(Boolean);

  const handleBookingRequest = () => {
    setOpenFormPopup(true);
  };

  const handleRequestSuccess = () => {
    setOpenThanksPopup(true);
    setIsButtonDisabled(true);
    
    // Disable button for 2 minutes (120000 ms) for this specific horooId
    const disabledUntil = Date.now() + 120000;
    localStorage.setItem(`request_disabled_${hotel.horooId}`, disabledUntil.toString());
    setTimeLeft(120);
    
    // Update timer every second
    const interval = setInterval(() => {
      const remaining = disabledUntil - Date.now();
      if (remaining > 0) {
        setTimeLeft(Math.ceil(remaining / 1000));
      } else {
        setIsButtonDisabled(false);
        setTimeLeft(0);
        localStorage.removeItem(`request_disabled_${hotel.horooId}`);
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <>
      <title>{hotel.horooName} - Horoo</title>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-2 py-2">
            <Link
              href="/hotels"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium transition-colors"
            >
              <FaArrowLeft /> Back to Hotels
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-2 pb-4 md:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2 space-y-0 bg-white">
              <ShowImages images={allImages} />

              <PropertyHeader
                propertyName={hotel.horooName || hotel.propertyName}
                area={hotel.area?.name}
                city={hotel.city?.name}
                state={hotel.state?.name}
                pincode={hotel.pincode}
                averageRating={hotel.averageRating}
                totalRatings={hotel.totalRatings}
              />

              <div className="lg:hidden">
                <PriceAndContact
                  horooId={hotel.horooId}
                  ownerPrice={hotel.ownerPrice}
                  horooPrice={hotel.horooPrice}
                  priceSuffix={hotel.priceSuffix}
                  isVerified={hotel.isVerified}
                  ownerMobile={hotel.ownerMobile}
                  ownerWhatsapp={hotel.ownerWhatsapp}
                  onBookingRequest={handleBookingRequest}
                  isButtonDisabled={isButtonDisabled}
                  timeLeft={timeLeft}
                />
              </div>

              <HotelDetails
                roomType={hotel.roomType}
                availableFor={hotel.availableFor}
                roomSize={hotel.roomSize}
                facilities={hotel.facilities}
              />

              <AddressAndNearby
                horooAddress={hotel.horooAddress}
                nearbyAreas={hotel.nearbyAreas}
              />

              <MapSection
                latitude={hotel.latitude}
                longitude={hotel.longitude}
                mapLink={hotel.mapLink}
                propertyName={hotel.horooName}
                horooAddress={hotel.horooAddress}
              />

              <ReviewSection
                propertyId={hotel._id}
                propertyType="HotelRoom"
                averageRating={hotel.averageRating}
                totalRatings={hotel.totalRatings}
                reviews={hotel.reviews || []}
                onReviewAdded={fetchHotelDetails}
              />

              <HotelDetails
                description={hotel.description}
                youtubeLink={hotel.youtubeLink}
              />
            </div>

            <div className="hidden lg:block lg:col-span-1">
              <PriceAndContact
                horooId={hotel.horooId}
                ownerPrice={hotel.ownerPrice}
                horooPrice={hotel.horooPrice}
                priceSuffix={hotel.priceSuffix}
                isVerified={hotel.isVerified}
                ownerMobile={hotel.ownerMobile}
                ownerWhatsapp={hotel.ownerWhatsapp}
                onBookingRequest={handleBookingRequest}
                isButtonDisabled={isButtonDisabled}
                timeLeft={timeLeft}
              />
            </div>
          </div>
        </div>

        {/* Recommended Hotels Section */}
        <HotelRecommend
          currentHorooId={hotel.horooId}
          areaId={hotel.area?._id}
          cityId={hotel.city?._id}
        />

        {/* FORM POPUP */}
        <RequestFormPopup
          open={openFormPopup}
          setOpen={setOpenFormPopup}
          horooId={hotel.horooId}
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
