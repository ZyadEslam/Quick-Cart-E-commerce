"use client";
import React from "react";

const SubscriptionOffer = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <section className="text-center mt-18 px-4 rounded-xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2 md:mb-4">
        Subscribe now & get 20% off
      </h1>
      <p className="text-gray-400 mb-4 md:mb-6 text-[14px] sm:text-[16px] max-w-md mx-auto">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row max-w-xs sm:max-w-md md:max-w-2xl mx-auto overflow-hidden border border-gray-300 rounded-lg shadow-sm">
          <input
            type="email"
            placeholder="Enter your email id"
            className="flex-grow px-4 py-3 focus:outline-none w-full"
            suppressHydrationWarning
          />
          <button
            type="submit"
            className="bg-orange text-white px-6 py-3 font-medium hover:bg-orange/90 transition-colors w-full sm:w-auto"
            suppressHydrationWarning
          >
            Subscribe
          </button>
        </div>
      </form>
    </section>
  );
};

export default SubscriptionOffer;
