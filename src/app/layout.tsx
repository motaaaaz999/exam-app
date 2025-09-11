import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/global";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "@/context/next-auth.provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Exam App",
    template: "%s | Exam App",
  },
  description: "Smart exam platform to test your skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // throw new Error("Test error - showing error.tsx");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased`}
      >
        <NextAuthProvider>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}
