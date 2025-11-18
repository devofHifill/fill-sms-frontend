"use client";

import { useState, useEffect, useRef } from "react";
import ChatHeader from "@/components/ChatHeader";
import MessageBubble from "@/components/MessageBubble";
import MessageInput from "@/components/MessageInput";
import { fetchMessagesByPhone } from "@/lib/api";

export default function ChatWindow({ phone, messages: initialMessages }: any) {
  const [messages, setMessages] = useState<any[]>(initialMessages || []);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle outbound messages instantly
  function handleSentMessage(msg: any) {
    setMessages((prev: any[]) => [...prev, msg]);
  }

  // Poll backend every 3 seconds for new inbound messages
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await fetchMessagesByPhone(phone);

        // Avoid duplicates by checking last message id
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

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg: any) => (
          <MessageBubble
            key={msg.id}
            body={msg.body}
            time={msg.created_at}
            direction={msg.direction}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <MessageInput phone={phone} onSent={handleSentMessage} />
    </div>
  );
}
