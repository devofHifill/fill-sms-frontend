import ChatWindow from "@/components/ChatWindow";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#1e1f22] text-white">
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  );
}
