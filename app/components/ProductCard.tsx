"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/public/assets/assets";
import Link from "next/link";
import Toast from "../UI/Toast";
import { Heart } from "lucide-react";
// import { WishlistToStorageHandler } from "../utils/utilFunctions";
import { getBaseUrl } from "../utils/api";
import {
  addToWishlistStorage,
  isInWishlistStorage,
  removeFromWishlistStorage,
} from "../utils/utilFunctions";
import { ProductCardProps } from "../types/types";

const ProductCard = ({ product }: { product: ProductCardProps }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(isInWishlistStorage(product._id as string));
  }, [product._id]);

  const [showToast, setShowToast] = useState({ show: false, message: "" });
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

  const wishlistHandler = () => {
    if (!isInWishlist) {
      addToWishlistStorage(product);
      handleShowToast(true, "Added To wishlist");
      setIsInWishlist(true);
    } else {
      removeFromWishlistStorage(product._id as string);
      handleShowToast(true, "Removed from wishlist");
      setIsInWishlist(false);
    }
  };

  return (
    <div className="relative md:w-1/6 sm:w-[48%] h-[320px]">
      <div
        className={`absolute top-2 right-2 z-100 rounded-full hover:text-orange cursor-pointer`}
        onClick={wishlistHandler}
      >
        <Heart
          className={`w-4 h-4 ${
            isInWishlist ? " text-orange " : "text-gray-500"
          } hover:text-orange`}
        />
      </div>
      {showToast.show && (
        <Toast
          state={showToast.message.includes("Added") ? "success" : "fail"}
          message={showToast.message}
        ></Toast>
      )}
      <Link
        href={`${getBaseUrl()}/product/${product._id}`}
        className="md:w-1/6 sm:w-[48%] h-[320px]"
      >
        <div className="relative bg-secondaryLight rounded-lg mb-2">
          <Image
            src={`/api/product/image/${product._id}?index=0`}
            alt={`${product.name}`}
            width={300}
            height={300}
            className="w-full h-full hover:scale-[1.05] transition-all duration-300"
          />
        </div>
        <p className="font-medium">{product.name}</p>
        <p className="text-[12px] font-light text-gray-400 truncate">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[12px] ">{product.rating}</span>
          <span className="flex items-center gap-1">
            {Array.from({ length: product.rating }).map((_, index) => (
              <Image
                key={"product star" + index}
                src={assets.star_icon}
                width={12}
                height={12}
                alt="star_icon"
              />
            ))}
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
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold ">{product.price}</span>
          <span className="text-[12px] border border-gray-200 rounded-full px-4 py-1 text-gray-500">
            Buy now
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
