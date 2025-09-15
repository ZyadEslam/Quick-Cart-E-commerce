// import { NextResponse } from "next/server";
// import { ProductCardProps } from "../types/types";

// const API_BASE_URL = `${
//   process.env.VERCEL_URL ? process.env.VERCEL_URL : "http://localhost:3000"
// }/api`;
// export const api = {
//   getProducts: async () => {
//     const res = await fetch(`${API_BASE_URL}/product`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       next: {
//         revalidate: 3600,
//       },
//     });
//     const data = await res.json();
//     return data.products;
//   },
//   getUser: async (id: string) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/user/${id}`);
//       const user = await response.json();
//       return user;
//     } catch (err) {
//       console.log(err);
//     }
//   },
//   getWishlist: async (userId: string) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/user/${userId}/wishlist`);
//       return response.json();
//     } catch (err) {
//       return NextResponse.json(err, { status: 500 });
//     }
//   },
//   mergeWishlist: async (
//     wishlistToAdd: ProductCardProps[],
//     userId: string | undefined
//   ) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/user/${userId}/wishlist`, {
//         method: "POST",
//         body: JSON.stringify({
//           wishlistToAdd,
//           // userId
//         }),
//       });
//       localStorage.setItem("wishlist", JSON.stringify([]));
//       return response.json();
//     } catch (err) {
//       return NextResponse.json(err, { status: 401 });
//     }
//   },
//   getCart: async (userId: string) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/user/${userId}/cart`);
//       return response.json();
//     } catch (err) {
//       return NextResponse.json(err, { status: 500 });
//     }
//   },
//   mergeCart: async (
//     cartToAdd: ProductCardProps[],
//     userId: string | undefined
//   ) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/user/${userId}/cart`, {
//         method: "POST",
//         body: JSON.stringify({
//           cartToAdd,
//         }),
//       });
//       localStorage.setItem("cart", JSON.stringify([]));
//       return response.json();
//     } catch (err) {
//       return NextResponse.json(err, { status: 401 });
//     }
//   },
// };

// api.ts - FIXED VERSION
import { NextResponse } from "next/server";
import { ProductCardProps } from "../types/types";

// Fix the base URL handling
function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

const API_BASE_URL = `${getBaseUrl()}/api`;

export const api = {
  getProducts: async () => {
    console.log("API_BASE_URL:", API_BASE_URL);

    try {
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
      console.log("fetche products:", data);

      return data.products;
    } catch (error) {
      console.log("Error fetching products:", error);
      return error;
    }
  },
  getUser: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${id}`);
      const user = await response.json();
      return user;
    } catch (err) {
      console.log(err);
      return null;
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wishlistToAdd,
        }),
      });
      // ✅ REMOVED localStorage call
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartToAdd,
        }),
      });
      // ✅ REMOVED localStorage call
      return response.json();
    } catch (err) {
      return NextResponse.json(err, { status: 401 });
    }
  },
};
