"use client";

import * as React from "react";
import ChatWindow from "@/components/ChatWindow";
import { fetchMessagesByPhone } from "@/lib/api";

export default function ContactChatPage({
  params,
}: {
  params: Promise<{ phone: string }>;
}) {
  // Next.js 16 gives params as a Promise inside client components
  const { phone } = React.use(params);
  const decodedPhone = decodeURIComponent(phone);

  const [messages, setMessages] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function load() {
      try {
        const data = await fetchMessagesByPhone(decodedPhone);
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading messages:", err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [decodedPhone]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-[#8696A0]">
        Loading messages…
      </div>
    );
  }

  return <ChatWindow phone={decodedPhone} messages={messages} />;
}
