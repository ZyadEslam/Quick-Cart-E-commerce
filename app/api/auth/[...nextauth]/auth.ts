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

//   pages: {
//     signIn: '/auth/signin',
//     error: '/auth/error', 
//   },

//   callbacks: {
//     async signIn({ user }: { user: NextAuthUser }) {
//       try {
//         await connectDB();
//         if (user && user.email) {
//           const dbUser = await User.findOneAndUpdate(
//             { email: user.email },
//             { $setOnInsert: { name: user.name, email: user.email } },
//             { upsert: true, new: true }
//           );
//           user.id = dbUser._id.toString();
//         }
//         return true;
//       } catch (error) {
//         console.error("SignIn callback error:", error);
//         return false; // Return false to prevent sign-in on error
//       }
//     },
    
//     async session({ session, token }: { session: Session; token: JWT }) {
//       try {
//         if (session?.user && token?.sub) {
//           session.user.id = token.sub;
//           session.user.isAdmin = token.isAdmin as boolean;
//         }
//         return session;
//       } catch (error) {
//         console.error("Session callback error:", error);
//         return session; // Return session even if there's an error to prevent complete failure
//       }
//     },
    
//     async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
//       try {
//         if (user) {
//           token.sub = user.id;
//           // Add error handling for API call
//           try {
//             const dbUser = await api.getUser(token.sub);
//             token.isAdmin = dbUser?.isAdmin || false;
//           } catch (apiError) {
//             console.error("Error fetching user from API:", apiError);
//             token.isAdmin = false; // Default to false if API call fails
//           }
//         }
//         return token;
//       } catch (error) {
//         console.error("JWT callback error:", error);
//         return token; // Return token even if there's an error
//       }
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

console.log("🔍 Auth.ts Environment Check:");
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing");
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ Missing");
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "✅ Set" : "❌ Missing");
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Set" : "❌ Missing");

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("❌ Missing Google OAuth credentials");
  throw new Error("Missing Google OAuth credentials");
}

if (!process.env.NEXTAUTH_SECRET) {
  console.error("❌ Missing NEXTAUTH_SECRET");
  throw new Error("Missing NEXTAUTH_SECRET");
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', 
  },

  callbacks: {
    async signIn({ user }: { user: NextAuthUser }) {
      try {
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
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false; // Return false to prevent sign-in on error
      }
    },
    
    async session({ session, token }: { session: Session; token: JWT }) {
      try {
        if (session?.user && token?.sub) {
          session.user.id = token.sub;
          session.user.isAdmin = token.isAdmin as boolean;
        }
        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session; // Return session even if there's an error to prevent complete failure
      }
    },
    
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      try {
        if (user) {
          token.sub = user.id;
          // Add error handling for API call
          try {
            const dbUser = await api.getUser(token.sub);
            token.isAdmin = dbUser?.isAdmin || false;
          } catch (apiError) {
            console.error("Error fetching user from API:", apiError);
            token.isAdmin = false; // Default to false if API call fails
          }
        }
        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token; // Return token even if there's an error
      }
    },
  },
};