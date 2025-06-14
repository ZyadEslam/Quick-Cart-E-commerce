"use client";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
export default function AuthButtons() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <div className="flex items-center gap-4 cursor-pointer ">
        <span>{session.user.name?.toUpperCase()}</span>
        <span className="sm:hidden md:block" onClick={() => signOut()}>
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
