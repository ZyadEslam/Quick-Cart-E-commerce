// api.ts - CORRECTED VERSION
import { NextResponse } from "next/server";
import { ProductCardProps } from "../types/types";

// Fixed base URL handling for both client and server
export function getBaseUrl() {
  // In the browser, use relative URLs (empty string means same origin)
  if (typeof window !== "undefined") return "";

  // For server-side rendering on Vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // For local development
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// For client-side calls, we should use relative URLs
// For server-side calls (SSR), we need the full URL
function getApiUrl(endpoint: string) {
  if (typeof window !== "undefined") {
    // Client-side: use relative URL
    return `/api${endpoint}`;
  } else {
    // Server-side: use full URL
    return `${getBaseUrl()}/api${endpoint}`;
  }
}

export const api = {
  getProducts: async () => {
    try {
      const url = getApiUrl("/product");
      console.log("Fetching products from:", url);

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched products:", data);
      return data.products || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },

  getProduct: async (id: string) => {
    try {
      const url = getApiUrl(`/product/${id}`);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }

      const { product: data } = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  },

  getUser: async (id: string) => {
    try {
      const url = getApiUrl(`/user/${id}`);
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user: ${response.status}`);
      }

      const user = await response.json();
      return user;
    } catch (err) {
      console.error("Error fetching user:", err);
      return null;
    }
  },

  getWishlist: async (userId: string) => {
    try {
      const url = getApiUrl(`/user/${userId}/wishlist`);
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch wishlist: ${response.status}`);
      }

      const wishlist = await response.json();
      return wishlist;
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      if (typeof window !== "undefined") {
        // Client-side error handling
        throw err;
      } else {
        // Server-side error handling
        return NextResponse.json(
          { error: "Failed to fetch wishlist" },
          { status: 500 }
        );
      }
    }
  },

  mergeWishlist: async (
    wishlistToAdd: ProductCardProps[],
    userId: string | undefined
  ) => {
    try {
      const url = getApiUrl(`/user/${userId}/wishlist`);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wishlistToAdd,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to merge wishlist: ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error("Error merging wishlist:", err);
      if (typeof window !== "undefined") {
        throw err;
      } else {
        return NextResponse.json(
          { error: "Failed to merge wishlist" },
          { status: 401 }
        );
      }
    }
  },

  getCart: async (userId: string) => {
    try {
      const url = getApiUrl(`/user/${userId}/cart`);
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error("Error fetching cart:", err);
      if (typeof window !== "undefined") {
        throw err;
      } else {
        return NextResponse.json(
          { error: "Failed to fetch cart" },
          { status: 500 }
        );
      }
    }
  },

  mergeCart: async (
    cartToAdd: ProductCardProps[],
    userId: string | undefined
  ) => {
    try {
      const url = getApiUrl(`/user/${userId}/cart`);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartToAdd,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to merge cart: ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error("Error merging cart:", err);
      if (typeof window !== "undefined") {
        throw err;
      } else {
        return NextResponse.json(
          { error: "Failed to merge cart" },
          { status: 401 }
        );
      }
    }
  },
};
