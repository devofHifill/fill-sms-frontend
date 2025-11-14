const BASE_URL = "https://sms.filldesigngroup.cloud";

export async function fetchContacts() {
  const res = await fetch(`${BASE_URL}/contacts`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return res.json();
}


export async function fetchMessagesByPhone(phone: string) {
  const res = await fetch(`${BASE_URL}/messages/${phone}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch messages");
  return res.json();
}

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
