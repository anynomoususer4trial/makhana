"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hooks";
import { createReview, updateReview } from "@/services/reviewService";
import { Review } from "@/types";

interface ReviewFormProps {
  productId: string;
  initialReview?: Review;
  orderId?: string;
  onSaved: () => void;
  onCancel?: () => void;
}

export default function ReviewForm({ productId, initialReview, orderId, onSaved, onCancel }: ReviewFormProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [rating, setRating] = useState(initialReview?.rating || 5);
  const [comment, setComment] = useState(initialReview?.comment || "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setRating(initialReview?.rating || 5);
    setComment(initialReview?.comment || "");
  }, [initialReview]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to leave a review");
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      toast.error("Please select a rating between 1 and 5");
      return;
    }

    setSubmitting(true);
    try {
      if (initialReview) {
        await updateReview(initialReview._id, { rating, comment });
        toast.success("Review updated");
      } else {
        await createReview({ productId, orderId: orderId || undefined, rating, comment });
        toast.success("Review submitted");
      }
      onSaved();
    } catch (error: any) {
      console.error("Review submit failed", error);
      toast.error(error?.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{initialReview ? "Update your review" : "Write a review"}</h3>
          <p className="text-sm text-gray-500">Share your experience and help others choose.</p>
        </div>
        {initialReview && onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        ) : null}
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className={`px-3 py-2 rounded-xl border font-semibold transition ${
                  rating === n
                    ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            placeholder="Tell us what you liked or what could be improved..."
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 rounded-xl bg-[var(--color-primary)] text-white hover:opacity-90 transition disabled:opacity-50"
          >
            {initialReview ? "Update Review" : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
