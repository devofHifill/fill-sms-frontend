"use client";

import { useState } from "react";
import { sendMessage } from "@/lib/api";

export default function MessageInput({ phone, onSent }: { phone: string; onSent: (msg: any) => void }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!text.trim() || sending) return;

    setSending(true);

    try {
      const body = text.trim();

      await sendMessage(phone, body);

      // Immediately show message in UI
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
    <div className="p-3 bg-[#202C33] flex items-center gap-3">
      <input
        className="flex-1 bg-[#2A3942] text-white p-2 rounded-lg outline-none"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="text-white px-4 py-2 rounded-lg bg-[#005C4B] disabled:opacity-40"
        disabled={sending}
      >
        Send
      </button>
    </div>
  );
}
