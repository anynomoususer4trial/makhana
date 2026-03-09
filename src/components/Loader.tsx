"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--color-bg)]">

      <div className="flex flex-col items-center gap-10">

        {/* Floating Makhana Group */}
        <div className="flex items-end gap-10">

          {[0, 1, 2].map((i) => {
            const isCenter = i === 1;

            return (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  scale: isCenter ? [1, 1.08, 1] : [1, 1.04, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
                className="relative flex flex-col items-center"
              >
                {/* Animated Shadow */}
                <motion.div
                  animate={{
                    scaleX: [1, 0.7, 1],
                    opacity: [0.2, 0.1, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-0 w-10 h-3 bg-black/20 blur-md rounded-full"
                />

                <img
                  src="/makhana.png"
                  alt="makhana"
                  className={`object-contain drop-shadow-xl ${
                    isCenter ? "w-20 h-20" : "w-14 h-14"
                  }`}
                />
              </motion.div>
            );
          })}

        </div>

        {/* Brand Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-base tracking-[0.4em] font-light text-[var(--heading-color)]"
        >
          HEALTHEBITES
        </motion.p>

      </div>
    </div>
  );
}