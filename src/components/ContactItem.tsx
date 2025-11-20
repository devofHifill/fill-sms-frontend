"use client";

import { useMemo } from "react";

interface ContactItemProps {
  name: string | null;
  phone: string;
  lastMessageAt: string | null;
  lastMessageBody?: string | null;
  isActive?: boolean;
  unreadCount?: number; // NEW
}

export default function ContactItem({
  name,
  phone,
  lastMessageAt,
  lastMessageBody,
  isActive = false,
  unreadCount = 0, // NEW
}: ContactItemProps) {
  const displayName = name || phone;

  // Generate initial
  const initial = useMemo(() => {
    const cleaned = displayName.replace(/^\+/, "").trim();
    return cleaned.charAt(0).toUpperCase() || "?";
  }, [displayName]);

  // Dynamic avatar color
  function getColorFromString(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 65%, 45%)`;
  }

  // Time formatting
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
      <div
        className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm"
        style={{ backgroundColor: getColorFromString(displayName) }}
      >
        {initial}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 border-b border-[#1F2C34] pb-2">

        {/* Top: Name + Time */}
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[15px] text-[#E9EDEF] truncate font-semibold">
            {displayName}
          </span>

          <div className="flex flex-col items-end gap-1">
            {formattedTime && (
              <span className="text-[12px] text-[#8696A0] whitespace-nowrap ml-2">
                {formattedTime}
              </span>
            )}

            {/* Green unread badge */}
            {unreadCount > 0 && (
              <span className="min-w-[18px] h-[18px] bg-green-500 text-black text-[11px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {/* Bottom: Last message preview */}
        <p className="text-[13px] text-[#667781] truncate">
          {lastMessageBody || "No messages yet"}
        </p>
      </div>
    </div>
  );
}
