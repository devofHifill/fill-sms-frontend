"use client";

import { useEffect, useState } from "react";

export default function MessageBubble({ message }: any) {
  const isOutbound = message.direction === "outbound";

  const [time, setTime] = useState("");

  // Only run date formatting on the client
  useEffect(() => {
    const date = new Date(message.time);
    if (!isNaN(date.getTime())) {
      const formatted = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formatted);
    }
  }, [message.time]);

  return (
    <div className={`flex w-full ${isOutbound ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          relative max-w-[60%] px-3 py-2 rounded-lg text-sm leading-snug shadow 
          ${isOutbound
            ? "bg-[#005C4B] text-[#E9EDEF] rounded-br-none"
            : "bg-[#202C33] text-[#E9EDEF] rounded-bl-none"
          }
        `}
      >
        {/* Message Text */}
        <p className="whitespace-pre-wrap">{message.body}</p>

        {/* Time (hydration-safe) */}
        <span
          className={`block mt-1 text-[11px] ${
            isOutbound ? "text-[#BEE3D2] text-right" : "text-[#8696A0]"
          }`}
        >
          {time || ""}
        </span>

        {/* WhatsApp Tail */}
        <div
          className={`absolute bottom-0 ${
            isOutbound
              ? "right-[-4px] border-l-[7px] border-l-[#005C4B] border-t-[7px] border-t-transparent"
              : "left-[-4px] border-r-[7px] border-r-[#202C33] border-t-[7px] border-t-transparent"
          }`}
        />
      </div>
    </div>
  );
}
