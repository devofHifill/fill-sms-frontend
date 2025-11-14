"use client";

import { useState, useEffect } from "react";

export default function MessageBubble({
  body,
  direction,
  time,
}: {
  body: string;
  direction: "inbound" | "outbound";
  time: string;
}) {
  const isOutbound = direction === "outbound";

  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    if (time) {
      setFormattedTime(new Date(time).toLocaleTimeString());
    }
  }, [time]);

  return (
    <div
      className={`flex ${
        isOutbound ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
          isOutbound
            ? "bg-[#005C4B] text-white"
            : "bg-[#202C33] text-white"
        }`}
      >
        {body}
        <div className="text-[10px] text-gray-300 mt-1 text-right">
          {formattedTime}
        </div>
      </div>
    </div>
  );
}
