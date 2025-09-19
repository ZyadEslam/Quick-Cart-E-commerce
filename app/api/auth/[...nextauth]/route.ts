import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

console.log("🚀 NextAuth route handler loaded");
console.log("Environment:", process.env.NODE_ENV);
console.log("VERCEL:", !!process.env.VERCEL);

// Create handler with error handling
let handler;

try {
  console.log("✅ Creating NextAuth handler...");
  handler = NextAuth(authOptions);
  console.log("✅ NextAuth handler created successfully");
} catch (error) {
  console.error("❌ Failed to create NextAuth handler:", error);

  // Create a simple error handler
  handler = () => {
    return new Response(
      JSON.stringify({
        error: "NextAuth configuration error",
        details: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  };
}

export { handler as GET, handler as POST };
