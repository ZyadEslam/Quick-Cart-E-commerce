import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log("🔧 Loading auth configuration...");
console.log("Environment:", process.env.NODE_ENV);
console.log("VERCEL:", !!process.env.VERCEL);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session }) {
      // Send properties to the client
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("🔄 Redirect callback:", { url, baseUrl });
      
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      
      return baseUrl;
    },
  },
  pages: {
    error: '/auth/error',
    signIn: '/auth/signin',
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
