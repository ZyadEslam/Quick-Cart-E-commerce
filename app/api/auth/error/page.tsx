// app/auth/error/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    console.log("Auth error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="mb-4">Something went wrong during authentication.</p>
        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        <button
          onClick={() => (window.location.href = "/auth/signin")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
