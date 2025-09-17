import NextAuth from "next-auth";
import { authOptions } from "./auth";

const adjustedAuthOptions = {
  ...authOptions,
  // Ensure the base URL is set correctly for production
  basePath: "/api/auth",
  // Add debug mode for production troubleshooting
  debug: process.env.NODE_ENV === "development",
  // This helps with OAuth callback URLs in production
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  // Add error handling
  events: {
    async signIn(message) {
      console.log("Sign in event:", message);
    },
    async signOut(message) {
      console.log("Sign out event:", message);
    },
    async createUser(message) {
      console.log("Create user event:", message);
    },
    async session(message) {
      console.log("Session event:", message);
    },
    async error(message) {
      console.error("NextAuth error:", message);
    },
  },
};

const handler = NextAuth(adjustedAuthOptions);
export { handler as GET, handler as POST };
