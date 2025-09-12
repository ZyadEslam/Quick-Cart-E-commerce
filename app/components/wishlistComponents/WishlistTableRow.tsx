import React, { useEffect, useState } from "react";
import { ProductCardProps } from "../../types/types";
import Link from "next/link";
import Image from "next/image";
import Toast from "../../UI/Toast";
import {
  addToCartStorage,
  isInCartStorage,
  removeFromWishlistStorage,
} from "@/app/utils/utilFunctions";

interface WishlistTableProps {
  product: ProductCardProps;
  setWishlist(wishlist: ProductCardProps[]): void;
}

const WishlistTableRow = ({ product, setWishlist }: WishlistTableProps) => {
  const [showToast, setShowToast] = useState({ show: false, message: "" });
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (isInCartStorage(product._id as string)) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [product._id]);

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

  const removeFromWishlistHandler = (product: ProductCardProps) => {
    const filteredWishlist = removeFromWishlistStorage(product._id as string);
    if (typeof filteredWishlist !== "string") {
      setWishlist(filteredWishlist as ProductCardProps[]);
      handleShowToast(true, "Removed from wishlist");
    } else {
      handleShowToast(true, "Item is not in the wishlist");
    }
  };

  const addToCartHandler = (product: ProductCardProps) => {
    const cart = addToCartStorage(product, 1);
    if (typeof cart !== "string") {
      handleShowToast(true, "Added To Cart");
      setIsInCart(true);
    } else {
      handleShowToast(true, "The item is already in the cart");
    }
  };
  return (
    <tr key={product._id} className="table-row">
      <td className="flex">
        <div className="p-4 bg-gray-200 rounded mr-4">
          <Link href={`/product/${product._id}`} className="w-fit">
            <Image
              src={`/api/product/image/${product._id}?index=0`}
              width={52}
              height={52}
              alt="Product Image"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-gray-600">{product.name}</p>
          <p
            className="text-orange/80 text-sm cursor-pointer hover:opacity-85"
            onClick={() => {
              removeFromWishlistHandler(product as ProductCardProps);
            }}
          >
            Remove from Wishlist
          </p>
          {showToast.show && (
            <Toast
              state={showToast.message.includes("Added") ? "success" : "fail"}
              message={showToast.message}
            />
          )}
        </div>
      </td>
      <td className="text-gray-600">
        <p>${product.price}</p>
      </td>
      <td className="flex flex-col md:items-center gap-2">
        <button
          className="bg-[#104547] w-fit p-2 rounded text-white cursor-pointer hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            addToCartHandler(product);
          }}
          disabled={isInCart}
        >
          {isInCart ? "Item In Cart" : "Add To Cart"}
        </button>
        {isInCart && (
          <Link
            href={"/cart"}
            className="text-orange/80 text-sm hover:opacity-85"
          >
            Go to Cart
          </Link>
        )}
      </td>
    </tr>
  );
};

export default WishlistTableRow;
