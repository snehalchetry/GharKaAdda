"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { db } from "@/lib/db";
import { Review } from "@/types";

interface ReviewFormProps {
  listingId: string;
  userId: string;
  onReviewSubmitted: () => void;
}

export default function ReviewForm({ listingId, userId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) {
      alert("Please provide both a rating and a comment");
      return;
    }

    setSubmitting(true);
    try {
      db.createReview({
        listingId,
        userId,
        rating,
        comment: comment.trim(),
      });
      setRating(0);
      setComment("");
      onReviewSubmitted();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating *
        </label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  star <= (hoverRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Comment *
        </label>
        <textarea
          id="comment"
          required
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Share your experience..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting || rating === 0}
        className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}

