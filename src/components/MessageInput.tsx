"use client";
import { useState } from "react";
import { Paperclip, Smile, Send } from "lucide-react";

export default function MessageInput() {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    console.log("Message sent:", text);
    setText("");
  };

  return (
    <div className="p-3 border-t border-neutral-800 bg-[#1a1b1e] shadow-inner">
      <div className="flex items-center gap-3 bg-[#2b2d31] rounded-full px-4 py-2.5">
        {/* Left icons */}
        <button className="text-neutral-400 hover:text-blue-400 transition">
          <Paperclip className="w-5 h-5" />
        </button>
        <button className="text-neutral-400 hover:text-blue-400 transition">
          <Smile className="w-5 h-5" />
        </button>

        {/* Input field */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent outline-none text-sm text-white placeholder-neutral-400"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full p-2.5 transition transform hover:scale-110"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
