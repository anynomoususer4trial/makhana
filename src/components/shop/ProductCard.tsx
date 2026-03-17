"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product detail
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success(`${product.name} added to cart!`);
  };

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition flex flex-col"
    >
      <Link href={`/shop/${product.slug}`} className="flex flex-col h-full relative cursor-pointer">
        {/* IMAGE AREA (Dominant) */}
        <div className="relative bg-[#F7F2EA] h-72 flex items-center justify-center">

          {hasDiscount && (
            <div className="absolute top-6 left-6 bg-[var(--color-primary)] text-white text-xs px-4 py-1 rounded-full shadow">
              SALE
            </div>
          )}

          <motion.img
            src={product.images && product.images.length > 0 ? product.images[0] : "/makhana-premium1.png"}
            alt={product.name}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.4 }}
            className="w-[85%] h-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.15)]"
          />

          {/* Subtle Gradient Depth */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/5 to-transparent" />
        </div>

        {/* CONTENT AREA */}
        <div className="p-8 flex flex-col flex-grow">

          <h3 className="text-xl font-medium text-[var(--heading-color)] mb-2">
            {product.name}
          </h3>

          <span className="text-sm text-[var(--color-muted)] mb-6">
            {product.weight}
          </span>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-semibold text-[var(--heading-color)]">
              ₹{hasDiscount ? product.discountPrice : product.price}
            </span>

            {hasDiscount && (
              <span className="line-through text-[var(--color-muted)]">
                ₹{product.price}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="mt-auto w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white py-3 rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

        </div>
      </Link>
    </motion.div>
  );
}
