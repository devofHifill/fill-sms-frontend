"use client";

import { useState, useEffect, useRef } from "react";
import ChatHeader from "@/components/ChatHeader";
import MessageBubble from "@/components/MessageBubble";
import MessageInput from "@/components/MessageInput";
import { fetchMessagesByPhone } from "@/lib/api";

export default function ChatWindow({ phone, messages: initialMessages }: any) {
  const [messages, setMessages] = useState<any[]>(initialMessages || []);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll instantly like WhatsApp
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  // Add sent message locally
  function handleSentMessage(msg: any) {
    setMessages((prev) => [...prev, msg]);
  }

  // Poll backend every 3 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await fetchMessagesByPhone(phone);

        if (data.length !== messages.length) {
          setMessages(data);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [phone, messages]);

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#111B21]">

      <ChatHeader name={phone} />

      {/* WhatsApp Background */}
      <div className="flex-1 bg-chat-pattern bg-chat-overlay overflow-hidden">
        <div className="relative z-10 h-full overflow-y-auto overscroll-contain touch-pan-y px-4 py-3 space-y-2">

          {messages.map((msg: any) => (
            <MessageBubble
              key={msg.id}
              body={msg.body}
              time={msg.created_at}
              direction={msg.direction}
            />
          ))}

          {/* Bottom Gap */}
          <div className="h-4"></div>
          <div ref={bottomRef} />
        </div>
      </div>

      <MessageInput phone={phone} onSent={handleSentMessage} />
    </div>
  );
}
