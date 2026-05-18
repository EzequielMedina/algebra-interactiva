"use client";

import Link from "next/link";

interface UnitCardProps {
  unit: number;
  title: string;
  description: string;
  topics: string[];
  href: string;
  progress: number;
  color: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    bar: string;
    button: string;
  };
}

export default function UnitCard({
  unit,
  title,
  description,
  topics,
  href,
  progress,
  color,
}: UnitCardProps) {
  return (
    <div
      className={`rounded-2xl border-2 ${color.border} bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden`}
    >
      {/* Header */}
      <div className={`${color.bg} px-6 py-5`}>
        <span
          className={`inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${color.badge} mb-3`}
        >
          Unidad {unit}
        </span>
        <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
        <p className="text-sm text-neutral-600 mt-1">{description}</p>
      </div>

      {/* Topics */}
      <ul className="px-6 py-4 flex-1 space-y-1.5">
        {topics.map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm text-neutral-700">
            <span className={`mt-0.5 ${color.text} font-bold`}>›</span>
            {t}
          </li>
        ))}
      </ul>

      {/* Progress + CTA */}
      <div className="px-6 pb-5">
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
          <span>Progreso</span>
          <span className="font-semibold">{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden mb-4">
          <div
            className={`h-full rounded-full transition-all duration-500 ${color.bar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <Link
          href={href}
          className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white ${color.button} transition-opacity hover:opacity-90`}
        >
          {progress === 0 ? "Empezar" : "Continuar"} →
        </Link>
      </div>
    </div>
  );
}
