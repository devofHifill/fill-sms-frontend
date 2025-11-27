"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchContacts } from "@/lib/api";
import ContactItem from "./ContactItem"; // from your file

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
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();

  function getTime(value: string | null): number {
    return value ? new Date(value).getTime() : 0;
  }

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchContacts();

        const sorted = [...data].sort(
          (a: Contact, b: Contact) =>
            getTime(b.lastMessageAt) - getTime(a.lastMessageAt)
        );

        setContacts(sorted);
      } catch (err) {
        console.error("Error loading contacts:", err);
      }
    }

    load();
    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredContacts = contacts.filter((c) => {
    const term = searchTerm.toLowerCase();

    return (
      c.name?.toLowerCase().includes(term) ||
      c.phone.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col w-full md:w-72 bg-[#111B21] border-r border-[#1F2C34] overflow-y-auto">
      {/* Search bar */}
      <div className="p-3 bg-[#111B21] sticky top-0 z-10">
        <input
          type="text"
          placeholder="Search name or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full px-3 py-2 rounded-lg 
            bg-[#222E35] text-white 
            placeholder:text-gray-400 
            focus:outline-none focus:ring-1 focus:ring-[#00A884]
          "
        />
      </div>

      {/* Contact list */}
      {filteredContacts.map((c) => {
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
