"use client";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
// import { handleSignout } from "../utils/utilFunctions";
import { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import { LogIn, LogOut } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

export default function AuthButtons(screen: { screen: "mobile" | "desktop" }) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingOperation, setLoadingOperation] = useState<
    "signin" | "signout" | null
  >(null);
  const { manualSync: syncCart } = useCart();
  const { manualSync: syncWishlist } = useWishlist();
  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setLoadingOperation("signin");
      console.log("🚀 Starting Google sign in...");
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: true,
      });
      console.log("✅ SignIn result:", result);
    } catch (error) {
      console.error("❌ SignIn error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignout = async () => {
    console.log("🚪 Sign out button clicked");
    try {
      // Sync cart and wishlist before signing out
      setIsLoading(true);
      setLoadingOperation("signout");
      await syncCart();
      await syncWishlist();
      console.log("🔄 Cart and Wishlist synced successfully");
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("❌ SignOut error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("🔍 Session status:", status);
  console.log("👤 Session data:", session);

  if (isLoading) {
    return (
      <LoadingOverlay
        isVisible={isLoading}
        message={
          loadingOperation === "signin"
            ? "Redirecting to google auth..."
            : " Signing out..."
        }
        icon={loadingOperation === "signin" ? <LogIn /> : <LogOut />}
      />
    );
  }

  if (session?.user) {
    if (screen.screen === "mobile") {
      return (
        <span
          className="cursor-pointer md:hidden"
          onClick={() => {
            handleSignout();
          }}
        >
          Sign out
        </span>
      );
    }
    return (
      <div className="flex items-center gap-4 cursor-pointer ">
        <span>{session.user.name?.toUpperCase()}</span>
        <span
          className="sm:hidden md:block"
          onClick={() => {
            handleSignout();
          }}
        >
          Sign out
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 cursor-pointer sm:order-2 md:order-auto">
        <Image src={assets.user_icon} alt="User" />
        <p onClick={handleSignIn}>Account</p>
      </div>
    </>
  );
}
