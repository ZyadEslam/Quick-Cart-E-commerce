// "use client";
// import { assets } from "@/public/assets/assets";
// import Image from "next/image";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { api } from "../utils/api";
// // import { useAppSelector } from "../utils/hooks";
// export default function AuthButtons() {
//   const { data: session } = useSession();

//   const handleSignout = async () => {
//     // Merge wishlist to DB
//     if (localStorage.getItem("wishlist")) {
//       const wishlist = JSON.parse(localStorage.getItem("wishlist") as string);
//       console.log("wishlist: ", wishlist);
//       await api.mergeWishlist(wishlist, session?.user.id);
//     }

//     // Merge cart to DB
//     if (localStorage.getItem("cart")) {
//       const cart = JSON.parse(localStorage.getItem("cart") as string);
//       console.log("cart: ", cart);
//       await api.mergeCart(cart, session?.user.id);
//     }

//     signOut();
//   };

//   if (session?.user) {
//     return (
//       <div className="flex items-center gap-4 cursor-pointer ">
//         <span>{session.user.name?.toUpperCase()}</span>
//         <span className="sm:hidden md:block" onClick={handleSignout}>
//           Sign out
//         </span>
//       </div>
//     );
//   }
//   return (
//     <>
//       <div className="flex items-center gap-2 cursor-pointer sm:order-2 md:order-auto">
//         <Image src={assets.user_icon} alt="User" />
//         <p onClick={() => signIn("google")}>Account</p>
//       </div>
//     </>
//   );
// }

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

  // const handleSignout = async () => {
  //   console.log("🚪 Sign out button clicked");
  //   try {
  //     // Merge wishlist to DB
  //     if (localStorage.getItem("wishlist")) {
  //       const wishlist = JSON.parse(localStorage.getItem("wishlist") as string);
  //       console.log("wishlist: ", wishlist);
  //       const result = await api.mergeWishlist(wishlist, session?.user.id);
  //       localStorage.setItem("wishlist", JSON.stringify([])); // Clear local wishlist after merging
  //       console.log(result);
  //     }

  //     // Merge cart to DB
  //     if (localStorage.getItem("cart")) {
  //       const cart = JSON.parse(localStorage.getItem("cart") as string);
  //       console.log("cart: ", cart);
  //       const result = await api.mergeCart(cart, session?.user.id);
  //       localStorage.setItem("cart", JSON.stringify([])); // Clear local cart after merging
  //       console.log(result);
  //     }
  //     console.log("🔄 Redirecting to:", getBaseUrl());
  //     // await signOut({ callbackUrl: getBaseUrl() });
  //   } catch (error) {
  //     console.error("❌ SignOut error:", error);
  //   }
  // };

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
