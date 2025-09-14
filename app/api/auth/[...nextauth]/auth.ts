// auth.ts - UPDATED
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/utils/db";
import User from "@/app/models/user";
import type { User as NextAuthUser } from "next-auth";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { api } from "@/app/utils/api";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth credentials");
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  // Add these for better error handling
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Create this page
  },

  callbacks: {
    async signIn({ user }: { user: NextAuthUser }) {
      await connectDB();
      if (user && user.email) {
        const dbUser = await User.findOneAndUpdate(
          { email: user.email },
          { $setOnInsert: { name: user.name, email: user.email } },
          { upsert: true, new: true }
        );
        user.id = dbUser._id.toString();
      }
      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.sub = user.id;
        const dbUser = await api.getUser(token.sub);
        token.isAdmin = dbUser?.isAdmin || false;
      }
      return token;
    },
  },
};