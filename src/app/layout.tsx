import "@/app/globals.css";
import AppShell from "@/components/AppShell";

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
      <body className="h-screen bg-[#111B21] text-white overflow-hidden font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
