import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  title: "SmartChill | AI-Powered Chiller Optimization",
  description: "Save energy and optimize your chiller plant with SmartChill's AI predictions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-gray-300 font-sans min-h-screen flex flex-col">
        <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo2.png" alt="SmartChill Logo" className="h-20 w-auto" />
          </a>
          <NavBar />
        </header>
        <main className="flex-1 flex flex-col items-center justify-center">{children}</main>
        <footer className="w-full bg-blue-50 text-center py-4 text-gray-500 text-sm mt-8 border-t">© {new Date().getFullYear()} SmartChill. All rights reserved.</footer>
      </body>
    </html>
  );
}
