// import NextAuth from "next-auth";
// import { authOptions } from "./auth";

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { authOptions } from "./auth";

// Add this to handle Vercel URL properly
const adjustedAuthOptions = {
  ...authOptions,
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
        secure:
          process.env.NEXTAUTH_URL?.startsWith("https://") ||
          process.env.VERCEL_URL !== undefined,
      },
    },
  },
};

const handler = NextAuth(adjustedAuthOptions);
export { handler as GET, handler as POST };
