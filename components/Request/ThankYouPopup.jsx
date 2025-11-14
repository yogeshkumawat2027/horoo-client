"use client";
import { useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";

export default function ThankYouPopup({ open, setOpen }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setOpen(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-sm p-6 rounded-xl border border-gray-200 shadow-2xl relative">

        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-700 text-2xl hover:text-red-600 font-bold"
        >
          ×
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <FaThumbsUp className="text-green-500 text-5xl" />
        </div>

        <p className="text-center text-gray-700 mt-3 font-medium">
          Your request has been successfully submitted.
          <br />
          Our team will contact you soon.
        </p>
      </div>
    </div>
  );
}
