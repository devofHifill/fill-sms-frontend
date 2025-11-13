import ChatWindow from "@/components/ChatWindow";

export default function ChatPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-full">
      <ChatWindow contactId={params.id} />
    </div>
  );
}
