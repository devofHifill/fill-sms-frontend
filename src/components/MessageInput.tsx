"use client";

import { useState } from "react";
import { sendMessage } from "@/lib/api";
import { Smile, Paperclip, Mic } from "lucide-react";

export default function MessageInput({
  phone,
  onSent,
}: {
  phone: string;
  onSent: (msg: any) => void;
}) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!text.trim() || sending) return;

    setSending(true);

    try {
      const body = text.trim();
      await sendMessage(phone, body);

      onSent({
        id: Date.now(),
        body,
        direction: "outbound",
        created_at: new Date().toISOString(),
      });

      setText("");
    } catch (error) {
      console.error("Send failed", error);
    }

    setSending(false);
  }

  return (
    <div className="p-2 md:p-3 bg-[#202C33] flex items-center gap-3 border-t border-[#1F2C34]">

      {/* Emoji + Attach */}
      <div className="flex items-center gap-3 text-[#AEBAC1]">
        <Smile className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-white transition" />
        <Paperclip className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-white transition rotate-45" />
      </div>

      {/* Input */}
      <input
        type="text"
        className="flex-1 bg-[#2A3942] text-white px-4 py-2 rounded-full outline-none text-[15px]
                placeholder:text-[#8696A0]"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      {/* Mic or Send */}
      {text.trim().length === 0 ? (
        <Mic className="w-5 h-5 md:w-6 md:h-6 text-white cursor-pointer" />
      ) : (
        <button
          onClick={handleSend}
          disabled={sending}
          className="px-4 py-2 rounded-full bg-[#005D4B] text-white text-sm disabled:opacity-40"
        >
          Send
        </button>
      )}
    </div>
  );
}
