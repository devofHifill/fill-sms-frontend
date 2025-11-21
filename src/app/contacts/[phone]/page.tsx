"use client";

import * as React from "react";
import ChatWindow from "@/components/ChatWindow";
import { fetchMessagesByPhone, fetchContactByPhone } from "@/lib/api";

export default function ContactChatPage({ params }: { params: Promise<{ phone: string }> }) {
  // ⬅️ 1) UNWRAP PARAMS ASYNC — required for Next.js client components
  const { phone } = React.use(params);

  // ⬅️ 2) Decode phone number
  const decodedPhone = decodeURIComponent(phone);

  // ⬅️ 3) Correct Types
  interface Message {
    id: number;
    body: string;
    direction: "inbound" | "outbound";
    created_at: string;
    is_read?: number;
    status?: string;
  }

  interface ContactData {
    id: number;
    phone: string;
    name: string | null;
    lastMessageAt?: string | null;
    lastMessageBody?: string | null;
    unreadCount?: number;
  }

  const [messages, setMessages] = React.useState<Message[]>([]);
  const [contact, setContact] = React.useState<ContactData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function load() {
      try {
        const msgs = await fetchMessagesByPhone(decodedPhone);
        setMessages(Array.isArray(msgs) ? msgs : []);

        const contactData = await fetchContactByPhone(decodedPhone);
        setContact(contactData);
      } catch (err) {
        console.error("Error loading:", err);
        setMessages([]);
        setContact(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [decodedPhone]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-[#8696A0]">
        Loading chat…
      </div>
    );
  }

  return (
    <ChatWindow
      phone={decodedPhone}
      contactName={contact?.name || decodedPhone}
      messages={messages}
    />
  );
}
