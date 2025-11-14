import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Fill-SMS Dashboard",
  description: "Manage SMS conversations easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen md:h-dvh bg-[#1e1f22] text-white overflow-hidden font-sans">

        {/* --- Left Sidebar (Desktop Only) --- */}
        <div className="hidden md:flex h-full">
          <Sidebar />
        </div>

        {/* --- Right Main Area --- */}
        <div className="flex flex-col flex-1 min-h-0">
          <Navbar />
          <main className="flex-1 min-h-0 overflow-hidden">{children}</main>
        </div>

      </body>
    </html>
  );
}
