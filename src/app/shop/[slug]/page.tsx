"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";
import { getProductBySlug } from "@/services/productService";
import { addToCart } from "@/redux/slices/cartSlice";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import ReviewList from "@/components/reviews/ReviewList";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slug = (params as any)?.slug;

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductBySlug(slug);
        if (res.data?.data?.product) {
          setProduct(res.data.data.product);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Added to cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-[var(--color-primary)] border-t-transparent animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center max-w-xl">
          <h2 className="text-2xl font-semibold mb-4">{error || "Product not found"}</h2>
          <button
            onClick={() => router.push("/shop")}
            className="mt-4 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white hover:opacity-90 transition"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] py-12 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <img
              src={product.images?.[0] || "/makhana-premium1.png"}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {product.images?.slice(1, 4).map((img) => (
              <div key={img} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <img src={img} alt={product.name} className="w-full h-28 object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-sm text-gray-500 mt-2">{product.category}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[var(--heading-color)]">
                  ₹{product.discountPrice || product.price}
                </div>
                {product.discountPrice && (
                  <div className="text-sm text-gray-500 line-through">₹{product.price}</div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 items-center">
              <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm">
                {product.ratings ? product.ratings.toFixed(1) : "0.0"} ★
              </span>
              <span className="text-sm text-gray-500">{product.numReviews || 0} reviews</span>
              <span className="text-sm text-gray-500">{product.inStock ? "In stock" : "Out of stock"}</span>
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white hover:opacity-90 transition disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                onClick={() => router.push("/checkout")}
                disabled={!product.inStock}
                className="px-6 py-3 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                Buy Now
              </button>
            </div>
          </div>

          <ReviewList productId={product._id} allowCreate={!!user} />
        </div>
      </div>
    </div>
  );
}
