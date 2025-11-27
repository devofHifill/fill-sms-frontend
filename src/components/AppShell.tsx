"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

interface AppShellProps {
  children: ReactNode;
}

function isChatRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  // Treat /contacts/[phone] as chat screen
  return pathname.startsWith("/contacts/") && pathname.split("/").length >= 3;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const chatRoute = isChatRoute(pathname);

  return (
    <div className="h-screen bg-[#111B21] text-white overflow-hidden">
      {/* 🔹 MOBILE LAYOUT (WhatsApp style) */}
      <div className="flex flex-col h-full md:hidden">
        {chatRoute ? (
          // Chat screen full-page
          <div className="flex-1 min-h-0">{children}</div>
        ) : (
          // Contact list full-page
          <>
            <Navbar />
            <div className="flex-1 min-h-0 overflow-hidden w-full">
              <Sidebar />
            </div>
          </>
        )}
      </div>

      {/* 🔹 DESKTOP LAYOUT (2-column WhatsApp style) */}
      <div className="hidden md:flex h-full">
        {/* Left: Navbar + Sidebar */}
        <div className="flex flex-col w-72 border-r border-[#1F2C34] bg-[#111B21] shrink-0">
          <Navbar />
          <div className="flex-1 min-h-0 overflow-hidden">
            <Sidebar />
          </div>
        </div>

        {/* Right: Chat section */}
        <div className="flex-1 min-h-0 bg-[#111B21] flex flex-col">
          <main className="flex-1 min-h-0 overflow-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
}
