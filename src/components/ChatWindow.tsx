"use client";

import { useState, useEffect, useRef } from "react";
import ChatHeader from "@/components/ChatHeader";
import MessageBubble from "@/components/MessageBubble";
import MessageInput from "@/components/MessageInput";
import ContactInfoSidebar from "@/components/ContactInfoSidebar";
import { fetchMessagesByPhone, markMessagesRead } from "@/lib/api";
import type { Message } from "@/types/Message";

interface ChatWindowProps {
  phone: string;
  contactName: string | null;
  messages: Message[];
}

export default function ChatWindow({
  phone,
  contactName,
  messages: initialMessages,
}: ChatWindowProps) {
  console.log("Incoming Name:", contactName);

  const [messages, setMessages] = useState<Message[]>(initialMessages || []);
  const [typing, setTyping] = useState(false);
  const [online, setOnline] = useState(false);
  const [lastSeenText, setLastSeenText] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);

  const [displayName, setDisplayName] = useState<string>(contactName || "");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayName(contactName || "");
  }, [contactName]);

  useEffect(() => {
    if (!phone) return;

    markMessagesRead(phone).catch((err) =>
      console.error("❌ Failed to mark messages as read:", err)
    );
  }, [phone]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

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

  function handleSentMessage(msg: Message) {
    setMessages((prev) => [...prev, msg]);
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data: Message[] = await fetchMessagesByPhone(phone);

        const lastLocal = messages[messages.length - 1];
        const lastRemote = data[data.length - 1];

        if (
          lastRemote &&
          (!lastLocal || lastRemote.id !== lastLocal.id) &&
          lastRemote.direction === "inbound"
        ) {
          setTyping(true);
          setTimeout(() => setTyping(false), 1500);
        }

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
  }, [phone]);

  const headerName = displayName || phone;

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#111B21]">
      <ChatHeader
        name={headerName}
        typing={typing}
        online={online}
        lastSeenText={lastSeenText}
        onOpenInfo={() => setInfoOpen(true)}
      />

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

      <MessageInput phone={phone} onSent={handleSentMessage} />

      {infoOpen && (
        <ContactInfoSidebar
          phone={phone}
          name={displayName}
          onClose={() => setInfoOpen(false)}
          onNameUpdated={(newName) => setDisplayName(newName || "")}
        />
      )}
    </div>
  );
}
