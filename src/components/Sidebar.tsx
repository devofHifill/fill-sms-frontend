"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchContacts } from "@/lib/api";

interface Contact {
  id: number;
  name: string | null;
  phone: string;
  last_message_at: string | null;
}

export default function Sidebar() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchContacts();
        console.log("Contacts from API:", data);
        setContacts(data);
      } catch (err) {
        console.error("Error loading contacts:", err);
      }
    }
    load();
  }, []);

  return (
    <div className="w-72 bg-[#111B21] border-r border-gray-800 overflow-y-auto">
      {contacts.map((c) => (
        <Link
          key={c.id}
          href={`/contacts/${encodeURIComponent(c.phone)}`}
          className="block px-4 py-3 hover:bg-[#202C33] border-b border-gray-800"
        >
          <div className="font-semibold text-white">
            {c.name ?? c.phone}
          </div>
          <div className="text-xs text-gray-400">
            {c.last_message_at
              ? new Date(c.last_message_at).toLocaleString()
              : ""}
          </div>
        </Link>
      ))}
    </div>
  );
}
