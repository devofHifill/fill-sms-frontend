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
  last_message_at: string | null;
  last_message_body?: string | null;
}

export default function Sidebar() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchContacts();

        // Sort by latest message
        const sorted = data.sort(
          (a: any, b: any) =>
            new Date(b.last_message_at).getTime() -
            new Date(a.last_message_at).getTime()
        );

        setContacts(sorted);
      } catch (err) {
        console.error("Error loading contacts:", err);
      }
    }
    load();
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
              lastMessageAt={c.last_message_at}
              lastMessageBody={c.last_message_body ?? null}
              isActive={isActive}
            />
          </Link>
        );
      })}
    </div>
  );
}
