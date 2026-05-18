"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProgress } from "@/lib/store/progress";

const UNITS: Record<number, {
  title: string;
  color: string;
  activeColor: string;
  topics: { key: string; label: string; href: string }[];
}> = {
  1: {
    title: "Conjuntos y Funciones",
    color: "text-unit1",
    activeColor: "bg-unit1-light text-unit1 font-semibold border-l-2 border-unit1",
    topics: [
      { key: "u1/conjuntos",  label: "1.1 Conjuntos",   href: "/unidad/1/conjuntos" },
      { key: "u1/operaciones",label: "1.2 Operaciones",  href: "/unidad/1/operaciones" },
      { key: "u1/conteo",     label: "1.3 Conteo",       href: "/unidad/1/conteo" },
      { key: "u1/funciones",  label: "1.4 Funciones",    href: "/unidad/1/funciones" },
    ],
  },
  2: {
    title: "Álgebra de Proposiciones",
    color: "text-unit2",
    activeColor: "bg-unit2-light text-unit2 font-semibold border-l-2 border-unit2",
    topics: [
      { key: "u2/proposiciones",  label: "2.1 Proposiciones",  href: "/unidad/2/proposiciones" },
      { key: "u2/tablas-verdad",  label: "2.2 Tablas de verdad", href: "/unidad/2/tablas-verdad" },
      { key: "u2/tautologias",    label: "2.3 Tautologías",     href: "/unidad/2/tautologias" },
    ],
  },
  3: {
    title: "Matrices y Determinantes",
    color: "text-unit3",
    activeColor: "bg-unit3-light text-unit3 font-semibold border-l-2 border-unit3",
    topics: [
      { key: "u3/matrices",      label: "3.1 Matrices",       href: "/unidad/3/matrices" },
      { key: "u3/operaciones",   label: "3.2 Operaciones",    href: "/unidad/3/operaciones" },
      { key: "u3/determinantes", label: "3.3 Determinantes",  href: "/unidad/3/determinantes" },
      { key: "u3/inversa",       label: "3.4 Inversa",        href: "/unidad/3/inversa" },
    ],
  },
  4: {
    title: "Sistemas de Ecuaciones",
    color: "text-unit4",
    activeColor: "bg-unit4-light text-unit4 font-semibold border-l-2 border-unit4",
    topics: [
      { key: "u4/sistemas", label: "4.1 Sistemas",   href: "/unidad/4/sistemas" },
      { key: "u4/cramer",   label: "4.2 Cramer",     href: "/unidad/4/cramer" },
      { key: "u4/graficas", label: "4.3 Gráficas",   href: "/unidad/4/graficas" },
    ],
  },
};

interface UnitSidebarProps { unit: number }

export default function UnitSidebar({ unit }: UnitSidebarProps) {
  const pathname = usePathname();
  const { visitedTopics, getUnitProgress } = useProgress();
  const data = UNITS[unit];
  if (!data) return null;

  const progress = getUnitProgress(unit);

  return (
    <nav className="text-sm">
      {/* Unit header */}
      <div className="mb-3">
        <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-600 flex items-center gap-1 mb-2">
          ← Inicio
        </Link>
        <p className="text-xs font-bold uppercase tracking-wide text-neutral-400">Unidad {unit}</p>
        <p className={`font-semibold ${data.color}`}>{data.title}</p>
        {/* Progress bar */}
        <div className="mt-2 h-1 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${unit === 1 ? "bg-unit1" : unit === 2 ? "bg-unit2" : unit === 3 ? "bg-unit3" : "bg-unit4"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-neutral-400 mt-0.5">{progress}% completado</p>
      </div>

      {/* Topics */}
      <ul className="space-y-0.5">
        {data.topics.map((t) => {
          const active = pathname === t.href;
          const visited = visitedTopics[t.key];
          return (
            <li key={t.key}>
              <Link
                href={t.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors
                  ${active
                    ? data.activeColor
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
              >
                <span>{t.label}</span>
                {visited && !active && (
                  <span className="text-xs text-green-500">✓</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
