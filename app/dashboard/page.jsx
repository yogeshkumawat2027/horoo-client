"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [ownerData, setOwnerData] = useState(null);

  useEffect(() => {
    // Check if owner is logged in
    const token = localStorage.getItem('ownerToken');
    const owner = localStorage.getItem('ownerData');
    
    if (!token || !owner) {
      // Redirect to list-rental if not logged in
      router.push('/list-rental');
      return;
    }
    
    try {
      setOwnerData(JSON.parse(owner));
    } catch (error) {
      console.error('Error parsing owner data:', error);
      router.push('/list-rental');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('ownerToken');
    localStorage.removeItem('ownerData');
    router.push('/list-rental');
  };

  if (!ownerData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Owner Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Welcome, {ownerData.name}!
          </h2>
          <p className="text-gray-600">
            Your dashboard is currently under construction. New features coming soon!
          </p>
        </div>

        {/* Owner Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Your Information
          </h3>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-medium text-gray-700 w-32">Name:</span>
              <span className="text-gray-600">{ownerData.name}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-700 w-32">Mobile:</span>
              <span className="text-gray-600">{ownerData.mobile}</span>
            </div>
            {ownerData.address && (
              <div className="flex">
                <span className="font-medium text-gray-700 w-32">Address:</span>
                <span className="text-gray-600">{ownerData.address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            More Features Coming Soon
          </h3>
          <p className="text-gray-600 mb-6">
            We're working on adding property management features, analytics, and more!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-3">🏠</div>
              <h4 className="font-semibold text-gray-900 mb-2">List Properties</h4>
              <p className="text-sm text-gray-600">Add and manage your rental properties</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="font-semibold text-gray-900 mb-2">View Analytics</h4>
              <p className="text-sm text-gray-600">Track your property performance</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl mb-3">💬</div>
              <h4 className="font-semibold text-gray-900 mb-2">Manage Inquiries</h4>
              <p className="text-sm text-gray-600">Respond to tenant requests</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
