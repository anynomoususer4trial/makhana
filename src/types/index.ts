export interface User {
  id: string;
  email: string;
  name: string;
  mobile?: string;
  role?: 'user' | 'admin';
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  inStock: boolean;
  stock: number;
  weight?: string;
  ratings?: number;
  numReviews?: number;
}

export interface Review {
  _id: string;
  user: {
    _id?: string;
    name: string;
  };
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
}
