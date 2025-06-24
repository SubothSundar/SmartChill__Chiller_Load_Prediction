"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/predict", label: "Prediction" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <nav className="flex gap-10 text-2xl">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-bold rounded-lg px-4 py-2 transition-colors duration-200 ${
            pathname === link.href
              ? "bg-blue-600 text-white"
              : "text-blue-600 hover:bg-blue-100"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
} 