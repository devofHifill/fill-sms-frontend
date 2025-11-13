"use client";

import ChatHeader from "@/components/ChatHeader";
import MessageBubble from "@/components/MessageBubble";
import MessageInput from "@/components/MessageInput";

interface ChatWindowProps {
  contactId?: string;
}

export default function ChatWindow({ contactId }: ChatWindowProps) {
  const headerName = contactId ?? "+1 866 517 9619";

  const messages = [
    { id: 1, body: "Your GrabrFi phone verification code: 814257", time: "12/11/2025, 17:43:30", direction: "inbound" },
    { id: 2, body: "Thanks, received.", time: "12/11/2025, 17:44:00", direction: "outbound" },
    { id: 3, body: "Okay, have a good day!", time: "12/11/2025, 17:45:20", direction: "inbound" },
  ];

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#111B21]">
      <ChatHeader name={headerName} />

      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 space-y-4 bg-chat-pattern">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        <div className="shrink-0 p-4 bg-[#202C33] border-t border-[#233138] pb-[env(safe-area-inset-bottom)]  mt-[150px]">
          <MessageInput />
        </div>
      </div>


    </div>
  );
}
