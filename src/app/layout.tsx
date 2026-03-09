"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmSans",
});

// export const metadata: Metadata = {
//   title: "Healthe Bites | Premium Makhana",
//   description: "Premium makhana sourced directly from Bihar.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <html lang="en">
      <body>

        <AnimatePresence>
          {loading && <Loader />}
        </AnimatePresence>

        {!loading && (
          <>
            <Navbar />
            {children}
            <Footer/>
          </>
        )}

      </body>
    </html>
  );
}