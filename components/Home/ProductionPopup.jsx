import React, { useEffect } from 'react';

export default function ProductionPopup({ open, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Production announcement"
        className="relative w-full max-w-xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 z-60"
      >
        <button
          onClick={onClose}
          aria-label="Close popup"
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <div className="flex flex-col items-start gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">Horoo in Production phase  ....</h2>
          <p className="text-gray-700">
            Our platform is now live in production. You can browse listings and reserve services — booking features
            will be available very soon. Thank you for being with us during this launch phase. For any queries,
            contact us and we'll assist you promptly.
          </p>

          <div className="mt-2 text-black flex items-center gap-3">
          Contact Us : 9166260477
          </div>
        </div>
      </div>
    </div>
  );
}
