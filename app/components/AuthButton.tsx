"use client";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../utils/api";
// import { useAppSelector } from "../utils/hooks";
export default function AuthButtons() {
  const { data: session } = useSession();

  const handleSignout = async () => {
    // Merge wishlist to DB
    if (localStorage.getItem("wishlist")) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") as string);
      console.log("wishlist: ", wishlist);
      await api.mergeWishlist(wishlist, session?.user.id);
    }

    // Merge cart to DB
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart") as string);
      console.log("cart: ", cart);
      await api.mergeCart(cart, session?.user.id);
    }

    signOut();
  };

  if (session?.user) {
    return (
      <div className="flex items-center gap-4 cursor-pointer ">
        <span>{session.user.name?.toUpperCase()}</span>
        <span className="sm:hidden md:block" onClick={handleSignout}>
          Sign out
        </span>
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center gap-2 cursor-pointer sm:order-2 md:order-auto">
        <Image src={assets.user_icon} alt="User" />
        <p onClick={() => signIn("google")}>Account</p>
      </div>
    </>
  );
}
