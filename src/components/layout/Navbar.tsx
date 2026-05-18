"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const units = [
  { id: 1, label: "Conjuntos y Funciones", href: "/unidad/1/conjuntos", color: "text-unit1" },
  { id: 2, label: "Proposiciones", href: "/unidad/2/proposiciones", color: "text-unit2" },
  { id: 3, label: "Matrices", href: "/unidad/3/matrices", color: "text-unit3" },
  { id: 4, label: "Sistemas", href: "/unidad/4/sistemas", color: "text-unit4" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-neutral-900">
          <span className="text-unit1 text-xl">∑</span>
          <span>Álgebra Interactiva</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {units.map((u) => {
            const active = pathname.startsWith(`/unidad/${u.id}`);
            return (
              <Link
                key={u.id}
                href={u.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                  ${active
                    ? `${u.color} bg-neutral-100`
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                  }`}
              >
                <span className="text-xs font-bold mr-1 opacity-60">U{u.id}</span>
                {u.label}
              </Link>
            );
          })}
          <Link
            href="/ejercicios"
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
              ${pathname === "/ejercicios"
                ? "text-neutral-900 bg-neutral-100"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
              }`}
          >
            Ejercicios
          </Link>
        </nav>

        {/* Hamburger mobile */}
        <button
          className="md:hidden p-2 rounded-md text-neutral-600 hover:bg-neutral-100"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-neutral-100 bg-white px-4 py-3 flex flex-col gap-1">
          {units.map((u) => (
            <Link
              key={u.id}
              href={u.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-md text-sm font-medium ${u.color} hover:bg-neutral-50`}
            >
              Unidad {u.id} — {u.label}
            </Link>
          ))}
          <Link
            href="/ejercicios"
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Ejercicios
          </Link>
        </div>
      )}
    </header>
  );
}
