"use client";

import Image from "next/image";
import { MoreVertical, Search, ArrowLeft } from "lucide-react";

export default function ChatHeader({
  name = "+1 866 517 9619",
}: {
  name?: string;
}) {
  return (
    <div className="h-14 bg-[#202C33] border-b border-[#1F2C34] flex items-center justify-between px-4 shadow-[0_1px_0_#1F2C34]">

      {/* Mobile Back Button */}
      <button
        className="md:hidden mr-2 text-[#AEBAC1] hover:text-white transition"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Left Section: Avatar + Name */}
      <div className="flex items-center gap-3 cursor-pointer select-none">
        {/* Avatar Placeholder */}
        <div className="w-10 h-10 rounded-full bg-[#2A3942] flex items-center justify-center text-[#E9EDEF] text-sm font-semibold">
          {name.replace(/^\+/, "").charAt(0).toUpperCase()}
        </div>

        <div className="leading-tight">
          <span className="text-[15px] text-white font-medium">{name}</span>
          <div className="text-[12px] text-[#8696A0]">Powered by FDG.com</div>
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4 text-[#AEBAC1]">
        <Search className="w-5 h-5 cursor-pointer hover:text-white transition hidden md:block" />
        <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white transition" />
      </div>
    </div>
  );
}
