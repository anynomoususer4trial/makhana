"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import Loader from "@/components/Loader";

const defaultSlides = [
  { type: "video", src: "/Intro.mp4" },
  { type: "image", src: "/Hero2.jpeg" },
  { type: "image", src: "/Hero3.png" },
  { type: "image", src: "/Hero4.png" },
  { type: "image", src: "/Hero5.jpeg" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch customization slides from API
  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch("/api/customization", { cache: "no-store" });
        const { data } = await res.json();
        if (data && data.heroSlides && data.heroSlides.length > 0) {
          setSlides(data.heroSlides);
        }
      } catch (err) {
        console.error("Failed to fetch custom hero slides");
      }
    }
    fetchConfig();
  }, []);

  // Auto-slide (images only)
  useEffect(() => {
    if (current === 0 || slides.length <= 1) return;

    const timer = setTimeout(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 1 : prev + 1
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [current, slides.length]);

  // Swipe support
  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -50) {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 1 : prev + 1
      );
    }
    if (info.offset.x > 50) {
      setCurrent((prev) =>
        prev === 1 ? slides.length - 1 : prev - 1
      );
    }
  };

  // Safety fallback: if media takes too long (5s), show hero anyway
  useEffect(() => {
    const timeout = setTimeout(() => setMediaLoaded(true), 5000);
    return () => clearTimeout(timeout);
  }, []);

  const currentSlide = slides[current];

  return (
    <>
      {/* Loader overlay until first media is ready */}
      <AnimatePresence>
        {!mediaLoaded && (
          <motion.div
            key="hero-loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <section
        className="relative w-full overflow-hidden aspect-video md:h-screen"
        style={{ visibility: mediaLoaded ? "visible" : "hidden" }}
      >
        {/* Slides */}
        <AnimatePresence mode="wait">
          {currentSlide.type === "video" ? (
            <motion.video
              key="video"
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onCanPlay={() => setMediaLoaded(true)}
              onEnded={() => setCurrent(1)}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 w-full h-full object-cover object-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <source src={currentSlide.src} type="video/mp4" />
            </motion.video>
          ) : (
            <motion.img
              key={currentSlide.src}
              src={currentSlide.src}
              alt="Hero Slide"
              onLoad={() => setMediaLoaded(true)}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 w-full h-full object-cover object-center"
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>

        {/* Soft Gradient Overlay (Desktop Only) */}
        <div className="hidden md:block absolute inset-0 bg-linear-to-b 
          from-[#FAF6F0]/10 
          via-[#FAF6F0]/30 
          to-[#FAF6F0]/70">
        </div>

        {/* First Slide Text */}
        {current === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">

            <div className="max-w-3xl">

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[22px] md:text-6xl font-light leading-tight tracking-wide"
                style={{ 
                  color: "#2F2A24",
                  letterSpacing: "0.5px"
                }}
              >
                From the Heart of Bihar
                <br />
                <span className="font-medium">
                  To Your Healthy Moments
                </span>
              </motion.h1>

              {/* Desktop subtitle only */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="hidden md:block text-lg mt-6 font-light"
                style={{ color: "#6B645C" }}
              >
                Naturally grown makhana crafted for modern snacking.
              </motion.p>

              {/* Button */}
              <Link href="/shop">
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 inline-flex items-center gap-2 px-7 py-2.5 rounded-full text-sm md:text-base shadow-md hover:scale-105 transition"
                style={{
                  backgroundColor: "#1F4D36",
                  color: "white"
                }}
              >
                <ShoppingBag size={16} />
                Shop Now
              </motion.button>
              </Link>

            </div>

          </div>
        )}

        {/* Progress Bar */}
        {current !== 0 && (
          <motion.div
            key={current}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="absolute bottom-0 left-0 h-[3px] bg-[#1F4D36]"
          />
        )}

        {/* Elegant Slide Indicators */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.slice(1).map((_, index) => {
            const slideIndex = index + 1;

            return (
              <button
                key={slideIndex}
                onClick={() => setCurrent(slideIndex)}
                className={`transition-all duration-300 rounded-full ${
                  current === slideIndex
                    ? "w-5 h-[3px] bg-[#1F4D36]"
                    : "w-4 h-[3px] bg-black/20"
                }`}
              />
            );
          })}
        </div>

      </section>
    </>
  );
}