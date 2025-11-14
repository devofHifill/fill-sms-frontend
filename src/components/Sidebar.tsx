"use client";

import { Globe, ChevronDown, Plus, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  // Temporary static contacts (replace with API later)
  const contacts = [
    { id: 1, name: "+1 332 269 9625", message: "United States 🇺🇸", color: "bg-yellow-500" },
    { id: 2, name: "+49 173 6693961", message: "TEST", color: "bg-blue-500" },
    { id: 3, name: "+1 866 517 9619", message: "Your GrabrFi phone verification...", color: "bg-purple-500" },
    { id: 4, name: "+40 768 515 723", message: "INFO", color: "bg-green-500" },
  ];

  return (
    <div className="flex flex-col h-full w-80 md:w-[30vw] max-w-xs shrink-0 bg-[#1a1b1e] border-r border-neutral-800">

      {/* ---- Top Number Bar ---- */}
      <div className="flex items-center justify-between p-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-neutral-400" />

          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-[#E9EDEF]">+1 332 269 9625</span>

            <Link
              href="https://httpsms.com"
              target="_blank"
              className="text-xs text-blue-400 hover:underline transition"
            >
              httpsms.com
            </Link>
          </div>

          <ChevronDown className="w-4 h-4 text-neutral-500 ml-1" />
        </div>

        <button className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* ---- Contacts List ---- */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((c) => {
          const isActive = pathname.includes(encodeURIComponent(c.name));

          return (
            <Link
              key={c.id}
              href={`/contacts/${encodeURIComponent(c.name)}`}
              className={`flex items-center gap-3 px-4 py-3 border-b border-neutral-800 cursor-pointer hover:bg-[#222326] transition ${
                isActive ? "bg-[#2b2d31]" : ""
              }`}
            >
              {/* Avatar Circle */}
              <div
                className={`w-8 h-8 rounded-full ${c.color} flex items-center justify-center text-white font-semibold text-sm`}
              >
                {c.name.charAt(1)}
              </div>

              {/* Contact Info */}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate text-[#E9EDEF]">
                  {c.name}
                </div>
                <div className="text-xs text-[#8696A0] truncate">
                  {c.message}
                </div>
              </div>

              {/* Read checkmarks */}
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ---- Bottom User Avatar ---- */}
      <div className="p-4 border-t border-neutral-800 flex items-center justify-center">
        <UserCircle className="w-10 h-10 text-neutral-400 hover:text-blue-400 cursor-pointer transition" />
      </div>
    </div>
  );
}
