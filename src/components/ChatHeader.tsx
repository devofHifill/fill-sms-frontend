"use client";
import Image from "next/image";
import Link from "next/link";
import { MoreVertical } from "lucide-react";

export default function ChatHeader({
  name = "+1 866 517 9619",
}: {
  name?: string;
}) {
  return (
    <div className="h-14 shrink-0 bg-[#202C33] border-b border-[#233138] flex items-center justify-between px-4">
      {/* --- Left: contact info --- */}
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-white">{name}</span>
        <Link
          href="https://fdg.com"
          target="_blank"
          className="text-xs text-blue-400 hover:underline"
        >
          Powered by FDG.com
        </Link>
      </div>

      {/* --- Right: icons --- */}
      <div className="flex items-center gap-3">
        {/* Google Play icon */}
        <Link
          href="https://play.google.com/"
          target="_blank"
          className="hover:opacity-80 transition hidden sm:block"
        >
          <Image
            src="/google-play-badge.png"
            alt="Get it on Google Play"
            width={100}
            height={32}
            priority
          />
        </Link>

        {/* Three-dot menu */}
        <button className="p-2 rounded-full hover:bg-[#2b2d31] transition">
          <MoreVertical className="w-5 h-5 text-neutral-400" />
        </button>
      </div>
    </div>
  );
}
