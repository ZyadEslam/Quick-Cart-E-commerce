import { NextResponse } from "next/server";
import { ProductCardProps } from "../types/types";

const API_BASE_URL = `${
  process.env.VERCEL_URL ? process.env.VERCEL_URL : "http://localhost:3000"
}/api`;

export const api = {
  getProducts: async () => {
    const res = await fetch(`${API_BASE_URL}/product`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
      },
    });
    const data = await res.json();
    return data.products;
  },
  getUser: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${id}`);
      const user = await response.json();
      return user;
    } catch (err) {
      console.log(err);
    }
  },
  getWishlist: async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}/wishlist`);
      return response.json();
    } catch (err) {
      return NextResponse.json(err, { status: 500 });
    }
  },
  mergeWishlist: async (
    wishlistToAdd: ProductCardProps[],
    userId: string | undefined
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}/wishlist`, {
        method: "POST",
        body: JSON.stringify({
          wishlistToAdd,
          // userId
        }),
      });
      localStorage.setItem("wishlist", JSON.stringify([]));
      return response.json();
    } catch (err) {
      return NextResponse.json(err, { status: 401 });
    }
  },
  getCart: async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}/cart`);
      return response.json();
    } catch (err) {
      return NextResponse.json(err, { status: 500 });
    }
  },
  mergeCart: async (
    cartToAdd: ProductCardProps[],
    userId: string | undefined
  ) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}/cart`, {
        method: "POST",
        body: JSON.stringify({
          cartToAdd,
        }),
      });
      localStorage.setItem("cart", JSON.stringify([]));
      return response.json();
    } catch (err) {
      return NextResponse.json(err, { status: 401 });
    }
  },
};
