"use client";

import { motion } from "framer-motion";
import FadeUp from "@/components/FadeUp";

export default function BiharStory() {
  return (
    <section className="py-28 px-6 bg-white">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Image Side */}
        <FadeUp>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl overflow-hidden shadow-xl"
          >
            <img
              src="/Hero2.jpeg"
              alt="Bihar Makhana Source"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </FadeUp>

        {/* Content Side */}
        <div>

          <FadeUp>
            <div className="mb-6">
              <span className="text-sm tracking-widest text-[var(--color-accent)] uppercase">
                Our Roots
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-light text-[var(--heading-color)] mb-6 leading-snug">
              From the Lakes of Bihar
              <br />
              to Your Everyday Snack
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-[var(--color-muted)] leading-relaxed mb-6">
              Our makhana is sourced directly from the fertile lakes of Bihar,
              where generations of farmers have cultivated it with care.
              We work closely with local growers to ensure purity,
              freshness, and authentic taste in every pack.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="text-[var(--color-muted)] leading-relaxed">
              Every bite carries the richness of tradition and the promise
              of clean, mindful nutrition.
            </p>
          </FadeUp>

        </div>

      </div>

    </section>
  );
}