"use client";

import { Paperclip, Smile, Send } from "lucide-react";
import { useState } from "react";

export default function MessageInput() {
  const [text, setText] = useState("");

  return (
    <div className="flex items-center gap-3 bg-[#2A3942] rounded-xl px-4 py-2 shadow">
      <button className="text-[#8696A0] hover:text-white transition">
        <Smile className="w-6 h-6" />
      </button>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 bg-transparent text-[#E9EDEF] placeholder-[#8696A0] outline-none focus:ring-1 focus:ring-[#005C4B]"
        placeholder="Type a message"
      />

      <button className="text-[#8696A0] hover:text-white transition">
        <Paperclip className="w-5 h-5" />
      </button>

      <button className="bg-[#005C4B] hover:bg-[#046C52] text-white p-2 rounded-full transition">
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
