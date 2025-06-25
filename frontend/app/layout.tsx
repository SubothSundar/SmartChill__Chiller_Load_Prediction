import type { Metadata } from "next";
import "./globals.css";
import NavBar from "../components/NavBar";
import FloatingLogos from "../components/FloatingLogos";
import HeaderAnimation from "../components/HeaderAnimation";

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
      <body className="bg-black text-gray-300 font-sans min-h-screen flex flex-col relative overflow-x-hidden">
        <FloatingLogos />
        <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between z-10 relative overflow-hidden">
          <HeaderAnimation />
          <a href="/" className="flex items-center gap-3 relative z-10">
            <img src="/logo2.png" alt="SmartChill Logo" className="h-20 w-auto" />
          </a>
          <div className="relative z-10">
            <NavBar />
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center z-10 relative">{children}</main>
        <footer className="w-full bg-blue-50 text-center py-4 text-gray-500 text-sm mt-8 border-t z-10 relative">© {new Date().getFullYear()} SmartChill. All rights reserved.</footer>
      </body>
    </html>
  );
}
