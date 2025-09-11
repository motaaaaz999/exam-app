"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      {/* Icon */}
      <AlertTriangle className="w-16 h-16 text-blue-600 mb-4" />

      {/* Title */}
      <h1 className="text-5xl font-bold text-blue-600 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      {/* Button */}
      <Link href="/">
        <Button size="lg" className="rounded-xl">
          Go Back Home
        </Button>
      </Link>
    </div>
  );
}
