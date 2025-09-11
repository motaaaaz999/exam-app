"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  ChevronLeft,
  UserRound,
  LogOut,
  CircleUserRound,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ==== STATE ====
  // State for controlling mobile sheet sidebar visibility
  const [open, setOpen] = useState(false);

  // ==== HOOKS ====
  const path = usePathname();

  // ==== NAVIGATION COMPONENT ====
  const NavLinks = () => (
    <nav className="p-4">
      {/* Profile Navigation Link */}
      <Link
        href="/account/profile"
        onClick={() => setOpen(false)} // Close mobile sheet on navigation
        className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-md",
          // blue background/text for active route, gray for inactive
          path === "/account/profile"
            ? "bg-blue-50 text-blue-600"
            : "text-gray-500"
        )}
      >
        <CircleUserRound size={24} />
        <span className="text-sm font-medium">Profile</span>
      </Link>

      {/* Change Password Navigation Link */}
      <Link
        href="/account/change-password"
        onClick={() => setOpen(false)} // Close mobile sheet on navigation
        className={cn(
          "flex items-center gap-3 px-3 py-3 rounded-md mt-4",
          // blue background/text for active route, gray for inactive
          path === "/account/change-password"
            ? "bg-blue-50 text-blue-600"
            : "text-gray-500"
        )}
      >
        <Lock size={24} />
        <span className="text-sm font-medium">Change Password</span>
      </Link>
    </nav>
  );

  return (
    <>
      {/* Header */}
      <header className="w-full flex gap-[10px] mb-5 flex-row-reverse ">
        <div className="bg-blue-600 flex flex-row w-full h-[77px] text-white p-4 text-3xl font-semibold">
          {/* Mobile sidebar */}
          <div className="lg:hidden mr-3 ">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                {/* Menu button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className=" hover:bg-blue-600  hover:text-white"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              {/* Mobile Sheet Content */}
              <SheetContent side="left" className="p-0 pt-6 w-[250px]">
                <div className="flex flex-col h-full justify-between ">
                  {/* Navigation Links */}
                  <NavLinks />

                  {/* Mobile Logout Button */}
                  <div className="p-4">
                    <Button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="w-full justify-start bg-red-50 text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={18} className="mr-2" />
                      <span className="text-sm">Logout</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Header */}
          <header className=" flex justify-center  items-center">
            {/* User Icon */}
            <UserRound className=" w-7 h-7 sm:h-11 sm:w-11" />
            {/* Title */}
            <h1 className="flex text-[20px] sm:text-3xl  items-center px-3">
              Account Settings
            </h1>
          </header>
        </div>

        {/* Back Navigation Button */}
        <Link href={`/diplomas`}>
          <Button className="h-[77px] w-[38px] bg-white border-[1.5px] hover:bg-white border-blue-600">
            <ChevronLeft className="h-6 w-6 text-blue-600" />
          </Button>
        </Link>
      </header>

      {/* Main Layout */}
      <div className="flex h-screen font-mono">
        {/*Desktop Sidebar - Hidden on mobile*/}
        <aside className="hidden lg:block w-64 border-r bg-white">
          <div className="h-full flex flex-col justify-between">
            {/* Navigation Links */}
            <NavLinks />

            {/* Logout Button */}
            <div className="p-4">
              <Button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full justify-start rounded-md bg-red-50 text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} className="mr-2" />
                <span className="text-sm">Logout</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-5 bg-white overflow-hidden">{children}</main>
      </div>
    </>
  );
}
