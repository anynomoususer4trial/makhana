"use client";

import FadeUp from "@/components/FadeUp";

export default function OfferBanner() {
  return (
    <section className="py-20 px-6 bg-[var(--color-primary)] text-white text-center">

      <FadeUp>
        <h2 className="text-2xl md:text-4xl font-light mb-4">
          Flat 15% OFF on All Orders
        </h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <p className="opacity-80 mb-6">
          Use code <span className="font-semibold">HEALTH15</span> at checkout.
        </p>
      </FadeUp>

      <FadeUp delay={0.2}>
        <button className="bg-white text-[var(--color-primary)] px-8 py-3 rounded-full hover:opacity-90 transition">
          Shop Now
        </button>
      </FadeUp>

    </section>
  );
}