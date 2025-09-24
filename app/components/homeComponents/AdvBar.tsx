"use client";
import { assets } from "@/public/assets/assets";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PrimaryBtn from "../PrimaryBtn";

const AdvBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set mounted state
    setIsMounted(true);

    // Initial check
    handleResize();

    // Add event listener
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Return a loading state instead of null
  if (!isMounted) {
    return (
      <div className="relative w-full text-center md:h-[250px] sm:h-[fit] mt-15 overflow-hidden rounded-xl bg-secondary animate-pulse">
        <div className="w-full h-full flex sm:flex-col md:flex-row justify-between items-center sm:gap-4 gap-0">
          <div className="md:w-auto h-[100%] sm:w-[70%] md:ml-5 bg-gray-200"></div>
          <div className="md:w-1/4 sm:w-full">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded mt-4"></div>
            <div className="h-10 bg-gray-200 rounded mt-4"></div>
          </div>
          <div className="w-auto h-[100%] bg-gray-200"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full text-center md:h-[250px] sm:h-[fit] mt-15 overflow-hidden rounded-xl bg-secondary">
      <div className="w-full h-full flex sm:flex-col md:flex-row justify-between items-center sm:gap-4 gap-0">
        <Image
          className="md:w-auto h-[100%] sm:w-[70%] md:ml-5"
          src={assets.jbl_soundbox_image}
          alt="Adv Bar"
          priority
        />
        <div className="md:w-1/4 sm:w-full">
          <h1 className="font-bold md:text-3xl sm:text-2xl">
            Level Up Your Gaming Experience
          </h1>
          <p className="text-sm text-gray-500 md:my-4 sm:my-3 font-medium">
            From immersive sound to precise controls—everything you need to win
          </p>
          <PrimaryBtn
            text="Buy Now"
            href="/shop"
            customClass="px-12 py-2 rounded"
          />
        </div>
        <Image
          src={
            isMobile ? assets.sm_controller_image : assets.md_controller_image
          }
          className="w-auto h-[100%]"
          alt="Adv Bar"
          priority
        />
      </div>
    </div>
  );
};

export default AdvBar;
