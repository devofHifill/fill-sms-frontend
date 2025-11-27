const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL_URL || "https://sms.filldesigngroup.cloud";

// -----------------------------
// Contacts
// -----------------------------
export async function fetchContacts() {
  const res = await fetch(`${BASE_URL}/contacts`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
}

export async function fetchContactByPhone(phone: string) {
  const res = await fetch(
    `${BASE_URL}/contacts/${encodeURIComponent(phone)}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch contact");
  return res.json();
}

export async function updateContactName(
  phone: string,
  name: string | null
): Promise<{ success: boolean; name: string | null }> {
  const res = await fetch(
    `${BASE_URL}/contacts/${encodeURIComponent(phone)}/update`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update contact name");
  }

  return res.json();
}

// Mark inbound messages as read
export async function markMessagesRead(phone: string) {
  const res = await fetch(
    `${BASE_URL}/contacts/${encodeURIComponent(phone)}/read`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) throw new Error("Failed to mark messages read");
  return res.json();
}

// -----------------------------
// Messages
// -----------------------------
export async function fetchMessagesByPhone(phone: string) {
  const res = await fetch(
    `${BASE_URL}/messages/${encodeURIComponent(phone)}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

// Send message (used by MessageInput)
export async function sendMessage(
  phone: string,
  body: string,
  name?: string
) {
  const res = await fetch(`${BASE_URL}/send-sms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to: phone, body, name }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Send SMS failed:", text);
    throw new Error("Failed to send SMS");
  }

  return res.json();
}
