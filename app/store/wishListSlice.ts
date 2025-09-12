import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/types";
export interface WishlistState {
  wishlist: Product[];
  user: string | null;
  wishlistCounter: number;
}
const initialState: WishlistState = {
  wishlist: [],
  user: null,
  wishlistCounter: 0,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemToAdd = state.wishlist.find(
        (item) => item.id === action.payload.product.id
      ) as Product;

      if (!itemToAdd) {
        state.wishlistCounter += 1;
        state.wishlist.push(action.payload.product);
      } else {
        return;
      }
    },
    removeFromWishlist: (state, action) => {
      console.log(action.payload);
      const item = state.wishlist.find(
        (item) => item.id === action.payload
      ) as Product;
      if (item) {
        state.wishlistCounter -= 1;
        state.wishlist = state.wishlist.filter(
          (item) => item.id !== action.payload
        );
        
      }
    },
    clearWishlist: (state) => {
      state.wishlist = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export const wishlistReducer = wishlistSlice.reducer;
