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
      setFormattedTime(
        new Date(time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  }, [time]);

  return (
    <div
      className={`flex mb-1.5 ${
        isOutbound ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-lg px-3.5 py-2.5 rounded-xl text-[15px] leading-relaxed
          whitespace-pre-wrap shadow-sm relative

          ${isOutbound ? "bg-[#005D4B] text-white" : "bg-[#1F2C34] text-white"}

          ${isOutbound ? "rounded-br-sm" : "rounded-bl-sm"}
        `}
      >
        {body}

        {/* Time */}
        <span className="text-[11px] text-[#D1D7DB] ml-2 float-right">
          {formattedTime}
        </span>
      </div>
    </div>
  );
}
