export default function Navbar() {
  return (
    <div className="h-14 border-b border-neutral-800 flex items-center justify-between px-4 bg-[#1a1b1e]">
      <input
        type="text"
        placeholder="Search contacts..."
        className="bg-[#2b2d31] text-sm px-3 py-2 rounded-full outline-none text-white placeholder-neutral-400 w-64"
      />
      <div className="flex items-center gap-4 text-sm">
        <button className="hover:text-blue-400">Settings</button>
        <button className="hover:text-red-400">Logout</button>
      </div>
    </div>
  );
}
