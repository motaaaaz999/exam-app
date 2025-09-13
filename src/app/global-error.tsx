"use client";

import Link from "next/link";
import { AlertOctagon } from "lucide-react";
import "@/app/global-error.css";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: ErrorProps) {
  return (
    <html>
      <body>
        <main>
          <div className="error-container">
            <AlertOctagon className="error-icon" />

            <h1 className="error-title">Something went wrong!</h1>

            <p className="error-message">
              We’re sorry, an unexpected error occurred. <br />
              Please try again.
            </p>

            <div className="error-actions">
              <button onClick={() => reset()} className="btn btn-primary">
                Try Again
              </button>
              <Link href="/" legacyBehavior>
                <span className="btn btn-outline">Go Home</span>
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
