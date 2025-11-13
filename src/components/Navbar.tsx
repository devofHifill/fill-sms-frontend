"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* --- Top Navbar --- */}
      <div className="h-14 shrink-0 border-b border-neutral-800 flex items-center justify-between px-4 bg-[#1a1b1e]">

        {/* Mobile Menu Button (Left Side) */}
        <button
          className="md:hidden p-2 rounded hover:bg-[#2b2d31]"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search contacts..."
          className="bg-[#2b2d31] text-sm px-3 py-2 rounded-full outline-none text-white placeholder-neutral-400 w-64 ml-2 hidden sm:block"
        />

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4 text-sm ml-auto">
          <button className="hover:text-blue-400">Settings</button>
          <button className="hover:text-red-400">Logout</button>
        </div>
      </div>

      {/* --- Mobile Sidebar Drawer --- */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 md:hidden animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="w-72 h-full bg-[#1a1b1e] border-r border-neutral-800 shadow-xl animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}

    </>
  );
}
