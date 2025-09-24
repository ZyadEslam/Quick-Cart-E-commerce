"use client";

import { Session } from "next-auth";
import { ProductCardProps } from "../types/types";
import { api, getBaseUrl } from "./api";
import { signOut } from "next-auth/react";

export const addToWishlistStorage = (
  product: ProductCardProps
): ProductCardProps[] | string => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") as string);
  if (wishlist) {
    const itemToAdd = wishlist.find(
      (item: ProductCardProps) => item._id === product._id
    ) as ProductCardProps;

    if (!itemToAdd) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      return wishlist;
    } else {
      return "Item Already in the wishlist";
    }
  } else {
    const wishlist = [product];
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    return wishlist;
  }
};

export const removeFromWishlistStorage = (
  productId: string
): ProductCardProps[] | string => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") as string);
  if (wishlist) {
    const itemToRemove = wishlist.find(
      (item: ProductCardProps) => item._id === productId
    );
    if (!itemToRemove) {
      return "Item is not in the wishlist";
    } else {
      const filteredWishlist = wishlist.filter(
        (item: ProductCardProps) => item._id !== productId
      );
      localStorage.setItem("wishlist", JSON.stringify(filteredWishlist));
      return filteredWishlist;
    }
  } else {
    localStorage.setItem("wishlist", JSON.stringify([]));
    return [];
  }
};

export const isInWishlistStorage = (id: string): boolean => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") as string);
  if (wishlist && Array.isArray(wishlist)) {
    return JSON.parse(localStorage.getItem("wishlist") as string).some(
      (item: ProductCardProps) => item._id === id
    );
  } else {
    localStorage.setItem("wishlist", JSON.stringify([]));
    return false;
  }
};

export const addToCartStorage = (
  product: ProductCardProps,
  quantity: number = 1
): ProductCardProps[] | string => {
  const cart = JSON.parse(localStorage.getItem("cart") as string);
  if (cart) {
    const itemToAdd = cart.find(
      (item: ProductCardProps) => item._id === product._id
    ) as ProductCardProps;

    if (!itemToAdd) {
      const productWithQuantity = { ...product, quantityInCart: quantity };
      cart.push(productWithQuantity);
      localStorage.setItem("cart", JSON.stringify(cart));
      return cart;
    } else {
      return "Item Already in the Cart";
    }
  } else {
    const productWithQuantity = { ...product, quantityInCart: quantity };
    const cart = [productWithQuantity];
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }
};

export const removeFromCartStorage = (
  productId: string
): ProductCardProps[] | string => {
  const cart = JSON.parse(localStorage.getItem("cart") as string);
  if (cart) {
    const itemToRemove = cart.find(
      (item: ProductCardProps) => item._id === productId
    );
    if (!itemToRemove) {
      return "Item is not in the Cart";
    } else {
      const filteredCart = cart.filter(
        (item: ProductCardProps) => item._id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(filteredCart));
      return filteredCart;
    }
  } else {
    localStorage.setItem("cart", JSON.stringify([]));
    return [];
  }
};

export const isInCartStorage = (id: string): boolean => {
  const cart = JSON.parse(localStorage.getItem("cart") as string);
  if (cart && Array.isArray(cart)) {
    return JSON.parse(localStorage.getItem("cart") as string).some(
      (item: ProductCardProps) => item._id === id
    );
  } else {
    localStorage.setItem("cart", JSON.stringify([]));
    return false;
  }
};

export const clearWishlistStorage = () => {
  localStorage.removeItem("wishlist");
};

export const clearCartStorage = () => {
  localStorage.removeItem("cart");
};

export const mergeCartWithDB = (
  localStorageCart: ProductCardProps[],
  dbCart: ProductCardProps[]
): ProductCardProps[] => {
  // Handle edge cases
  if (!Array.isArray(localStorageCart)) localStorageCart = [];
  if (!Array.isArray(dbCart)) dbCart = [];

  const mergedCart = [...dbCart];

  localStorageCart.forEach((localItem) => {
    if (!localItem || !localItem._id) return; // Skip invalid items
    // If item only exists in localStorage, add it to merged cart
    mergedCart.push(localItem);
  });

  return mergedCart;
};
export const mergeWishlistWithDB = (
  localStorageCart: ProductCardProps[],
  dbWishlist: ProductCardProps[]
): ProductCardProps[] => {
  // Handle edge cases
  if (!Array.isArray(localStorageCart)) localStorageCart = [];
  if (!Array.isArray(dbWishlist)) dbWishlist = [];

  const mergedWishlist = [...dbWishlist];

  localStorageCart.forEach((localItem) => {
    if (!localItem || !localItem._id) return; // Skip invalid items
    // If item only exists in localStorage, add it to merged wishlist
    mergedWishlist.push(localItem);
  });

  return mergedWishlist;
};

export const syncWishlistOnLogin = async (userId: string) => {
  try {
    // Get wishlist from DB

    const response = await fetch(`${getBaseUrl()}/api/user/${userId}/wishlist`);

    const { wishlist: dbWishlist } = await response.json();
    console.log("dbWishlist: ", dbWishlist);

    // Get wishlist from localStorage
    const localStorageCart = localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist") as string)
      : [];

    // Merge wishlists
    const mergedWishlist = mergeWishlistWithDB(localStorageCart, dbWishlist);

    // Update localStorage with merged wishlist
    localStorage.setItem("wishlist", JSON.stringify(mergedWishlist));

    console.log("wishlist synced on login:", mergedWishlist);
    return mergedWishlist;
  } catch (error) {
    console.error("Error syncing wishlist on login:", error);
    return [];
  }
};
export const syncCartOnLogin = async (userId: string) => {
  try {
    // Get cart from DB
    const response = await fetch(`${getBaseUrl()}/api/user/${userId}/cart`);
    const { cart: dbCart } = await response.json();

    // Get cart from localStorage
    const localStorageCart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") as string)
      : [];

    // Merge carts
    const mergedCart = mergeCartWithDB(localStorageCart, dbCart);

    // Update localStorage with merged cart
    localStorage.setItem("cart", JSON.stringify(mergedCart));

    console.log("Cart synced on login:", mergedCart);
    return mergedCart;
  } catch (error) {
    console.error("Error syncing cart on login:", error);
    return [];
  }
};

export const handleSignout = async (session: Session) => {
  console.log("🚪 Sign out button clicked");
  try {
    // Merge wishlist to DB
    if (localStorage.getItem("wishlist")) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") as string);
      console.log("wishlist: ", wishlist);
      const result = await api.mergeWishlist(wishlist, session?.user.id);
      localStorage.setItem("wishlist", JSON.stringify([])); // Clear local wishlist after merging
      console.log(result);
    }

    // Merge cart to DB
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart") as string);
      console.log("cart: ", cart);
      const result = await api.mergeCart(cart, session?.user.id);
      localStorage.setItem("cart", JSON.stringify([])); // Clear local cart after merging
      console.log(result);
    }
    console.log("🔄 Redirecting to:", getBaseUrl());
    await signOut({ callbackUrl: "/" });
  } catch (error) {
    console.error("❌ SignOut error:", error);
  }
};
