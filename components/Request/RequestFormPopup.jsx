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

    try {
      const res = await fetch("http://localhost:5000/api/requests", {
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
        setOpen(false);
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white shadow-2xl border border-gray-200 w-[90%] max-w-md p-6 rounded-xl relative">

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
              type="number"
              required
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-900"
              placeholder="Enter your phone number"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold text-lg
            hover:bg-orange-700 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
