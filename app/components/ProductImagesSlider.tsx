"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProductImagesSliderProps {
  product: {
    _id: string;
    name: string;
    imgSrc: string[];
  };
}

const ProductImagesSlider = ({ product }: ProductImagesSliderProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());

  // Initialize loading state for all images
  useEffect(() => {
    const initialLoadingState = new Set(
      product.imgSrc.map((_, index) => index)
    );
    setLoadingImages(initialLoadingState);
  }, [product.imgSrc]);

  const handleImageError = (index: number) => {
    setFailedImages((prev) => new Set([...prev, index]));
    setLoadingImages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
    // If the failed image is the currently selected one, try to select another valid image
    if (index === selectedImageIndex) {
      const nextValidIndex = product.imgSrc.findIndex(
        (_, i) => !failedImages.has(i)
      );
      if (nextValidIndex !== -1) {
        setSelectedImageIndex(nextValidIndex);
      }
    }
  };

  const handleImageLoad = (index: number) => {
    setLoadingImages((prev) => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  if (!product?.imgSrc?.length) {
    return (
      <div className="w-full md:w-1/3 relative md:left-20">
        <div className="bg-secondaryLight rounded-lg mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 md:p-4">
          <div className="w-full h-[300px] animate-pulse bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // Filter out failed images
  const validImages = product.imgSrc.filter(
    (_, index) => !failedImages.has(index)
  );

  if (validImages.length === 0) {
    return (
      <div className="w-full md:w-1/3 relative md:left-20">
        <div className="bg-secondaryLight rounded-lg mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 md:p-4">
          <div className="w-full h-[300px] flex items-center justify-center text-gray-400">
            No images available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/3 relative md:left-20">
      <div className="bg-secondaryLight rounded-lg mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 md:p-4">
        <div className="relative w-full h-[300px]">
          {loadingImages.has(selectedImageIndex) && (
            <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-lg"></div>
          )}
          <Image
            src={validImages[selectedImageIndex]}
            alt={product.name}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              loadingImages.has(selectedImageIndex)
                ? "opacity-0"
                : "opacity-100"
            }`}
            width={500}
            height={500}
            priority
            onError={() => handleImageError(selectedImageIndex)}
            onLoad={() => handleImageLoad(selectedImageIndex)}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-3 md:mt-4 justify-center sm:justify-start">
        {validImages.map((img, index) => (
          <div
            key={index}
            className={`rounded-lg cursor-pointer p-1 relative ${
              selectedImageIndex === index
                ? "border-2 border-orange"
                : "bg-secondaryLight"
            }`}
            onClick={() => setSelectedImageIndex(index)}
          >
            {loadingImages.has(index) && (
              <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-lg"></div>
            )}
            <Image
              src={img}
              alt={`${product.name} view ${index + 1}`}
              width={80}
              height={80}
              className={`w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] object-cover transition-opacity duration-300 ${
                loadingImages.has(index) ? "opacity-0" : "opacity-100"
              }`}
              onError={() => handleImageError(index)}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImagesSlider;
