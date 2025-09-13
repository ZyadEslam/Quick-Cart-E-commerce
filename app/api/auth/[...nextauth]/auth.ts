// import GoogleProvider from "next-auth/providers/google";
// import connectDB from "@/app/utils/db";
// import User from "@/app/models/user";
// import type { User as NextAuthUser } from "next-auth";
// import type { Session } from "next-auth";
// import type { JWT } from "next-auth/jwt";
// import { api } from "@/app/utils/api";
// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   throw new Error("Missing Google OAuth credentials");
// }

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async signIn({ user }: { user: NextAuthUser }) {
//       await connectDB();
//       if (user && user.email) {
//         const dbUser = await User.findOneAndUpdate(
//           { email: user.email },
//           { $setOnInsert: { name: user.name, email: user.email } },
//           { upsert: true, new: true }
//         );
//         // Save the MongoDB _id to the user object for later use
//         user.id = dbUser._id.toString();
//       }
//       return true;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       // Attach the user id to the session
//       if (session?.user && token?.sub) {
//         session.user.id = token.sub;
//         session.user.isAdmin = token.isAdmin as boolean;
//       }
//       return session;
//     },

//     async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
//       if (user) {
//         token.sub = user.id;
//         const dbUser = await api.getUser(token.sub);
//         token.isAdmin = dbUser.isAdmin;
//       }
//       return token;
//     },
//   },
// };


import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/utils/db";
import User from "@/app/models/user";
import type { User as NextAuthUser } from "next-auth";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { api } from "@/app/utils/api";

// Add this function at the top
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.NEXTAUTH_URL || 'http://localhost:3000';
}

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

  // Add this to ensure proper URL handling
  theme: {
    logo: `${getBaseUrl()}/logo.png`, // or your logo path
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
        // Save the MongoDB _id to the user object for later use
        user.id = dbUser._id.toString();
      }
      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Attach the user id to the session
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
        token.isAdmin = dbUser.isAdmin;
      }
      return token;
    },
  },
};