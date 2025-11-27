"use client";

import { Check, CheckCheck } from "lucide-react";

export default function MessageBubble({
  body,
  direction,
  time,
  status,
}: {
  body: string;
  direction: "inbound" | "outbound";
  time: string;
  status?: string;   // ✅ FIXED
}) {
  const isOutbound = direction === "outbound";

  // Compute formatted time WITHOUT useEffect
  const formattedTime = time
    ? new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  // Final message status
  const resolvedStatus =
    status ||
    (isOutbound && time ? "delivered" : undefined) ||
    "sent";

  function renderStatus() {
    if (!isOutbound) return null;

    if (resolvedStatus === "sent")
      return <Check className="w-4 h-4 text-[#AEBAC1] ml-1" />;

    if (resolvedStatus === "delivered")
      return <CheckCheck className="w-4 h-4 text-[#AEBAC1] ml-1" />;

    if (resolvedStatus === "read")
      return <CheckCheck className="w-4 h-4 text-[#53BDEB] ml-1" />;

    return null;
  }

  return (
    <div className={`flex mb-1.5 ${isOutbound ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-lg px-3.5 py-2.5 rounded-xl text-[15px] leading-relaxed
          whitespace-pre-wrap shadow-sm relative
          ${isOutbound ? "bg-[#005D4B] text-white" : "bg-[#1F2C34] text-white"}
          ${isOutbound ? "rounded-br-sm" : "rounded-bl-sm"}
        `}
      >
        {body}

        <div className="flex items-center justify-end gap-1 mt-1 text-right">
          <span className="text-[11px] text-[#D1D7DB]">{formattedTime}</span>
          {renderStatus()}
        </div>
      </div>
    </div>
  );
}
