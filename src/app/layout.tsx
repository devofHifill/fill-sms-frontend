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
      <body className="flex h-screen bg-[#111B21] text-white overflow-hidden font-sans">

        {/* LEFT COLUMN (Sidebar + its top navbar) */}
        <div className="hidden md:flex flex-col w-72 border-r border-[#1F2C34]">
          <Navbar />
          <Sidebar />
        </div>

        {/* RIGHT COLUMN (Chat Section) */}
        <div className="flex flex-col flex-1 min-h-0 bg-[#111B21]">
          <main className="flex-1 min-h-0 overflow-hidden">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}
