"use client";

import { X } from "lucide-react";

export default function ContactInfoSidebar({
  phone,
  onClose,
}: {
  phone: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-[#111B21] border-l border-[#1F2C34] z-50 animate-slideIn shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 bg-[#202C33] border-b border-[#1F2C34]">
        <h2 className="text-[16px] font-medium text-white">Contact Info</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-[#AEBAC1] hover:text-white transition" />
        </button>
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center py-6 border-b border-[#1F2C34]">
        <div className="w-28 h-28 rounded-full bg-[#2A3942] flex items-center justify-center text-white text-4xl font-semibold">
          {phone.replace(/^\+/, "").charAt(0).toUpperCase()}
        </div>

        <div className="text-[18px] text-white mt-4">{phone}</div>
        <div className="text-[13px] text-[#8696A0] mt-1">FDG Contact</div>
      </div>

      {/* Options List */}
      <div className="mt-4 px-4 space-y-3">

        <button className="w-full text-left bg-[#202C33] px-4 py-3 rounded-lg text-white hover:bg-[#2A3942] transition">
          Media, links & docs
        </button>

        <button className="w-full text-left bg-[#202C33] px-4 py-3 rounded-lg text-white hover:bg-[#2A3942] transition">
          Starred messages
        </button>

        <button className="w-full text-left bg-[#202C33] px-4 py-3 rounded-lg text-white hover:bg-[#2A3942] transition">
          Block Contact
        </button>

        <button className="w-full text-left bg-[#202C33] px-4 py-3 rounded-lg text-red-400 hover:bg-[#2A3942] transition">
          Clear Chat
        </button>

        <button className="w-full text-left bg-[#202C33] px-4 py-3 rounded-lg text-red-500 hover:bg-[#2A3942] transition">
          Delete Chat
        </button>

      </div>
    </div>
  );
}
