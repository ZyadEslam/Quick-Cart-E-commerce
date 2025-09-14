// app/auth/error/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(errorParam);
      console.error("Authentication error:", errorParam);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Authentication Error
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 font-medium">Error: {error}</p>
            <p className="text-red-600 text-sm mt-2">
              This usually means there is an issue with the OAuth configuration.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Link
            href="/api/auth/signin"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors block text-center"
          >
            Try Signing In Again
          </Link>

          <Link
            href="/"
            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors block text-center"
          >
            Go Back Home
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            If this error persists, check your Google OAuth configuration and
            ensure all redirect URIs are properly set in Google Cloud Console.
          </p>
        </div>
      </div>
    </div>
  );
}
