"use client";
import { useState, useEffect } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

export default function FloatingCallButton() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // Show after 50px scroll
      setIsScrolling(true);

      // Clear previous timeout
      clearTimeout(scrollTimeout);

      // Set timeout to detect when scrolling stops
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 800); // 800ms after scrolling stops for smoother transition
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="fixed bottom-20 right-6 z-50 md:hidden">
      <a
        href="tel:+919166260477"
        className={`
          flex items-center justify-center
          transition-all duration-700 ease-out transform
          ${(isScrolled && isScrolling)
            ? 'bg-orange-600 hover:bg-orange-700 w-14 h-14 rounded-full shadow-2xl hover:scale-110' 
            : 'bg-orange-600 hover:bg-orange-700 px-4 py-3 rounded-full shadow-xl hover:scale-105'
          }
          text-white font-medium
        `}
      >
        {/* Icon (always visible) */}
        <FaPhoneAlt 
          className={`
            transition-all duration-500 ease-out
            ${(isScrolled && isScrolling) ? 'text-lg animate-pulse' : 'text-sm mr-2'}
          `}
        />
        
        {/* Text (hidden when scrolling) */}
        <span 
          className={`
            whitespace-nowrap text-sm font-semibold
            transition-all duration-600 ease-out
            ${(isScrolled && isScrolling)
              ? 'opacity-0 w-0 overflow-hidden transform scale-75' 
              : 'opacity-100 w-auto transform scale-100'
            }
          `}
        >
          Call us to Book Now
        </span>
      </a>
    </div>
  );
}