"use client";

import { useMemo } from "react";

interface ContactItemProps {
  name: string | null;
  phone: string;
  lastMessageAt: string | null;
  lastMessageBody?: string | null;
  isActive?: boolean;
}

export default function ContactItem({
  name,
  phone,
  lastMessageAt,
  lastMessageBody,
  isActive = false,
}: ContactItemProps) {
  
  const displayName = name || phone;

  const initial = useMemo(() => {
    const cleaned = displayName.replace(/^\+/, "").trim();
    return cleaned.charAt(0).toUpperCase() || "?";
  }, [displayName]);

  const formattedTime = useMemo(() => {
    if (!lastMessageAt) return "";
    const d = new Date(lastMessageAt);

    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [lastMessageAt]);

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 cursor-pointer
        transition-colors select-none

        ${isActive ? "bg-[#2A3942]" : "hover:bg-[#202C33]"}
      `}
    >

      {/* Avatar */}
      <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#2A3942] flex items-center justify-center">
        <span className="text-sm font-semibold text-[#E9EDEF]">
          {initial}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 border-b border-[#1F2C34] pb-2">
        
        {/* Top: Name + Time */}
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[15px] text-[#E9EDEF] truncate font-medium">
            {displayName}
          </span>

          {formattedTime && (
            <span className="text-[12px] text-[#8696A0] whitespace-nowrap ml-2">
              {formattedTime}
            </span>
          )}
        </div>

        {/* Bottom: Last message preview */}
        <p className="text-[13px] text-[#667781] truncate">
          {lastMessageBody || "No messages yet"}
        </p>
      </div>

    </div>
  );
}
