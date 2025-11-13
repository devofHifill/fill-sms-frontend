"use client";

export default function MessageBubble({
  message,
}: {
  message: { body: string; time: string; direction: string };
}) {
  const isOutbound = message.direction === "outbound";

  return (
    <div
      className={`flex w-full ${
        isOutbound ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-[70%] px-4 py-2 rounded-2xl text-sm leading-snug shadow-sm transition
          ${
            isOutbound
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-[#2b2d31] text-neutral-100 rounded-bl-none"
          }`}
      >
        {/* Message text */}
        <p className="whitespace-pre-wrap break-words">{message.body}</p>

        {/* Timestamp */}
        <span
          className={`block mt-1 text-[10px] ${
            isOutbound ? "text-blue-200 text-right" : "text-neutral-400"
          }`}
        >
          {new Date(message.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>

        {/* Subtle tail for realism */}
        <div
          className={`absolute bottom-0 ${
            isOutbound
              ? "right-0 translate-x-[4px] border-l-[8px] border-l-blue-600 border-t-[8px] border-t-transparent"
              : "left-0 -translate-x-[4px] border-r-[8px] border-r-[#2b2d31] border-t-[8px] border-t-transparent"
          }`}
        ></div>
      </div>
    </div>
  );
}
