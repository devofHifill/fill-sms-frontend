"use client";

import { useState, useEffect, useRef } from "react";
import ChatHeader from "@/components/ChatHeader";
import MessageBubble from "@/components/MessageBubble";
import MessageInput from "@/components/MessageInput";

export default function ChatWindow({ phone, messages: initialMessages }: any) {
  const [messages, setMessages] = useState(initialMessages || []);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  function handleSentMessage(msg: any) {
    setMessages((prev: any[]) => [...prev, msg]);
  }


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
