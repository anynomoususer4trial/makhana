"use client";

import { Instagram, Facebook, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg)] border-t border-neutral-200 py-16 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

        {/* Brand */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="text-center md:text-left"
>
  <img
    src="/hBLOGO.svg"
    alt="HealtheBites Logo"
    className="h-20 md:h-24 w-auto mx-auto md:mx-0 mb-8 object-contain"
  />

  <p className="text-[var(--color-muted)] leading-relaxed text-sm max-w-sm mx-auto md:mx-0">
    Premium makhana sourced from Bihar, crafted for mindful and modern snacking.
  </p>
</motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-medium text-[var(--heading-color)] mb-4">
            Quick Links
          </h4>
          <ul className="space-y-3 text-[var(--color-muted)] text-sm">
            <li className="hover:text-[var(--color-primary)] transition">Shop</li>
            <li className="hover:text-[var(--color-primary)] transition">About</li>
            <li className="hover:text-[var(--color-primary)] transition">Contact</li>
          </ul>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h4 className="text-lg font-medium text-[var(--heading-color)] mb-4">
            Connect With Us
          </h4>

          <div className="flex gap-5">
            <Instagram className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition cursor-pointer" />
            <Facebook className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition cursor-pointer" />
            <Twitter className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition cursor-pointer" />
          </div>
        </motion.div>

      </div>

      {/* Bottom Line */}
      <div className="mt-16 text-center text-sm text-[var(--color-muted)]">
        © {new Date().getFullYear()} HealtheBites. All rights reserved.
      </div>

    </footer>
  );
}