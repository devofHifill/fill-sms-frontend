"use client";

import { useEffect, useState } from "react";
import { X, Pencil } from "lucide-react";
import { updateContactName } from "@/lib/api";

export default function ContactInfoSidebar({
  phone,
  name: initialName,
  onClose,
  onNameUpdated,
}: {
  phone: string;
  name: string | null;
  onClose: () => void;
  onNameUpdated?: (newName: string | null) => void;
}) {
  const [displayName, setDisplayName] = useState(initialName || "");
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState(initialName || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync when parent name changes (e.g. navigation)
  useEffect(() => {
    setDisplayName(initialName || "");
    if (!editing) {
      setNameInput(initialName || "");
    }
  }, [initialName, editing]);

  async function handleSave() {
    if (saving) return;
    setSaving(true);
    setError(null);

    const trimmed = nameInput.trim();
    const newName = trimmed === "" ? null : trimmed;

    try {
      await updateContactName(phone, newName);
      setDisplayName(newName || "");
      setEditing(false);
      onNameUpdated?.(newName);
    } catch (err) {
      console.error("Failed to update contact name", err);
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setEditing(false);
    setNameInput(displayName || "");
    setError(null);
  }

  const avatarLetter = (displayName || phone).replace(/^\+/, "").charAt(0).toUpperCase();

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-[#111B21] border-l border-[#1F2C34] z-50 animate-slideIn shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 bg-[#202C33] border-b border-[#1F2C34]">
        <h2 className="text-[16px] font-medium text-white">Contact Info</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-[#AEBAC1] hover:text-white transition" />
        </button>
      </div>

      {/* Avatar + Name */}
      <div className="flex flex-col items-center py-6 border-b border-[#1F2C34] px-6">
        <div className="w-28 h-28 rounded-full bg-[#2A3942] flex items-center justify-center text-white text-4xl font-semibold">
          {avatarLetter}
        </div>

        {!editing ? (
          <>
            <div className="mt-4 flex items-center gap-2 max-w-full">
              <span className="text-[18px] text-white truncate max-w-[190px]">
                {displayName || phone}
              </span>
              <button
                onClick={() => {
                  setEditing(true);
                  setError(null);
                  setNameInput(displayName || "");
                }}
                className="p-1 rounded-full hover:bg-[#2A3942] text-[#AEBAC1] hover:text-white transition"
                aria-label="Edit name"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[13px] text-[#8696A0] mt-1 w-full text-center break-all">
              {phone}
            </div>

            <div className="text-[13px] text-[#8696A0] mt-1">FDG Contact</div>
          </>
        ) : (
          <div className="mt-4 w-full space-y-2">
            <input
              type="text"
              className="w-full bg-[#202C33] text-white text-[14px] px-3 py-2 rounded-md outline-none border border-[#2A3942] focus:border-[#00A884]"
              placeholder="Enter contact name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />

            {error && (
              <div className="text-xs text-red-400">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="text-sm px-3 py-1 rounded-md border border-[#2A3942] text-[#AEBAC1] hover:bg-[#202C33]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="text-sm px-3 py-1 rounded-md bg-[#00A884] text-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Options List */}
      <div className="mt-4 px-4 space-y-3">
        <button className="w-full text-left bg-[#202C33] px-4 py-3 rounded-lg text-white hover:bg-[#2A3942] transition">
          Media, links & docs
        </button>

        <button className="w-full text-left bg-[#202C33] px-4 py-3 rounded-lg text-white hover:bg-[#2A3942] transition">
          Starred messages
        </button>

        <button className="w-full text-left bg-[#202C33] px-4 py-3 rounded-lg text-white hover:bg-[#2A3942] transition">
          Block Contact
        </button>

        <button className="w-full text-left bg-[#202C33] px-4 py-3 rounded-lg text-red-400 hover:bg-[#2A3942] transition">
          Clear Chat
        </button>

        <button className="w-full text-left bg-[#202C33] px-4 py-3 rounded-lg text-red-500 hover:bg-[#2A3942] transition">
          Delete Chat
        </button>
      </div>
    </div>
  );
}
