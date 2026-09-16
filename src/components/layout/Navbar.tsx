"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";

const navigation = [
  { href: "/", label: "Accueil" },
  { href: "/machines", label: "Nos machines" },
  { href: "/services", label: "Nos services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloque le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-espresso/95 shadow-[0_1px_0_0_rgba(198,161,91,0.25)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-site flex h-18 items-center justify-between py-3">
        <Logo />

        {/* Navigation desktop */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-sm font-medium tracking-wide transition-colors ${
                isActive(item.href)
                  ? "text-gold"
                  : "text-cream/80 hover:text-cream"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact">Demander une étude</Button>
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex h-12 w-12 items-center justify-center rounded-lg text-cream transition-colors hover:bg-cream/10 lg:hidden"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6 L18 18 M18 6 L6 18" />
            ) : (
              <path d="M4 7 h16 M4 12 h16 M4 17 h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile plein écran */}
      <div
        id="mobile-menu"
        className={`overflow-hidden bg-espresso transition-[max-height] duration-300 ease-out lg:hidden ${
          open ? "max-h-[calc(100dvh-4.5rem)]" : "max-h-0"
        }`}
      >
        <nav aria-label="Navigation mobile" className="container-site flex flex-col gap-1 pb-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-lg px-4 py-3.5 text-base font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-gold/10 text-gold"
                  : "text-cream/85 hover:bg-cream/5 hover:text-cream"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 px-4" onClick={() => setOpen(false)}>
            <Button href="/contact" className="w-full">
              Demander une étude
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
