"use client";

import { useState, useEffect, useRef } from "react";
import ChatHeader from "@/components/ChatHeader";
import MessageBubble from "@/components/MessageBubble";
import MessageInput from "@/components/MessageInput";
import ContactInfoSidebar from "@/components/ContactInfoSidebar";
import { fetchMessagesByPhone, markMessagesRead } from "@/lib/api";

// -----------------------------
// Types
// -----------------------------
interface Message {
  id: number;
  body: string;
  direction: "inbound" | "outbound";
  created_at: string;
  is_read?: number;
  status?: "sent" | "delivered" | "read";
}

interface ChatWindowProps {
  phone: string;
  contactName: string | null;
  messages: Message[];
}

// -----------------------------
// Component
// -----------------------------
export default function ChatWindow({
  phone,
  contactName,
  messages: initialMessages,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [typing, setTyping] = useState(false);
  const [online, setOnline] = useState(false);
  const [lastSeenText, setLastSeenText] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // -----------------------------
  // Mark messages as READ
  // -----------------------------
  useEffect(() => {
    if (!phone) return;

    markMessagesRead(phone).catch((err) =>
      console.error("❌ Failed to mark messages as read:", err)
    );
  }, [phone]);

  // -----------------------------
  // Auto-scroll to bottom
  // -----------------------------
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  // -----------------------------
  // Format Last Seen
  // -----------------------------
  function formatLastSeen(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const oneDay = 86400000;

    if (diff < oneDay && date.getDate() === now.getDate()) {
      return `last seen today at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "last seen yesterday";
    }

    if (diff < 7 * oneDay) {
      return `last seen ${date.toLocaleDateString([], { weekday: "long" })}`;
    }

    return `last seen ${date.toLocaleDateString([], {
      month: "long",
      day: "numeric",
    })}`;
  }

  // -----------------------------
  // Add outbound message
  // -----------------------------
  function handleSentMessage(msg: Message) {
    setMessages((prev) => [...prev, msg]);
  }

  // -----------------------------
  // Polling (fixed)
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data: Message[] = await fetchMessagesByPhone(phone);

        const lastLocal = messages[messages.length - 1];
        const lastRemote = data[data.length - 1];

        // Typing simulation
        if (
          lastRemote &&
          (!lastLocal || lastRemote.id !== lastLocal.id) &&
          lastRemote.direction === "inbound"
        ) {
          setTyping(true);
          setTimeout(() => setTyping(false), 1500);
        }

        // Online / last seen
        if (lastRemote && lastRemote.direction === "inbound") {
          const lastTime = new Date(lastRemote.created_at);
          const diffSec =
            (new Date().getTime() - lastTime.getTime()) / 1000;

          if (diffSec < 20) {
            setOnline(true);
          } else {
            setOnline(false);
            setLastSeenText(formatLastSeen(lastTime));
          }
        }

        // Outbound status
        const updatedMessages = data.map((msg) =>
          msg.direction === "outbound"
            ? { ...msg, status: msg.status || "delivered" }
            : msg
        );

        setMessages(updatedMessages);
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [phone]); // FIX: removed messages dependency

  // -----------------------------
  // Render UI
  // -----------------------------
  return (
    <div className="flex flex-col h-full min-h-0 bg-[#111B21]">
      {/* HEADER */}
      <ChatHeader
        name={contactName || phone}
        typing={typing}
        online={online}
        lastSeenText={lastSeenText}
        onOpenInfo={() => setInfoOpen(true)}
      />

      {/* MESSAGES */}
      <div className="flex-1 bg-chat-pattern bg-chat-overlay overflow-hidden">
        <div className="relative z-10 h-full overflow-y-auto px-4 py-3 space-y-2">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              body={msg.body}
              time={msg.created_at}
              direction={msg.direction}
              status={msg.status}
            />
          ))}

          <div className="h-4" />
          <div ref={bottomRef} />
        </div>
      </div>

      {/* INPUT */}
      <MessageInput phone={phone} onSent={handleSentMessage} />

      {/* INFO SIDEBAR */}
      {infoOpen && (
        <ContactInfoSidebar phone={phone} onClose={() => setInfoOpen(false)} />
      )}
    </div>
  );
}
