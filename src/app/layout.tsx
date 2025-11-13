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
      <body className="flex h-screen bg-[#1e1f22] text-white">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
