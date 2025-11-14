import ChatWindow from "@/components/ChatWindow";

export default function ChatPage({ params }: { params: { id: string } }) {
  return <ChatWindow contactId={params.id} />;
}
