"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/public/assets/assets";
import { useState, useEffect } from "react";
import { AuthButtons, ToggleMenuBtn } from "./";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Heart, ShoppingCart } from "lucide-react";
import { api } from "../utils/api";

const UserNav = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getListsFromUser = async () => {
      if (localStorage.getItem("wishlist")) {
        if (
          session?.user &&
          Array.isArray(
            JSON.parse(localStorage.getItem("wishlist") as string)
          ) &&
          JSON.parse(localStorage.getItem("wishlist") as string)?.length === 0
        ) {
          const wishlist = await api.getWishlist(session?.user?.id as string);
          localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }
      } else {
        localStorage.setItem("wishlist", JSON.stringify([]));
      }
      if (localStorage.getItem("cart")) {
        if (
          session?.user &&
          JSON.parse(localStorage.getItem("cart") as string).length === 0
        ) {
          const cart = await api.getCart(session?.user?.id as string);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      } else {
        localStorage.setItem("cart", JSON.stringify([]));
      }
    };

    getListsFromUser();
  }, [session?.user]);

  return (
    <div
      className={`relative ${
        pathname.includes("/dashboard") ? "md:px-[2%]" : "md:px-[8.5%]"
      } sm:px-[5%] flex flex-row justify-between items-center py-2.5 border-b border-gray-300 text-[15px]`}
    >
      <Image src={assets.logo} alt="Logo" className="sm:w-28 md:w-29" />

      {!pathname.includes("/dashboard") ? (
        <>
          <ToggleMenuBtn isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <div
            className={`md:flex transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible md:opacity-100 md:visible"
            } z-40`}
          >
            <ul
              className={`flex md:gap-10 sm:gap-8 md:flex-row sm:flex-col sm:absolute md:relative sm:top-16 md:top-0 sm:right-0 md:right-auto sm:w-1/2 md:w-auto sm:bg-white sm:shadow-md md:shadow-none sm:rounded-lg md:rounded-none sm:p-4 md:p-0 items-center transition-transform duration-300 ${
                isMenuOpen
                  ? "translate-x-0"
                  : "translate-x-full md:translate-x-0"
              }`}
            >
              <Link
                href="/"
                className="hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="hover:text-primary transition-colors duration-200"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="hover:text-primary transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors duration-200"
              >
                Contact
              </Link>
              {session?.user && (
                <span
                  className="cursor-pointer md:hidden"
                  onClick={() => signOut()}
                >
                  Sign out
                </span>
              )}
              {session?.user.isAdmin && (
                <Link
                  href="/dashboard"
                  className="border border-gray-200 rounded-full text-[12px] px-4 py-1 hover:bg-gray-50 transition-colors duration-200"
                >
                  Seller Dashboard
                </Link>
              )}
              <div className="flex lg:gap-2 sm:gap-4">
                <Link href={"/wishlist"}>
                  <Heart className="w-5 h-5 text-orange hover:opacity-75" />
                </Link>
                <Link href={"/cart"}>
                  <ShoppingCart className="w-5 h-5 text-orange hover:opacity-75" />
                </Link>
              </div>
            </ul>
          </div>

          <AuthButtons />
        </>
      ) : (
        <Link
          href={"/"}
          className="px-2 py-2 rounded-sm text-[14px] text-white bg-primary "
        >
          Logout Admin Mode
        </Link>
      )}
    </div>
  );
};

export default UserNav;
React.memo(AuthButtons);
