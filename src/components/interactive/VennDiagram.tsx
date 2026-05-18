"use client";

import { useState, useMemo, useId } from "react";

// ── SVG layout constants ──────────────────────────────────────────────────────
const W = 480, H = 260;
const CX1 = 170, CX2 = 310, CY = 130, R = 108;
// Region visual centers
const C_A   = 108;   // x center of A-only crescent
const C_MID = 240;   // x center of intersection
const C_B   = 372;   // x center of B-only crescent

// ── Types ────────────────────────────────────────────────────────────────────
type Op = "union" | "intersection" | "diff-ab" | "diff-ba" | "comp-a" | "comp-b";

const OPS: { id: Op; symbol: string; desc: string }[] = [
  { id: "union",        symbol: "A ∪ B", desc: "Todos los elementos de A o de B" },
  { id: "intersection", symbol: "A ∩ B", desc: "Elementos comunes a A y B" },
  { id: "diff-ab",      symbol: "A − B", desc: "En A pero no en B" },
  { id: "diff-ba",      symbol: "B − A", desc: "En B pero no en A" },
  { id: "comp-a",       symbol: "Aᶜ",    desc: "Todo lo que NO está en A (respecto a U)" },
  { id: "comp-b",       symbol: "Bᶜ",    desc: "Todo lo que NO está en B (respecto a U)" },
];

// ── Highlight map ─────────────────────────────────────────────────────────────
const HIGHLIGHT: Record<Op, { onlyA: boolean; center: boolean; onlyB: boolean; outside: boolean }> = {
  union:        { onlyA: true,  center: true,  onlyB: true,  outside: false },
  intersection: { onlyA: false, center: true,  onlyB: false, outside: false },
  "diff-ab":    { onlyA: true,  center: false, onlyB: false, outside: false },
  "diff-ba":    { onlyA: false, center: false, onlyB: true,  outside: false },
  "comp-a":     { onlyA: false, center: false, onlyB: true,  outside: true  },
  "comp-b":     { onlyA: true,  center: false, onlyB: false, outside: true  },
};

// ── Colors ────────────────────────────────────────────────────────────────────
const CLR_HL      = "#93C5FD"; // blue-300 — highlighted region
const CLR_HL_STR  = "#3B82F6"; // blue-500 — intersection when highlighted
const CLR_NEUTRAL = "#E5E7EB"; // gray-200 — unselected region
const CLR_OUTSIDE = "#BFDBFE"; // blue-100 — outside region

// ── Helpers ───────────────────────────────────────────────────────────────────
function parseSet(s: string): string[] {
  return s.split(",").map((x) => x.trim()).filter(Boolean);
}

function positions(items: string[], cx: number) {
  const gap = 22;
  const n = Math.min(items.length, 5);
  return items.slice(0, n).map((label, i) => ({
    label,
    x: cx,
    y: CY - ((n - 1) * gap) / 2 + i * gap,
  }));
}

// ── Component ─────────────────────────────────────────────────────────────────
interface VennDiagramProps {
  defaultA?: string;
  defaultB?: string;
  title?: string;
  readOnly?: boolean;
}

