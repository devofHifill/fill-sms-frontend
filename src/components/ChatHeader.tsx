"use client";

import { MoreVertical, Search, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatHeader({
  name,
  phone = "+1 866 517 9619",
  typing = false,
  online = false,
  lastSeenText = "",
  onOpenInfo,
}: {
  name?: string | null;
  phone?: string;
  typing?: boolean;
  online?: boolean;
  lastSeenText?: string;
  onOpenInfo?: () => void;
}) {
  const router = useRouter();

  // ✅ Prefer name, fallback to phone
  const displayName =
    name && name.trim() !== "" ? name : phone || "+1 866 517 9619";

  // Avatar letter based on display name
  const avatarText = displayName
    .replace(/^\+/, "")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="h-14 bg-[#202C33] border-b border-[#1F2C34] flex items-center justify-between px-4 shadow-[0_1px_0_#1F2C34]">
      {/* LEFT: Back (mobile) + avatar + name */}
      <div className="flex items-center gap-3">
        {/* 🔙 Back button — mobile only */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="md:hidden text-[#AEBAC1] hover:text-white transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Avatar (clickable to open contact info on desktop, if provided) */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onOpenInfo && onOpenInfo()}
        >
          <div className="w-10 h-10 rounded-full bg-[#2A3942] flex items-center justify-center text-[#E9EDEF] text-sm font-semibold">
            {avatarText}
          </div>

          <div className="leading-tight">
            <span className="text-[15px] text-white font-medium">
              {displayName}
            </span>

            {/* Typing / Online / Last Seen */}
            <div className="text-[12px]">
              {typing ? (
                <span className="text-[#53BDEB] animate-pulse">typing…</span>
              ) : online ? (
                <span className="text-[#53BDEB]">online</span>
              ) : lastSeenText ? (
                <span className="text-[#8696A0]">{lastSeenText}</span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: icons */}
      <div className="flex items-center gap-4 text-[#AEBAC1]">
        {/* Search only on desktop like WhatsApp */}
        <Search className="w-5 h-5 cursor-pointer hover:text-white transition hidden md:block" />
        <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white transition" />
      </div>
    </div>
  );
}
