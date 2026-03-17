import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/review.model";
import Product from "@/models/product.model";
import { authMiddleware } from "@/middleware/auth.middleware";
import { apiSuccess, apiError } from "@/utils/apiResponse";
import { handleError } from "@/utils/errorHandler";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) return apiError("Product ID required", 400);

    const reviews = await Review.find({ product: productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    return apiSuccess({ reviews });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user = await authMiddleware(req);
    if (!user) return apiError("Unauthorized", 401);

    const { productId, orderId, rating, comment } = await req.json();

    if (!productId || !rating) {
      return apiError("Product ID and rating are required", 400);
    }

    if (rating < 1 || rating > 5) {
      return apiError("Rating must be between 1 and 5", 400);
    }

    // Prevent duplicate reviews for the same product by the same user
    const existingReviewQuery: any = { user: user.userId, product: productId };
    if (orderId) {
      existingReviewQuery.order = orderId;
    }

    const existingReview = await Review.findOne(existingReviewQuery);
    if (existingReview) {
      return apiError("You have already reviewed this product", 400);
    }

    // Create review
    const review = await Review.create({
      user: user.userId,
      product: productId,
      order: orderId,
      rating,
      comment: comment?.trim() || ""
    });

    // Update product ratings
    const allReviews = await Review.find({ product: productId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    const numReviews = allReviews.length;

    await Product.findByIdAndUpdate(productId, {
      ratings: Math.round(avgRating * 10) / 10, // Round to 1 decimal
      numReviews
    });

    return apiSuccess({ review }, "Review submitted successfully");
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const user = await authMiddleware(req);
    if (!user) return apiError("Unauthorized", 401);

    const { reviewId, rating, comment } = await req.json();

    if (!reviewId) {
      return apiError("Review ID is required", 400);
    }

    const review = await Review.findOne({ _id: reviewId, user: user.userId });
    if (!review) {
      return apiError("Review not found", 404);
    }

    if (rating !== undefined) {
      if (rating < 1 || rating > 5) {
        return apiError("Rating must be between 1 and 5", 400);
      }
      review.rating = rating;
    }

    if (comment !== undefined) {
      review.comment = comment.trim();
    }

    await review.save();

    // Update product ratings
    const allReviews = await Review.find({ product: review.product });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    const numReviews = allReviews.length;
    await Product.findByIdAndUpdate(review.product, {
      ratings: Math.round(avgRating * 10) / 10,
      numReviews,
    });

    return apiSuccess({ review }, "Review updated successfully");
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const user = await authMiddleware(req);
    if (!user) return apiError("Unauthorized", 401);

    const { reviewId } = await req.json();
    if (!reviewId) {
      return apiError("Review ID is required", 400);
    }

    const review = await Review.findOneAndDelete({ _id: reviewId, user: user.userId });
    if (!review) {
      return apiError("Review not found", 404);
    }

    // Update product ratings
    const allReviews = await Review.find({ product: review.product });
    const avgRating = allReviews.length
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
      : 0;

    await Product.findByIdAndUpdate(review.product, {
      ratings: Math.round(avgRating * 10) / 10,
      numReviews: allReviews.length,
    });

    return apiSuccess({ message: "Review deleted" });
  } catch (error) {
    return handleError(error);
  }
}
