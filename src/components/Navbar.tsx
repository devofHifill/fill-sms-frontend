"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Users, Circle, MessageSquare, MoreVertical, Search } from "lucide-react";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-[#202C33] border-b border-[#1F2C34] md:w-72 md:shrink-0">

        {/* WhatsApp-style top icon row */}
        <div className="flex items-center justify-between px-4 h-14">
          <div className="w-10 h-10 rounded-full bg-[#2A3942] flex items-center justify-center text-white font-semibold">
            S
          </div>

          <div className="flex items-center gap-6 text-[#AEBAC1]">
            <Users className="w-5 h-5 cursor-pointer hover:text-white transition" />
            <Circle className="w-5 h-5 cursor-pointer hover:text-white transition" />
            <MessageSquare className="w-5 h-5 cursor-pointer hover:text-white transition md:hidden" />

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2"
              onClick={() => setSidebarOpen(true)}
            >
              <MoreVertical className="w-5 h-5 text-[#AEBAC1] hover:text-white transition" />
            </button>

            {/* Desktop Menu */}
            <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white transition hidden md:block" />
          </div>
        </div>

        {/* WhatsApp Search Bar */}
        {/* <div className="px-3 py-2 hidden md:block">
          <div className="flex items-center gap-3 bg-[#111B21] rounded-lg px-3 py-2">
            <Search className="w-5 h-5 text-[#8696A0]" />
            <input
              placeholder="Search or start new chat"
              className="w-full bg-transparent outline-none text-[14px] text-white placeholder:text-[#8696A0]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div> */}
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="w-72 h-full bg-[#111B21] border-r border-[#1F2C34] shadow-lg animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      )}
    </>
  );
}