export default function VennDiagram({
  defaultA = "1, 2, 3, 4",
  defaultB = "3, 4, 5, 6",
  title,
  readOnly = false,
}: VennDiagramProps) {
  const uid    = useId().replace(/:/g, "");
  const [rawA, setRawA]   = useState(defaultA);
  const [rawB, setRawB]   = useState(defaultB);
  const [op, setOp]       = useState<Op | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  const setA = useMemo(() => new Set(parseSet(rawA)), [rawA]);
  const setB = useMemo(() => new Set(parseSet(rawB)), [rawB]);

  const onlyA  = useMemo(() => [...setA].filter((x) => !setB.has(x)), [setA, setB]);
  const bothAB = useMemo(() => [...setA].filter((x) => setB.has(x)),  [setA, setB]);
  const onlyB  = useMemo(() => [...setB].filter((x) => !setA.has(x)), [setA, setB]);

  const result = useMemo((): string[] => {
    if (!op) return [];
    switch (op) {
      case "union":        return [...new Set([...setA, ...setB])];
      case "intersection": return bothAB;
      case "diff-ab":      return onlyA;
      case "diff-ba":      return onlyB;
      case "comp-a":       return onlyB;   // simplified (U not fully defined)
      case "comp-b":       return onlyA;
    }
  }, [op, setA, setB, onlyA, bothAB, onlyB]);

  const hl = op ? HIGHLIGHT[op] : { onlyA: false, center: false, onlyB: false, outside: false };

  const fillOnlyA  = hl.onlyA   ? CLR_HL     : CLR_NEUTRAL;
  const fillCenter = hl.center  ? CLR_HL_STR : CLR_NEUTRAL;
  const fillOnlyB  = hl.onlyB   ? CLR_HL     : CLR_NEUTRAL;
  const fillOutside = hl.outside ? CLR_OUTSIDE : "transparent";

  const posA   = positions(onlyA,  C_A);
  const posAB  = positions(bothAB, C_MID);
  const posB   = positions(onlyB,  C_B);

  return (
    <div className="my-4">
      {title && <p className="font-semibold text-neutral-700 mb-3">{title}</p>}

      {/* Operation buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {OPS.map((o) => (
          <button
            key={o.id}
            onClick={() => setOp(op === o.id ? null : o.id)}
            title={o.desc}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border
              ${op === o.id
                ? "bg-unit1 text-white border-unit1"
                : "bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50"
              }`}
          >
            {o.symbol}
          </button>
        ))}
      </div>

      {/* SVG Diagram */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-lg rounded-xl border border-neutral-200 bg-white"
        aria-label="Diagrama de Venn interactivo"
      >
        <defs>
          {/* A-only: A masked to exclude B */}
          <mask id={`${uid}-ma`}>
            <rect width={W} height={H} fill="white" />
            <circle cx={CX2} cy={CY} r={R} fill="black" />
          </mask>
          {/* B-only: B masked to exclude A */}
          <mask id={`${uid}-mb`}>
            <rect width={W} height={H} fill="white" />
            <circle cx={CX1} cy={CY} r={R} fill="black" />
          </mask>
          {/* Intersection: A clipped to B */}
          <clipPath id={`${uid}-ci`}>
            <circle cx={CX2} cy={CY} r={R} />
          </clipPath>
          {/* Outside: rect masked to exclude both circles */}
          <mask id={`${uid}-mo`}>
            <rect width={W} height={H} fill="white" />
            <circle cx={CX1} cy={CY} r={R} fill="black" />
            <circle cx={CX2} cy={CY} r={R} fill="black" />
          </mask>
        </defs>

        {/* Universal set background */}
        <rect x={8} y={8} width={W - 16} height={H - 16} rx={10}
          fill={op ? "#F9FAFB" : "#F9FAFB"} stroke="#D1D5DB" strokeWidth={1.5} />
        <text x={W - 20} y={26} textAnchor="end" fontSize={13} fill="#9CA3AF" fontWeight="600">U</text>

        {/* Outside highlight layer */}
        {hl.outside && (
          <rect x={8} y={8} width={W - 16} height={H - 16} rx={10}
            mask={`url(#${uid}-mo)`} fill={fillOutside} />
        )}

        {/* A-only region */}
        <circle cx={CX1} cy={CY} r={R} mask={`url(#${uid}-ma)`} fill={fillOnlyA} />

        {/* Intersection region */}
        <circle cx={CX1} cy={CY} r={R} clipPath={`url(#${uid}-ci)`} fill={fillCenter} />

        {/* B-only region */}
        <circle cx={CX2} cy={CY} r={R} mask={`url(#${uid}-mb)`} fill={fillOnlyB} />

        {/* Circle outlines */}
        <circle cx={CX1} cy={CY} r={R} fill="none" stroke="#6B7280" strokeWidth={2} />
        <circle cx={CX2} cy={CY} r={R} fill="none" stroke="#6B7280" strokeWidth={2} />

        {/* Set labels */}
        <text x={CX1 - 68} y={36} fontSize={17} fontWeight="700" fill="#374151">A</text>
        <text x={CX2 + 52} y={36} fontSize={17} fontWeight="700" fill="#374151">B</text>

        {/* Element labels */}
        {posA.map((p) => (
          <text key={p.label} x={p.x} y={p.y + 5} textAnchor="middle" fontSize={12}
            fill="#1E3A8A" fontWeight="600">{p.label}</text>
        ))}
        {onlyA.length > 5 && (
          <text x={C_A} y={CY + 60} textAnchor="middle" fontSize={10} fill="#6B7280">
            +{onlyA.length - 5} más
          </text>
        )}
        {posAB.map((p) => (
          <text key={p.label} x={p.x} y={p.y + 5} textAnchor="middle" fontSize={12}
            fill="#1E3A8A" fontWeight="600">{p.label}</text>
        ))}
        {bothAB.length > 5 && (
          <text x={C_MID} y={CY + 60} textAnchor="middle" fontSize={10} fill="#6B7280">
            +{bothAB.length - 5} más
          </text>
        )}
        {posB.map((p) => (
          <text key={p.label} x={p.x} y={p.y + 5} textAnchor="middle" fontSize={12}
            fill="#1E3A8A" fontWeight="600">{p.label}</text>
        ))}
        {onlyB.length > 5 && (
          <text x={C_B} y={CY + 60} textAnchor="middle" fontSize={10} fill="#6B7280">
            +{onlyB.length - 5} más
          </text>
        )}
      </svg>

      {/* Operation description */}
      {op && (
        <div className="mt-3 flex items-start gap-3 bg-unit1-light rounded-xl px-4 py-3">
          <span className="font-mono font-bold text-unit1 text-lg">{OPS.find((o) => o.id === op)?.symbol}</span>
          <div>
            <p className="text-sm text-neutral-700">{OPS.find((o) => o.id === op)?.desc}</p>
            <p className="text-sm font-mono font-semibold text-neutral-900 mt-0.5">
              = {result.length > 0 ? `{ ${result.join(", ")} }` : "∅"}
            </p>
            {(op === "comp-a" || op === "comp-b") && (
              <p className="text-xs text-neutral-500 mt-1">
                * Resultado simplificado. El complemento completo incluye todos los elementos de U que no están en {op === "comp-a" ? "A" : "B"}.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Edit sets */}
      {!readOnly && (
        <div className="mt-3">
          <button
            onClick={() => setShowEdit(!showEdit)}
            className="text-xs text-neutral-500 hover:text-neutral-700 underline"
          >
            {showEdit ? "Ocultar" : "✏ Editar conjuntos A y B"}
          </button>
          {showEdit && (
            <div className="mt-2 grid grid-cols-2 gap-3">
              {[
                { label: "Conjunto A", value: rawA, set: setRawA },
                { label: "Conjunto B", value: rawB, set: setRawB },
              ].map(({ label, value, set }) => (
                <div key={label}>
                  <label className="text-xs text-neutral-500 mb-1 block">{label} (separados por coma)</label>
                  <input
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    className="w-full border border-neutral-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-unit1"
                    placeholder="ej: 1, 2, 3"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
