"use client";
import { useState } from 'react';
import { FaStar, FaRegStar, FaUserCircle } from 'react-icons/fa';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function ReviewSection({ 
  propertyId, 
  propertyType,
  averageRating = 3.5,
  totalRatings = 0,
  reviews = [],
  onReviewAdded
}) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setError('');

    // Check if user is logged in
    const token = localStorage.getItem('userToken');
    if (!token) {
      setError('Please login to leave a review');
      return;
    }

    if (message.trim().length < 10) {
      setError('Review message must be at least 10 characters');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          propertyId,
          propertyType,
          rating,
          message: message.trim()
        })
      });

      const data = await res.json();

      if (data.success) {
        setMessage('');
        setRating(5);
        setShowReviewForm(false);
        if (onReviewAdded) {
          onReviewAdded();
        }
        alert('Review submitted successfully! It will be visible after admin approval.');
      } else {
        setError(data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (count, size = 'text-base') => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= count ? (
              <FaStar className={`text-yellow-500 ${size}`} />
            ) : (
              <FaRegStar className={`text-gray-300 ${size}`} />
            )}
          </span>
        ))}
      </div>
    );
  };

  const renderInteractiveStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            {star <= rating ? (
              <FaStar className="text-yellow-500 text-2xl" />
            ) : (
              <FaRegStar className="text-gray-300 text-2xl hover:text-yellow-300" />
            )}
          </button>
        ))}
        <span className="ml-2 text-gray-700 font-medium">{rating}.0</span>
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Rating Summary - Compact */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg">
            <FaStar className="text-yellow-500 text-lg" />
            <span className="text-xl font-bold text-gray-800">
              {averageRating?.toFixed(1) || '3.5'}
            </span>
            <span className="text-sm text-gray-500">
              ({totalRatings} {totalRatings === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 mb-6">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {review.user?.profilePicture ? (
                    <img 
                      src={review.user.profilePicture} 
                      alt={review.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-gray-400 text-4xl" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {review.user?.name || 'Anonymous'}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(review.rating, 'text-sm')}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Leave a Review Button */}
      {!showReviewForm && (
        <button
          onClick={() => setShowReviewForm(true)}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Leave a Review
        </button>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Write a Review</h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            {renderInteractiveStars()}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
              placeholder="Share your experience with this property..."
              required
              minLength="10"
            />
            <div className="text-xs text-gray-500 mt-1">
              Minimum 10 characters
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowReviewForm(false);
                setError('');
                setMessage('');
                setRating(5);
              }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
