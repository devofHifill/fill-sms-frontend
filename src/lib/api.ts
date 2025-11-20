const BASE_URL = "https://sms.filldesigngroup.cloud";

// ------------------------------------
// Contact Type
// ------------------------------------
export interface Contact {
  id: number;
  name: string | null;
  phone: string;
  lastMessageBody: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}

// ------------------------------------
// Fetch Contacts (now includes unreadCount)
// ------------------------------------
export async function fetchContacts(): Promise<Contact[]> {
  const res = await fetch(`${BASE_URL}/contacts`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch contacts");

  return res.json();
}

// ------------------------------------
// Fetch Messages for a specific phone
// ------------------------------------
export async function fetchMessagesByPhone(phone: string) {
  const res = await fetch(`${BASE_URL}/messages/${phone}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch messages");

  return res.json();
}

// ------------------------------------
// Send Message
// ------------------------------------
export async function sendMessage(to: string, body: string) {
  const res = await fetch(`${BASE_URL}/send-sms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to, body }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}

// ------------------------------------
// Mark Messages as Read (NEW)
// ------------------------------------
export async function markMessagesRead(phone: string) {
  const res = await fetch(`${BASE_URL}/contacts/${phone}/read`, {
    method: "POST",
  });

  if (!res.ok) {
    console.error("Error marking messages as read");
  }

  return res.json();
}
