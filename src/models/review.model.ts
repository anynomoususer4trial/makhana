import mongoose, { Schema, model, models } from "mongoose";

export interface IReview {
  _id?: mongoose.Types.ObjectId;

  user: mongoose.Types.ObjectId;

  product: mongoose.Types.ObjectId;

  order: mongoose.Types.ObjectId;

  rating: number;

  comment?: string;

  createdAt?: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true
    },

    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    comment: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Compound index to prevent duplicate reviews for same user-product-order
reviewSchema.index({ user: 1, product: 1, order: 1 }, { unique: true });

const Review = models.Review || model("Review", reviewSchema);

export default Review;