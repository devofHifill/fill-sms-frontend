"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchContacts } from "@/lib/api";
import ContactItem from "./ContactItem";

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

  // --------------------------------------------
  // Auto-refresh every 2 sec (WhatsApp-style)
  // --------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchContacts();

        // Sort by latest message
        const sorted = data.sort(
          (a: any, b: any) =>
            new Date(b.lastMessageAt).getTime() -
            new Date(a.lastMessageAt).getTime()
        );

        setContacts(sorted);
      } catch (err) {
        console.error("Error loading contacts:", err);
      }
    }

    // First load
    load();

    // Polling
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
              unreadCount={c.unreadCount} // <-- NEW: unread badge
            />
          </Link>
        );
      })}
    </div>
  );
}
