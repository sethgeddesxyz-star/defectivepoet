"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/music", label: "Music" },
  { href: "/poems", label: "Poems" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <div className="gold-gradient h-0.5 shadow-[0_1px_8px_rgba(254,190,0,0.3)]" />
      <nav className="bg-memorial-bg border-b border-gold-800/30">
        <div className="page-container">
          <div className="flex items-center justify-between h-24 sm:h-36">
            <Link href="/" className="flex items-center gap-3 shrink-0 gold-focus">
              <img
                src="/images/logo.png"
                alt="Defective Poet"
                className="h-20 sm:h-32 w-auto"
                style={{ filter: "invert(1) sepia(0.4) saturate(2) brightness(0.9)" }}
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-gold-200 hover:text-gold-500 transition-colors text-sm font-medium tracking-[0.15em] uppercase gold-underline gold-focus"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gold-300 hover:text-gold-500 gold-focus"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile nav */}
          <div
            className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight: mobileMenuOpen ? "300px" : "0px",
              opacity: mobileMenuOpen ? 1 : 0,
            }}
          >
            <div className="pb-4 border-t border-gold-800/30">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gold-200 hover:text-gold-500 hover:bg-gold-900/20 transition-colors text-sm font-medium tracking-[0.15em] uppercase gold-focus"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
