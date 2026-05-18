"use client";

import katex from "katex";
import { useMemo } from "react";

interface FormulaProps {
  math: string;
  block?: boolean;
  className?: string;
}

export default function Formula({ math, block = false, className }: FormulaProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        throwOnError: false,
        displayMode: block,
      });
    } catch {
      return math;
    }
  }, [math, block]);

  if (block) {
    return (
      <div
        className={`overflow-x-auto py-2 text-center ${className ?? ""}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
