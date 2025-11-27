"use client";

import * as React from "react";
import ChatWindow from "@/components/ChatWindow";
import { fetchMessagesByPhone, fetchContactByPhone } from "@/lib/api";
import type { Message } from "@/types/Message";

export default function ContactChatPage({
  params,
}: {
  params: Promise<{ phone: string }>;
}) {
  const { phone } = React.use(params);
  const decodedPhone = decodeURIComponent(phone);

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
