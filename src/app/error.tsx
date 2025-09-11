"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertOctagon } from "lucide-react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-red-50 p-6">
        {/* Icon */}
        <AlertOctagon className="w-16 h-16 text-red-600 mb-4" />

        {/* Title */}
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Something went wrong!
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          We’re sorry, an unexpected error occurred. <br />
          Please try again.
        </p>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={() => reset()} className="rounded-xl">
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="rounded-xl">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
