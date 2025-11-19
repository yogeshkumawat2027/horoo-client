"use client";
import { useState } from "react";

export default function RequestFormPopup({ open, setOpen, horooId, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Validate phone number
    if (formData.phone.length < 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          horooId,
          userName: formData.name,
          userPhoneNo: formData.phone,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFormData({ name: "", phone: "" }); // Reset form
        setOpen(false);
        onSuccess();
      } else {
        alert(data.message || 'Failed to submit request');
      }
    } catch (error) {
      console.error('Request submission error:', error);
      alert('Failed to submit request. Please try again.');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpen(false);
        }
      }}
    >
      <div 
        className="bg-white shadow-2xl border border-gray-200 w-full max-w-md p-6 rounded-xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-700 text-2xl hover:text-red-600 font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-900 text-center">
          Booking Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="font-medium text-gray-800">Horoo ID</label>
            <input
              type="text"
              value={horooId}
              readOnly
              className="w-full border border-gray-300 rounded-lg p-2 bg-gray-100 font-semibold text-gray-900"
            />
          </div>

          <div>
            <label className="font-medium text-gray-800">Your Name</label>
            <input
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-900"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="font-medium text-gray-800">Phone Number</label>
            <input
              type="tel"
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength="10"
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-900"
              placeholder="Enter 10-digit phone number"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg
            hover:bg-orange-700 transition active:scale-95 touch-manipulation"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
