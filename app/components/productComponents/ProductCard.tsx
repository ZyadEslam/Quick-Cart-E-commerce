"use client";
import React, { lazy, Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductCardProps } from "../../types/types";
import { useWishlist } from "../../hooks/useWishlist";
const Toast = lazy(() => import("../../UI/Toast"));
const ProductImage = lazy(() => import("./ProductImage"));

const ProductCard = ({ product }: { product: ProductCardProps }) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [showToast, setShowToast] = useState({ show: false, message: "" });
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setInWishlist(isInWishlist(product._id as string));

    if (product._id) {
      setImageSrc(`/api/product/image/${product._id}?index=0`);
    }
  }, [product._id, isInWishlist]);

  const handleShowToast = (showState: boolean, message: string) => {
    setShowToast(() => {
      return {
        show: showState,
        message: message,
      };
    });
    setTimeout(() => {
      setShowToast(() => {
        return { show: false, message: "" };
      });
    }, 3000);
  };

  const wishlistHandler = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking heart
    e.stopPropagation();

    if (!inWishlist) {
      addToWishlist(product);
      handleShowToast(true, "Added To wishlist");
      setInWishlist(true);
    } else {
      removeFromWishlist(product._id as string);
      handleShowToast(true, "Removed from wishlist");
      setInWishlist(false);
    }
  };

  const handleImageError = () => {
    console.error("Image failed to load");
    setImageError(true);
  };

  return (
    <div className="relative md:w-1/6 sm:w-[48%] h-[320px]">
      <div
        className={`absolute top-2 right-2 z-20 rounded-full hover:text-orange cursor-pointer`}
        onClick={wishlistHandler}
      >
        <Heart
          className={`w-4 h-4 ${
            inWishlist ? " text-orange " : "text-gray-500"
          } hover:text-orange`}
          fill={inWishlist ? "#ff7d1a" : "none"}
        />
      </div>
      {showToast.show && (
        <Toast
          state={showToast.message.includes("Added") ? "success" : "fail"}
          message={showToast.message}
        ></Toast>
      )}
      {/* Product Image */}
      <Link
        href={`/product/${product._id}`}
        className="md:w-1/6 sm:w-[48%] h-[320px]"
      >
        <div className="relative bg-secondaryLight rounded-lg mb-2 h-[180px] overflow-hidden">
          {imageSrc && !imageError ? (
            <Suspense>
              <ProductImage
                productName={product.name}
                imageSrc={imageSrc}
                handleImageError={handleImageError}
              />
            </Suspense>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
        {/* Product Details */}
        <p className="font-medium">{product.name}</p>
        <p className="text-[12px] font-light text-gray-400 truncate">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[12px] ">{product.rating}</span>
          <span className="flex items-center gap-1">
            {Array.from({ length: Math.floor(product.rating) }).map(
              (_, index) => (
                <Image
                  key={"product star" + index}
                  src={assets.star_icon}
                  width={12}
                  height={12}
                  alt="star_icon"
                />
              )
            )}
            {Array.from({ length: Math.ceil(5 - product.rating) }).map(
              (_, index) => (
                <Image
                  key={"product star" + index}
                  src={assets.star_dull_icon}
                  width={12}
                  height={12}
                  alt="star_icon"
                />
              )
            )}
          </span>
        </div>
        {/* Price and Buy Now */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold ">${product.price}</span>
          <span className="text-[12px] border border-gray-200 rounded-full px-4 py-1 text-gray-500">
            Buy now
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
