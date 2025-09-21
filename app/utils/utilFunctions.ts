"use client";

import { ProductCardProps } from "../types/types";

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
  if (localStorage.getItem("cart")) {
    return JSON.parse(localStorage.getItem("cart") as string).some(
      (item: ProductCardProps) => item._id === id
    );
  } else {
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

    const existingItem = mergedCart.find(
      (dbItem) => dbItem._id === localItem._id
    );

    if (existingItem) {
      // If item exists in both, use the higher quantity
      existingItem.quantityInCart = Math.max(
        existingItem.quantityInCart || 1,
        localItem.quantityInCart || 1
      );
    } else {
      // If item only exists in localStorage, add it to merged cart
      mergedCart.push(localItem);
    }
  });

  return mergedCart;
};

export const syncCartOnLogin = async (userId: string) => {
  try {
    // Get cart from DB
    const response = await fetch(
      `http://localhost:3000/api/user/${userId}/cart`
    );
    const dbCart = await response.json();

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
