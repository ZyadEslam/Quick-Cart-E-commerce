// import NextAuth from "next-auth";
// import { authOptions } from "./auth";

// const adjustedAuthOptions = {
//   ...authOptions,
//   // Ensure the base URL is set correctly for production
//   basePath: "/api/auth",
//   // Add debug mode for production troubleshooting
//   debug: process.env.NODE_ENV === "development",
//   // This helps with OAuth callback URLs in production
//   cookies: {
//     sessionToken: {
//       name: `next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: process.env.NODE_ENV === "production",
//       },
//     },
//   },
//   // Add error handling
//   events: {
//     async signIn(message) {
//       console.log("Sign in event:", message);
//     },
//     async signOut(message) {
//       console.log("Sign out event:", message);
//     },
//     async createUser(message) {
//       console.log("Create user event:", message);
//     },
//     async session(message) {
//       console.log("Session event:", message);
//     },
//     async error(message) {
//       console.error("NextAuth error:", message);
//     },
//   },
// };

// const handler = NextAuth(adjustedAuthOptions);
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { authOptions } from "./auth";

// Wrap the entire configuration in try-catch
let adjustedAuthOptions;
try {
  adjustedAuthOptions = {
    ...authOptions,
    // Enable debug mode to see detailed error logs
    debug: true,
    // Ensure the base URL is set correctly for production
    basePath: "/api/auth",
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
    // Add comprehensive error handling and logging
    events: {
      async signIn(message) {
        console.log("✅ Sign in successful:", message);
      },
      async signOut(message) {
        console.log("👋 Sign out:", message);
      },
      async createUser(message) {
        console.log("👤 User created:", message);
      },
      async session(message) {
        console.log("🔄 Session accessed:", message);
      },
      async error(message) {
        console.error("❌ NextAuth error:", message);
      },
    },
    // Override callbacks with better error logging
    callbacks: {
      ...authOptions.callbacks,
      async signIn(params) {
        console.log("🔐 SignIn callback triggered:", params);
        try {
          const result = await authOptions.callbacks.signIn(params);
          console.log("✅ SignIn callback result:", result);
          return result;
        } catch (error) {
          console.error("❌ SignIn callback error:", error);
          return false;
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
  };

  console.log("🌍 Environment check:");
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  console.log("GOOGLE_CLIENT_ID exists:", !!process.env.GOOGLE_CLIENT_ID);
  console.log(
    "GOOGLE_CLIENT_SECRET exists:",
    !!process.env.GOOGLE_CLIENT_SECRET
  );
  console.log("NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);
} catch (error) {
  console.error("❌ Critical error in NextAuth configuration:", error);

  // Fallback configuration that will at least show errors
  adjustedAuthOptions = {
    providers: [],
    pages: {
      error: "/auth/error",
    },
    events: {
      async error(message) {
        console.error("❌ NextAuth fallback error:", message);
      },
    },
  };
}

const handler = NextAuth(adjustedAuthOptions);
export { handler as GET, handler as POST };
