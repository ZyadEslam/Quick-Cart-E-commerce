import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/utils/db";
import User from "@/app/models/user";
import type { User as NextAuthUser } from "next-auth";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { api } from "@/app/utils/api";
import type { NextAuthOptions } from "next-auth";

console.log("🔍 Auth Config Environment Check:");
console.log(
  "GOOGLE_CLIENT_ID:",
  process.env.GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing"
);
console.log(
  "GOOGLE_CLIENT_SECRET:",
  process.env.GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ Missing"
);
console.log(
  "NEXTAUTH_SECRET:",
  process.env.NEXTAUTH_SECRET ? "✅ Set" : "❌ Missing"
);
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("VERCEL_URL:", process.env.VERCEL_URL);

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("❌ Missing Google OAuth credentials");
}

if (!process.env.NEXTAUTH_SECRET) {
  console.error("❌ Missing NEXTAUTH_SECRET");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user }: { user: NextAuthUser }) {
      console.log("🔐 SignIn callback triggered for user:", user.email);
      try {
        await connectDB();
        if (user && user.email) {
          const dbUser = await User.findOneAndUpdate(
            { email: user.email },
            { $setOnInsert: { name: user.name, email: user.email } },
            { upsert: true, new: true }
          );
          user.id = dbUser._id.toString();
          console.log("✅ User processed successfully");
        }
        return true;
      } catch (error) {
        console.error("❌ SignIn callback error:", error);
        return true; // Still allow sign-in even if DB fails
      }
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("🔄 Session callback triggered");
      try {
        if (session?.user && token?.sub) {
          session.user.id = token.sub;
          session.user.isAdmin = token.isAdmin as boolean;
        }
        return session;
      } catch (error) {
        console.error("❌ Session callback error:", error);
        return session;
      }
    },

    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      console.log("🔑 JWT callback triggered");
      try {
        if (user) {
          token.sub = user.id;
          try {
            const dbUser = await api.getUser(token.sub);
            token.isAdmin = dbUser?.isAdmin || false;
          } catch (apiError) {
            console.error("❌ Error fetching user from API:", apiError);
            token.isAdmin = false;
          }
        }
        return token;
      } catch (error) {
        console.error("❌ JWT callback error:", error);
        return token;
      }
    },

    async redirect({ url, baseUrl }) {
      console.log("🔄 Redirect callback:", { url, baseUrl });
      // Ensures that redirects are always to the same site
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  events: {
    async signIn(message) {
      console.log("✅ Sign in event:", message);
    },
    async signOut(message) {
      console.log("👋 Sign out event:", message);
    },
    async createUser(message) {
      console.log("👤 User created event:", message);
    },
    async session(message) {
      console.log("🔄 Session event:", message);
    },
  },
};
