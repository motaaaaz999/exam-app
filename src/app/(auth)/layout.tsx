// app/(auth)/layout.tsx
import React from "react";
import LoginSidebar from "./login/_components/login-sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col-reverse lg:flex-row">
      {/* Sidebar Auth */}
      <div className="  lg:flex-1">
        <LoginSidebar />
      </div>

      {/* (Login/Register/Forgot Password) */}
      <div className="flex-1 ">{children} </div>
    </main>
  );
}
