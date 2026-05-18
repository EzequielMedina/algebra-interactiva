import { ReactNode } from "react";

type DefinitionType = "definition" | "theorem" | "property" | "warning" | "example";

interface DefinitionProps {
  type?: DefinitionType;
  title?: string;
  children: ReactNode;
}

const styles: Record<DefinitionType, { border: string; bg: string; label: string; icon: string }> = {
  definition: {
    border: "border-unit1",
    bg:     "bg-unit1-light",
    label:  "Definición",
    icon:   "📐",
  },
  theorem: {
    border: "border-unit3",
    bg:     "bg-unit3-light",
    label:  "Teorema",
    icon:   "✦",
  },
  property: {
    border: "border-unit2",
    bg:     "bg-unit2-light",
    label:  "Propiedad",
    icon:   "▸",
  },
  warning: {
    border: "border-unit4",
    bg:     "bg-unit4-light",
    label:  "Para tener en cuenta",
    icon:   "⚠",
  },
  example: {
    border: "border-neutral-300",
    bg:     "bg-neutral-50",
    label:  "Ejemplo",
    icon:   "✎",
  },
};

export default function Definition({
  type = "definition",
  title,
  children,
}: DefinitionProps) {
  const s = styles[type];

  return (
    <div className={`border-l-4 ${s.border} ${s.bg} rounded-r-lg px-5 py-4 my-4`}>
      <p className="text-xs font-bold uppercase tracking-wide text-neutral-500 mb-1">
        {s.icon} {title ?? s.label}
      </p>
      <div className="text-neutral-800 leading-relaxed">{children}</div>
    </div>
  );
}
