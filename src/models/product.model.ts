import mongoose, { Schema, model, models } from "mongoose";

export interface IProduct {
  _id?: mongoose.Types.ObjectId;

  name: string;

  slug: string;

  description?: string;

  price: number;

  discountPrice?: number;

  category: string;

  images: string[];

  weight: string;

  stock: number;

  rating?: number;

  numReviews?: number;

  isFeatured?: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    description: {
      type: String
    },

    price: {
      type: Number,
      required: true
    },

    discountPrice: {
      type: Number
    },

    category: {
      type: String,
      required: true,
      index: true
    },

    images: [
      {
        type: String
      }
    ],

    weight: {
      type: String,
      required: true
    },

    stock: {
      type: Number,
      default: 0
    },

    rating: {
      type: Number,
      default: 0
    },

    numReviews: {
      type: Number,
      default: 0
    },

    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Search optimization
productSchema.index({ name: "text", description: "text" });

const Product = models.Product || model("Product", productSchema);

export default Product;