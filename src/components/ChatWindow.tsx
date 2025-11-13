"use client";

import ChatHeader from "@/components/ChatHeader";
import MessageBubble from "@/components/MessageBubble";
import MessageInput from "@/components/MessageInput";

interface ChatWindowProps {
  contactId?: string; // 👈 now OPTIONAL
}

export default function ChatWindow({ contactId }: ChatWindowProps) {
  // If no contactId is passed (like on homepage), use a default label
  const headerName = contactId ?? "+1 866 517 9619"; // or "Select a contact"

  // Temporary static messages for UI preview
  const messages = [
    {
      id: 1,
      body: "Your GrabrFi phone verification code: 814257",
      time: "12/11/2025, 17:43:30",
      direction: "inbound",
    },
    {
      id: 2,
      body: "Thanks, received.",
      time: "12/11/2025, 17:44:00",
      direction: "outbound",
    },
    {
      id: 3,
      body: "Okay, have a good day!",
      time: "12/11/2025, 17:45:20",
      direction: "inbound",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1e1f22]">
      {/* --- Chat Header --- */}
      <ChatHeader name={headerName} />

      {/* --- Messages Area --- */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </div>

      {/* --- Input Bar --- */}
      <MessageInput />
    </div>
  );
}
