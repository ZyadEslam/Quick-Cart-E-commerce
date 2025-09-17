// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth";

// console.log("🚀 NextAuth route handler loaded");
// console.log("Environment:", process.env.NODE_ENV);
// console.log("VERCEL:", !!process.env.VERCEL);

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Minimal configuration for testing
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async signIn() {
      console.log("✅ Simple signIn callback");
      return true;
    },
  },
});

export { handler as GET, handler as POST };
