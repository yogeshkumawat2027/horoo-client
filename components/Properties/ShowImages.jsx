"use client";
import { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ShowImages({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Filter out any null/undefined images
  const validImages = images.filter(img => img);

  // Auto-slide for mobile
  useEffect(() => {
    if (validImages.length <= 1) return;
    
    // Only auto-slide on mobile (screen width < 768px)
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [validImages.length]);

  if (validImages.length === 0) {
    return (
      <div className="bg-gray-200 rounded-xl h-64 md:h-96 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <>
      {/* Desktop Layout - Grid View */}
      <div className="hidden md:block">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden h-[350px]">
          {/* Main Large Image - Takes 2 cols and 2 rows */}
          <div 
            className="col-span-2 row-span-2 relative cursor-pointer group"
            onClick={() => {
              setCurrentIndex(0);
              setShowFullscreen(true);
            }}
          >
            <img
              src={validImages[0]}
              alt="Main property"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>

          {/* Top Right - 2 Images */}
          {validImages.slice(1, 3).map((img, idx) => (
            <div
              key={idx}
              className="col-span-1 row-span-1 relative cursor-pointer group"
              onClick={() => {
                setCurrentIndex(idx + 1);
                setShowFullscreen(true);
              }}
            >
              <img
                src={img}
                alt={`Property ${idx + 2}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          ))}

          {/* Bottom Right - 1 Image */}
          {validImages[3] && (
            <div
              className="col-span-1 row-span-1 relative cursor-pointer group"
              onClick={() => {
                setCurrentIndex(3);
                setShowFullscreen(true);
              }}
            >
              <img
                src={validImages[3]}
                alt="Property 4"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
          )}

          {/* Show More Images Button - Bottom Right */}
          {validImages.length > 4 && (
            <div
              className="col-span-1 row-span-1 relative cursor-pointer group bg-gray-900"
              onClick={() => {
                setCurrentIndex(4);
                setShowFullscreen(true);
              }}
            >
              {validImages[4] && (
                <img
                  src={validImages[4]}
                  alt="More images"
                  className="w-full h-full object-cover opacity-40"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <p className="text-2xl font-bold">+{validImages.length - 4}</p>
                  <p className="text-sm">More</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout - Swipeable with Dots and "+X more" indicator */}
      <div className="md:hidden">
        <div className="relative rounded-xl overflow-hidden">
          {/* Main Image with Touch Swipe */}
          <div 
            className="relative h-64 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={validImages[currentIndex]}
              alt={`Property ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Image Counter */}
            <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentIndex + 1} / {validImages.length}
            </div>

            {/* +X More Button - Always visible when more than 4 images */}
            {validImages.length > 4 && (
              <div 
                className="absolute bottom-2 right-2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer hover:bg-black/90 transition-all"
                onClick={() => setShowFullscreen(true)}
              >
                +{validImages.length - 4} more
              </div>
            )}
          </div>

          {/* Dots Navigation */}
          {validImages.length > 1 && (
            <div className="flex justify-center gap-2 mt-3 pb-2">
              {validImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === idx
                      ? 'w-8 h-2 bg-orange-600'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 text-white p-3 bg-black/50 rounded-full hover:bg-black/70 transition-all z-10"
          >
            <FaTimes className="text-2xl" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
            {currentIndex + 1} / {validImages.length}
          </div>

          {/* Navigation Arrows */}
          {validImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-4 bg-black/50 rounded-full hover:bg-black/70 transition-all"
              >
                <FaChevronLeft className="text-2xl" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-4 bg-black/50 rounded-full hover:bg-black/70 transition-all"
              >
                <FaChevronRight className="text-2xl" />
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="w-full h-full flex items-center justify-center p-4">
            <img
              src={validImages[currentIndex]}
              alt={`Property ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 overflow-x-auto">
            <div className="flex gap-2 justify-center">
              {validImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => goToImage(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    currentIndex === idx
                      ? 'border-orange-600 scale-110'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
