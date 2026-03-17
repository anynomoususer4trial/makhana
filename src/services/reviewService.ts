import api from "./api";

export interface ReviewInput {
  productId: string;
  orderId?: string;
  rating: number;
  comment?: string;
}

export const getReviews = (productId: string) =>
  api.get("/reviews", { params: { productId } });

export const createReview = (review: ReviewInput) => {
  const payload: any = {
    productId: review.productId,
    rating: review.rating,
    comment: review.comment,
  };

  if (review.orderId) {
    payload.orderId = review.orderId;
  }

  return api.post("/reviews", payload);
};

export const updateReview = (reviewId: string, data: Partial<Pick<ReviewInput, "rating" | "comment">>) =>
  api.patch("/reviews", { reviewId, ...data });

export const deleteReview = (reviewId: string) =>
  api.delete("/reviews", { data: { reviewId } });
