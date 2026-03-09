"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import FadeUp from "@/components/FadeUp";

const products = [
  {
    id: 1,
    name: "Premium Raw Makhana",
    weight: "100g Pack",
    price: 199,
    discount: 10,
    image: "/Hero3.png",
  },
  {
    id: 2,
    name: "Premium Raw Makhana",
    weight: "200g Pack",
    price: 349,
    discount: 15,
    image: "/Hero4.png",
  },
  {
    id: 3,
    name: "Premium Raw Makhana",
    weight: "250g Pack",
    price: 399,
    discount: 20,
    image: "/Hero5.jpeg",
  },
];

export default function ProductSection() {
  return (
    <section className="py-28 px-6 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto">

        <FadeUp>
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-light text-[var(--heading-color)] mb-4">
              Choose Your Pack
            </h2>
            <p className="text-[var(--color-muted)]">
              Light. Crunchy. Purely Premium.
            </p>
          </div>
        </FadeUp>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">

          {products.map((product, index) => {
            const finalPrice =
              product.price -
              (product.price * product.discount) / 100;

            return (
              <FadeUp key={product.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition flex flex-col"
                >
                  {/* IMAGE AREA (Dominant) */}
                  <div className="relative bg-[#F7F2EA] h-72 flex items-center justify-center">

                    {product.discount > 0 && (
                      <div className="absolute top-6 left-6 bg-[var(--color-accent)] text-white text-xs px-4 py-1 rounded-full shadow">
                        {product.discount}% OFF
                      </div>
                    )}

                    <motion.img
                      src={product.image}
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
                        ₹{finalPrice}
                      </span>

                      {product.discount > 0 && (
                        <span className="line-through text-[var(--color-muted)]">
                          ₹{product.price}
                        </span>
                      )}
                    </div>

                    <button className="mt-auto w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white py-3 rounded-full hover:opacity-90 transition">
                      <ShoppingBag size={18} />
                      Add to Cart
                    </button>

                  </div>
                </motion.div>
              </FadeUp>
            );
          })}

        </div>

      </div>
    </section>
  );
}