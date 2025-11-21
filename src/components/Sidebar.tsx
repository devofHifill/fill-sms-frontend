"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchContacts } from "@/lib/api";
import ContactItem from "./ContactItem";   // ✅ FIX


interface Contact {
  id: number;
  name: string | null;
  phone: string;
  lastMessageAt: string | null;
  lastMessageBody?: string | null;
  unreadCount: number;
}

export default function Sidebar() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const pathname = usePathname();

  // Helper: safe timestamp for sorting
  function getTime(value: string | null): number {
    return value ? new Date(value).getTime() : 0;
  }

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchContacts();

        // Clone + sort safely by lastMessageAt
        const sorted = [...data].sort(
          (a: Contact, b: Contact) =>
            getTime(b.lastMessageAt) - getTime(a.lastMessageAt)
        );

        setContacts(sorted);
      } catch (err) {
        console.error("Error loading contacts:", err);
      }
    }

    // First load
    load();

    // Polling every 2s
    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden md:block w-72 bg-[#111B21] border-r border-[#1F2C34] overflow-y-auto">
      {contacts.map((c) => {
        const encodedPhone = encodeURIComponent(c.phone);
        const isActive = pathname?.includes(encodedPhone) ?? false;

        return (
          <Link key={c.id} href={`/contacts/${encodedPhone}`} className="block">
            <ContactItem
              name={c.name}
              phone={c.phone}
              lastMessageAt={c.lastMessageAt}
              lastMessageBody={c.lastMessageBody ?? null}
              isActive={isActive}
              unreadCount={c.unreadCount}
            />
          </Link>
        );
      })}
    </div>
  );
}
