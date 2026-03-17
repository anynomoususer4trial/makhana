"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Truck, Package, Star, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface OrderItem {
  product: {
    _id: string;
    name: string;
    images?: string[];
  };
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  _id: string;
  orderItems: OrderItem[];
  shippingAddress: {
    fullName: string;
    mobile: string;
    pincode: string;
    state: string;
    city: string;
    area: string;
    landmark?: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  totalPrice: number;
  createdAt: string;
}

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState<{ [key: string]: { rating: number; comment: string } }>({});

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      } else {
        toast.error("Failed to load order details");
      }
    } catch (error) {
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (productId: string) => {
    const review = reviewData[productId];
    if (!review || review.rating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          orderId,
          rating: review.rating,
          comment: review.comment,
        }),
      });

      if (res.ok) {
        toast.success("Review submitted successfully!");
        // Clear review data for this product
        setReviewData(prev => ({ ...prev, [productId]: { rating: 0, comment: "" } }));
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing": return "bg-yellow-100 text-yellow-600";
      case "shipped": return "bg-blue-100 text-blue-600";
      case "delivered": return "bg-green-100 text-green-600";
      case "cancelled": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing": return <Package size={16} />;
      case "shipped": return <Truck size={16} />;
      case "delivered": return <CheckCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
          <p className="text-gray-600 mb-8">The order you're looking for doesn't exist.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Order Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Order #{order._id.slice(-8)}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(order.orderStatus)}`}>
              {getStatusIcon(order.orderStatus)}
              {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Date</h3>
              <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Payment Method</h3>
              <p className="text-gray-600 capitalize">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Items & Reviews */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>

              <div className="space-y-6">
                {order.orderItems.map((item) => (
                  <div key={item.product._id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex gap-4">
                      <img
                        src={item.image || "/makhana-premium1.png"}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">Quantity: {item.quantity}</p>
                        <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                      </div>
                    </div>

                    {/* Review Section - Only show if order is delivered */}
                    {order.orderStatus === "delivered" && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-3">Write a Review</h4>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => setReviewData(prev => ({
                                    ...prev,
                                    [item.product._id]: {
                                      ...prev[item.product._id],
                                      rating: star
                                    }
                                  }))}
                                  className={`text-2xl ${star <= (reviewData[item.product._id]?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                >
                                  ★
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Comment (Optional)</label>
                            <textarea
                              value={reviewData[item.product._id]?.comment || ""}
                              onChange={(e) => setReviewData(prev => ({
                                ...prev,
                                [item.product._id]: {
                                  ...prev[item.product._id],
                                  comment: e.target.value
                                }
                              }))}
                              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
                              rows={3}
                              placeholder="Share your experience with this product..."
                            />
                          </div>

                          <button
                            onClick={() => submitReview(item.product._id)}
                            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl hover:opacity-90 transition text-sm"
                          >
                            Submit Review
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Shipping */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-blue-500" />
                Shipping Address
              </h2>

              <div className="space-y-2">
                <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
                <p className="text-gray-600 flex items-center gap-2">
                  <Phone size={14} />
                  {order.shippingAddress.mobile}
                </p>
                <p className="text-gray-600">
                  {order.shippingAddress.area}, {order.shippingAddress.city}
                </p>
                <p className="text-gray-600">
                  {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                {order.shippingAddress.landmark && (
                  <p className="text-gray-600">Landmark: {order.shippingAddress.landmark}</p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{order.totalPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>

                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span>₹{order.totalPrice}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/shop"
                  className="block w-full text-center bg-[var(--color-primary)] text-white py-3 rounded-full font-medium hover:opacity-90 transition"
                >
                  Continue Shopping
                </Link>

                <Link
                  href="/orders"
                  className="block w-full text-center bg-gray-100 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-200 transition"
                >
                  View All Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}