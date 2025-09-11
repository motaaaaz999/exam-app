"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FolderCode,
  GraduationCap,
  LogOut,
  Menu,
  MoreVertical,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import logo from "@/assets/Logo.png";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import AppBreadcrumb from "./_components/breadcrumb";

/**
 * MainLayout Component
 *
 * A responsive layout component that provides:
 * - Desktop sidebar navigation (hidden on mobile)
 * - Mobile sheet-based navigation with hamburger menu
 * - User authentication display and controls
 * - Breadcrumb navigation (desktop only)
 *
 * @param children - React nodes to be rendered in the main content area
 */
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ==== STATE ====
  const [mobileOpen, setMobileOpen] = useState(false);

  //  ==== HOOKS ====
  const pathname = usePathname();
  const { data: session } = useSession();

  // ==== MobileSidebarContent Component ====
  const MobileSidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Mobile Sidebar Header */}
      <header className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          {/* Logo */}
          <Image
            className="filter brightness-0 w-32"
            width={192}
            height={37}
            src={logo}
            alt="Elevate-Logo"
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Icon */}
          <FolderCode className="h-6 w-6 text-blue-600" />
          {/* Name */}
          <span className="font-semibold text-lg text-blue-600 font-mono">
            Exam App
          </span>
        </div>
      </header>

      {/* Mobile Navigation Links */}
      <div className="flex-1 p-4 space-y-2">
        {/* Diplomas navigation link */}
        <Link
          href="/diplomas"
          onClick={() => setMobileOpen(false)} //close mobile menu on navigation
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono transition-colors ${
            pathname.startsWith("/diplomas")
              ? "bg-blue-100 text-blue-600 border border-blue-500" // Active state styling
              : "hover:bg-gray-100"
          }`}
        >
          <GraduationCap className="h-5 w-5" />
          <span className="text-sm font-medium">Diplomas</span>
        </Link>

        {/* Account settings navigation link */}
        <Link
          href="/account/profile"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono transition-colors ${
            pathname.startsWith("/account")
              ? "bg-blue-100 text-blue-600 border border-blue-500"
              : "hover:bg-gray-100"
          }`}
        >
          <UserRound className="h-5 w-5" />
          <span className="text-sm font-medium">Account Settings</span>
        </Link>
      </div>

      {/* Mobile Footer */}
      <footer className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {/* User Avatar */}
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src="" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>

            {/* User Information */}
            <div className="flex flex-col font-mono min-w-0">
              <span className="text-sm font-semibold text-blue-600 truncate">
                {session?.firstName || "User"}
              </span>
              <span className="text-xs text-gray-500 truncate">
                {session?.email || "user@example.com"}
              </span>
            </div>
          </div>

          {/* Dropdown menu  */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex-shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[200px] font-mono font-medium"
              align="end"
            >
              {/* Account */}
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  setMobileOpen(false);
                }}
                asChild
              >
                <Link href="/account/profile">
                  <UserRound className="w-4 h-4 mr-2" /> Account
                </Link>
              </DropdownMenuItem>

              {/* Logout */}
              <DropdownMenuItem
                className="text-red-600 hover:text-red-600 focus:text-red-600 cursor-pointer"
                // redirect to login page
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                  setMobileOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </footer>
    </div>
  );

  // Desktop Sidebar Content
  const DesktopSidebarContent = () => (
    <>
      <SidebarHeader className="py-10 px-5 font-mono">
        {/* Header */}
        <header>
          {/* Logo */}
          <Image
            className="filter brightness-0"
            width={192}
            height={37}
            src={logo}
            alt="Elevate-Logo"
            priority={true}
          />
          <div className="flex items-center mt-[10px] gap-2">
            {/* Icon */}
            <FolderCode className="h-[30px] w-[30px] text-blue-600" />

            {/*App Name */}
            <span className="font-semibold text-xl text-blue-600">
              Exam App
            </span>
          </div>
        </header>
      </SidebarHeader>

      {/* Sidebar Content  */}
      <SidebarContent className="px-5 font-mono">
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Diplomas Navigation */}
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/diplomas")}
              className={`w-full justify-start py-5 m-0 ${
                pathname.startsWith("/diplomas")
                  ? "!bg-blue-100 !text-blue-600 border border-blue-500"
                  : "hover:!bg-blue-100"
              }`}
            >
              <Link href="/diplomas" className="flex items-center gap-3">
                <GraduationCap className="h-6 w-6" />
                <span className="text-base">Diplomas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            {/* Account Navigation */}
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/account")}
              className={`w-full justify-start py-5 ${
                pathname.startsWith("/account")
                  ? "!bg-blue-100 !text-blue-600 border border-blue-500"
                  : "hover:!bg-blue-100"
              }`}
            >
              <Link href="/account/profile" className="flex items-center gap-3">
                <UserRound className="h-6 w-6" />
                <span className="text-base">Account Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-3 py-5">
        {/* Footer */}
        <footer className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <Avatar className="h-7 w-7">
              <AvatarImage src="" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>

            {/* User Information */}
            <div className="flex flex-col font-mono font-medium">
              <span className="text-base text-blue-600">
                {session?.firstName}
              </span>
              <span className="text-sm text-gray-500">{session?.email}</span>
            </div>
          </div>

          {/* Dropdown menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-transparent"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[230px] font-mono font-medium"
              align="end"
            >
              {/* Account  */}
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/account/profile">
                  <UserRound className="w-4 h-4 mr-2" /> Account
                </Link>
              </DropdownMenuItem>

              {/* Logout */}
              <DropdownMenuItem
                className="text-red-600 hover:text-red-600 focus:text-red-600 cursor-pointer"
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                }}
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </footer>
      </SidebarFooter>
    </>
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50">
        {/* Desktop Sidebar - Hidden on mobile, visible on lg and up */}
        <aside className="hidden lg:block">
          <Sidebar className="border-r">
            <DesktopSidebarContent />
          </Sidebar>
        </aside>

        {/* Mobile Sidebar - Sheet for smaller screens */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            className="p-0 w-[280px] sm:w-[320px] bg-white"
          >
            <MobileSidebarContent />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main id="main-scroll" className="flex-1 overflow-auto">
          {/* Mobile Header with Menu Button */}
          <header className="lg:hidden sticky top-0 z-40 bg-white border-b">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {/* Menu Button  */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>

                <div className="flex items-center gap-2">
                  {/* icon */}
                  <FolderCode className="h-5 w-5 text-blue-600" />
                  {/* app name */}
                  <span className="font-semibold text-base text-blue-600 font-mono">
                    Exam App
                  </span>
                </div>
              </div>

              {/* Mobile User Avatar */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[200px] font-mono font-medium"
                  align="end"
                >
                  {/* User Information */}
                  <div className="px-2 py-1.5 text-sm border-b mb-1">
                    <p className="font-semibold text-blue-600">
                      {session?.firstName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session?.email || "user@example.com"}
                    </p>
                  </div>

                  {/* Account */}
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/account/profile">
                      <UserRound className="w-4 h-4 mr-2" /> Account
                    </Link>
                  </DropdownMenuItem>

                  {/* Logout */}
                  <DropdownMenuItem
                    className="text-red-600 hover:text-red-600 focus:text-red-600 cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Breadcrumb - Only on desktop */}
          <div className="hidden lg:block">
            <AppBreadcrumb />
          </div>

          {/* Page Content */}
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
