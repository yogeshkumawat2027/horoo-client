"use client";
import { FaRupeeSign, FaCheckCircle, FaPhone, FaWhatsapp, FaShare } from 'react-icons/fa';

export default function PriceAndContact({ 
  horooId,
  ownerPrice, 
  horooPrice, 
  priceSuffix = "per month",
  isVerified,
  ownerMobile,
  ownerWhatsapp,
  onBookingRequest,
  isButtonDisabled = false
}) {
  const savingsAmount = horooPrice && ownerPrice && horooPrice > ownerPrice 
    ? horooPrice - ownerPrice 
    : 0;

  const handleCall = () => {
    if (ownerMobile) {
      window.location.href = `tel:${ownerMobile}`;
    }
  };

  const handleWhatsapp = () => {
    if (ownerWhatsapp) {
      window.open(`https://wa.me/${ownerWhatsapp}`, '_blank');
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}`;
    const shareText = `Check out this property: ${horooId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Property on Horoo',
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 lg:sticky lg:top-24">
      {/* Property ID and Verified Badge */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="text-gray-600 text-xs md:text-sm font-medium">
          Property ID: <span className="text-gray-800 font-semibold">{horooId}</span>
        </span>
        
        {/* Verified Badge */}
        {isVerified && (
          <div className="flex items-center gap-1.5 text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
            <FaCheckCircle className="text-xs" />
            <span className="text-xs font-semibold">Verified</span>
          </div>
        )}
      </div>

      {/* Pricing Section */}
      <div className="mb-4">
        {/* Prices in one line with prefix */}
        <div className="flex items-baseline gap-3 flex-wrap mb-2">
          {/* Horoo Price (if exists and different) */}
          {horooPrice && ownerPrice && horooPrice > ownerPrice && (
            <div className="flex items-center gap-1 text-gray-400">
              <FaRupeeSign className="text-sm md:text-base" />
              <span className="text-lg md:text-xl line-through font-semibold">
                {horooPrice.toLocaleString()}
              </span>
            </div>
          )}
          
          {/* Owner Price with Prefix */}
          <div className="flex items-center gap-1">
            <div className="flex items-center text-orange-600">
              <FaRupeeSign className="text-xl md:text-2xl font-bold" />
              <span className="text-3xl md:text-4xl font-bold">
                {(ownerPrice || horooPrice)?.toLocaleString()}
              </span>
            </div>
            <span className="text-sm md:text-base text-gray-600 ml-1">
              {priceSuffix}
            </span>
          </div>
        </div>

        {/* Savings Badge */}
        {savingsAmount > 0 && (
          <div className="inline-block">
            <span className="bg-green-100 text-green-700 text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full">
              Save ₹{savingsAmount.toLocaleString()}
            </span>
          </div>
        )}
      </div>

  

      {/* Contact Buttons */}
      
      {/* Mobile Buttons - Only Icons with Colors */}
      <div className="grid grid-cols-3 gap-3 mb-4 lg:hidden">
        {/* Call Button - Mobile */}
        <button
          onClick={handleCall}
          className="flex items-center justify-center w-14 h-14 mx-auto text-blue-600 border-2 border-gray-400 rounded-full transition-all hover:border-gray-500"
          title={ownerMobile || 'Call Owner'}
        >
          <FaPhone className="text-2xl" />
        </button>

        {/* WhatsApp Button - Mobile */}
        <button
          onClick={handleWhatsapp}
          className="flex items-center justify-center w-14 h-14 mx-auto text-green-600 border-2 border-gray-400 rounded-full transition-all hover:border-gray-500"
          title="WhatsApp Owner"
        >
          <FaWhatsapp className="text-2xl" />
        </button>

        {/* Share Button - Mobile */}
        <button
          onClick={handleShare}
          className="flex items-center justify-center w-14 h-14 mx-auto text-gray-600 border-2 border-gray-400 rounded-full transition-all hover:border-gray-500"
          title="Share Property"
        >
          <FaShare className="text-2xl" />
        </button>
      </div>

      {/* Desktop Buttons - Icons + Numbers with Background */}
      <div className="hidden lg:grid grid-cols-3 gap-3 mb-4">
        {/* Call Button - Desktop */}
        <button
          onClick={handleCall}
          className="flex flex-row items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl transition-all font-medium shadow-sm hover:shadow-md"
          title={ownerMobile || 'Call Owner'}
        >
          <FaPhone className="text-base flex-shrink-0" />
          <span className="text-xs font-semibold whitespace-nowrap">{ownerMobile || 'Call'}</span>
        </button>

        {/* WhatsApp Button - Desktop */}
        <button
          onClick={handleWhatsapp}
          className="flex flex-row items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl transition-all font-medium shadow-sm hover:shadow-md"
          title="WhatsApp Owner"
        >
          <FaWhatsapp className="text-base flex-shrink-0" />
          <span className="text-xs font-semibold whitespace-nowrap">{ownerWhatsapp || 'WhatsApp'}</span>
        </button>

        {/* Share Button - Desktop */}
        <button
          onClick={handleShare}
          className="flex flex-row items-center justify-center gap-2 bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-3 py-3 rounded-xl transition-all font-medium shadow-sm hover:shadow-md"
          title="Share Property"
        >
          <FaShare className="text-sm flex-shrink-0" />
          <span className="text-xs font-semibold">Share</span>
        </button>
      </div>

      {/* Request to Book Button */}
      <button 
        onClick={onBookingRequest}
        disabled={isButtonDisabled}
        className={`w-full py-3 md:py-4 px-6 rounded-lg font-bold text-sm md:text-lg transition-all flex items-center justify-center gap-2
          ${!isButtonDisabled
            ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        {isButtonDisabled ? 'Request Already Sent' : 'Request to Book Now'}
      </button>
    </div>
  );
}
