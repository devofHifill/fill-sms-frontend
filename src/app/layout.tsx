import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Fill-SMS Dashboard",
  description: "Manage SMS conversations easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-dvh bg-[#1e1f22] text-white">
        <div className="hidden md:flex">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 min-h-0">
          <Navbar />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
