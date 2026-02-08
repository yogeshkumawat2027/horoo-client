"use client";
import { FaRupeeSign, FaHome, FaCalendarCheck, FaTag } from 'react-icons/fa';

export default function PriceCard({ 
  horooId, 
  ownerPrice, 
  horooPrice, 
  pricePlans = [],
  availability,
  onBookingRequest,
  isButtonDisabled = false,
  timeLeft = 0
}) {
  const savingsAmount = horooPrice && ownerPrice && horooPrice > ownerPrice 
    ? horooPrice - ownerPrice 
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 sticky top-24">
      {/* Property ID */}
      <div className="flex items-center gap-2 text-gray-600 text-xs md:text-sm mb-4 ">
        {/* <FaHome className="text-orange-600" /> */}
        <span className="font-medium">Property ID: <span className="text-gray-800 font-semibold">{horooId}</span></span>
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <h3 className="text-xs md:text-sm text-gray-500 mb-3 font-medium">Rent per Day</h3>
        
        {/* Both Prices in Same Line */}
        <div className="flex items-center gap-3 flex-wrap mb-2">
          {/* Horoo Price (if exists and different) */}
          {horooPrice && ownerPrice && horooPrice > ownerPrice && (
            <div className="flex items-center gap-1 text-gray-400">
              <FaRupeeSign className="text-sm md:text-base" />
              <span className="text-lg md:text-xl line-through font-semibold">
                {horooPrice.toLocaleString()}
              </span>
            </div>
          )}
          
          {/* Owner Price (Main Price) */}
          <div className="flex items-center gap-1 text-orange-600">
            <FaRupeeSign className="text-xl md:text-2xl font-bold" />
            <span className="text-3xl md:text-4xl font-bold">
              {(ownerPrice || horooPrice)?.toLocaleString()}
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

      {/* Price Plans */}
      {pricePlans && pricePlans.length > 0 && (
        <div className="border-t border-gray-200 pt-4 mb-4">
          <div className="flex items-center gap-2 text-gray-700 mb-3">
            <FaTag className="text-orange-600" />
            <span className="text-xs md:text-sm font-semibold">Price Plans</span>
          </div>
          <div className="space-y-2">
            {pricePlans.map((plan, idx) => (
              <div 
                key={idx} 
                className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-xs md:text-sm text-gray-700"
              >
                {plan}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-xs md:text-sm font-medium">Availability</span>
          <div className="flex items-center gap-2">
            <FaCalendarCheck className={availability ? 'text-green-600' : 'text-red-600'} />
            <span className={`font-semibold text-sm md:text-base ${availability ? 'text-green-600' : 'text-red-600'}`}>
              {availability ? 'Available' : 'Not Available'}
            </span>
          </div>
        </div>
      </div>

      {/* Request to Book Button */}
      <button 
        onClick={onBookingRequest}
        disabled={!availability || isButtonDisabled}
        className={`w-full py-3 md:py-4 px-6 rounded-lg font-bold text-sm md:text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2
          ${availability && !isButtonDisabled
            ? 'bg-orange-600 hover:bg-orange-700 text-white' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        <FaCalendarCheck />
        {isButtonDisabled ? 'Request Already Sent' : 'Book Now'}
      </button>

      {/* Timer Message */}
      {isButtonDisabled && timeLeft > 0 && (
        <div className="mt-3 text-center text-xs md:text-sm text-gray-600 bg-orange-50 border border-orange-200 rounded-lg py-2 px-3">
          You can send request again after{' '}
          <span className="font-bold text-orange-600">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
}
