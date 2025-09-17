import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

console.log("🚀 NextAuth route handler loaded");
console.log("Environment:", process.env.NODE_ENV);
console.log("VERCEL:", !!process.env.VERCEL);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
