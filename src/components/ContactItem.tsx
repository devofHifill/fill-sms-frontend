export default function ContactItem({
  contact,
}: {
  contact: { name: string; message: string; active?: boolean };
}) {
  return (
    <div
      className={`p-3 border-b border-neutral-800 cursor-pointer hover:bg-[#222326] transition ${
        contact.active ? "bg-[#2b2d31]" : ""
      }`}
    >
      <div className="font-medium text-sm">{contact.name}</div>
      <div className="text-xs text-neutral-400 truncate">{contact.message}</div>
    </div>
  );
}
