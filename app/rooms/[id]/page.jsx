"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaBed } from 'react-icons/fa';
import ShowImages from '@/components/Properties/ShowImages';
import PriceCard from '@/components/Properties/PriceCard';
import PropertyLocation from '@/components/Properties/PropertyLocation';
import RoomDetails from '@/components/Properties/RoomDetails';
import RequestFormPopup from "@/components/Request/RequestFormPopup";
import ThankYouPopup from "@/components/Request/ThankYouPopup";
import RoomRecommend from "@/components/Recomended/RoomRecommend";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function Page() {
  const params = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // Popup visibility states
  const [openFormPopup, setOpenFormPopup] = useState(false);
  const [openThanksPopup, setOpenThanksPopup] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchRoomDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  // Check if button was disabled for this horooId
  useEffect(() => {
    if (room?.horooId) {
      const disabledUntil = localStorage.getItem(`request_disabled_${room.horooId}`);
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
              localStorage.removeItem(`request_disabled_${room.horooId}`);
              clearInterval(interval);
            }
          }, 1000);
          
          return () => clearInterval(interval);
        } else {
          localStorage.removeItem(`request_disabled_${room.horooId}`);
        }
      }
    }
  }, [room?.horooId]);

  const fetchRoomDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/room/${params.id}`);
      const data = await res.json();
      
      if (data.success) {
        setRoom(data.room);
      }
    } catch (error) {
      console.error('Error fetching room details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaBed className="text-6xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Room Not Found</h2>
          <p className="text-gray-600 mb-6">The room you're looking for doesn't exist.</p>
          <Link 
            href="/rooms"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-semibold"
          >
            <FaArrowLeft />
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  // Prepare images array
  const allImages = [room.mainImage, ...(room.otherImages || [])].filter(Boolean);

  const handleBookingRequest = () => {
    setOpenFormPopup(true);
  };

  const handleRequestSuccess = () => {
    setOpenThanksPopup(true);
    setIsButtonDisabled(true);
    
    // Disable button for 2 minutes (120000 ms) for this specific horooId
    const disabledUntil = Date.now() + 120000;
    localStorage.setItem(`request_disabled_${room.horooId}`, disabledUntil.toString());
    setTimeLeft(120);
    
    // Update timer every second
    const interval = setInterval(() => {
      const remaining = disabledUntil - Date.now();
      if (remaining > 0) {
        setTimeLeft(Math.ceil(remaining / 1000));
      } else {
        setIsButtonDisabled(false);
        setTimeLeft(0);
        localStorage.removeItem(`request_disabled_${room.horooId}`);
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
            href="/rooms"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 font-medium transition-colors"
          >
            <FaArrowLeft />
            Back to Rooms
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
              propertyName={room.horooName || room.propertyName}
              area={room.area?.name}
              city={room.city?.name}
              state={room.state?.name}
              pincode={room.pincode}
              nearbyAreas={room.nearbyAreas}
            />

            {/* Price Card - Show on mobile only */}
            <div className="lg:hidden">
              <PriceCard
                horooId={room.horooId}
                ownerPrice={room.ownerPrice}
                horooPrice={room.horooPrice}
                pricePlans={room.pricePlans}
                availability={room.availability}
                onBookingRequest={handleBookingRequest}
                isButtonDisabled={isButtonDisabled}
                timeLeft={timeLeft}
              />
            </div>

            {/* Property Details */}
            <RoomDetails
              roomType={room.roomType}
              availableFor={room.availableFor}
              roomSize={room.roomSize}
              facilities={room.facilities}
              description={room.description}
              youtubeLink={room.youtubeLink}
            />
          </div>

          {/* Right Column - Pricing & Booking (Desktop only) */}
          <div className="hidden lg:block lg:col-span-1">
            <PriceCard
              horooId={room.horooId}
              ownerPrice={room.ownerPrice}
              horooPrice={room.horooPrice}
              pricePlans={room.pricePlans}
              availability={room.availability}
              onBookingRequest={handleBookingRequest}
              isButtonDisabled={isButtonDisabled}
              timeLeft={timeLeft}
            />
          </div>
        </div>
      </div>

      {/* Recommended Rooms Section */}
      <RoomRecommend
        currentHorooId={room.horooId}
        areaId={room.area?._id}
        cityId={room.city?._id}
      />

      {/* FORM POPUP */}
      <RequestFormPopup
        open={openFormPopup}
        setOpen={setOpenFormPopup}
        horooId={room.horooId}
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