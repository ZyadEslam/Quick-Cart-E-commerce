"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PrimaryBtn from "./PrimaryBtn";

const AdvSlider = ({
  images = [
    assets.cannon_camera_image,
    assets.header_headphone_image,
    assets.header_playstation_image,
  ],
  titles = [
    "Experience Professional Photography Gear",
    "Experience Pure Sound - Your Perfect Headphones Awaits!",
    "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
  ],
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full">
      <div className="relative w-full md:h-[350px] sm:h-[480px] overflow-hidden rounded-xl bg-secondary">
        <div className="h-full flex md:flex-row sm:flex-col">
          {/* Slider Text */}
          <motion.div
            key={`text-${currentIndex}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="sm:w-full md:w-[65%] flex flex-col justify-center px-[8.5%] text-primary md:order-1 sm:order-2"
          >
            <p className="text-orange md:text-lg sm:text-base sm:mb-2 md:mb-2">
              Exclusive Deal 40% Off
            </p>
            <h2 className="md:text-4xl sm:text-2xl font-bold mb-4">
              {titles[currentIndex]}
            </h2>
            <div className="flex items-center gap-4">
              <PrimaryBtn
                text="Shop Now"
                href="/shop"
                customClass="px-6 py-2 rounded-full"
              />
              <Link
                href="/shop"
                className="flex items-center text-primary  transition-colors group"
              >
                Learn More
                <span className="ml-2 font-bold text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Slider Image */}
          <div className="md:w-1/2 sm:w-full sm:h-[250px] md:h-auto md:relative md:order-2 sm:order-1 sm:relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-full h-full flex items-center justify-center"
              >
                <div className="relative w-[80%] h-[80%]">
                  <Image
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    style={{ objectFit: "contain", objectPosition: "center" }}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slider Dots - Positioned outside the slider */}
      {isMounted && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-2 mt-4"
        >
          {images.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-orange" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              suppressHydrationWarning
            />
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default AdvSlider;
