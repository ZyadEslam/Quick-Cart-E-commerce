"use client";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { handleSignout } from "../utils/utilFunctions";
import { Session } from "next-auth";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  const handleSignIn = async () => {
    try {
      console.log("🚀 Starting Google sign in...");
      const result = await signIn("google", {
        callbackUrl: "/",
        redirect: true,
      });
      console.log("✅ SignIn result:", result);
    } catch (error) {
      console.error("❌ SignIn error:", error);
    }
  };

  console.log("🔍 Session status:", status);
  console.log("👤 Session data:", session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4 cursor-pointer ">
        <span>{session.user.name?.toUpperCase()}</span>
        <span
          className="sm:hidden md:block"
          onClick={() => {
            handleSignout(session as Session);
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
