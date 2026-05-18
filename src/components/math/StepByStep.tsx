"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";

interface Step {
  label?: string;
  content: ReactNode;
}

interface StepByStepProps {
  steps: Step[];
  title?: string;
}

export default function StepByStep({ steps, title }: StepByStepProps) {
  const [visible, setVisible] = useState(1);

  const showNext = () => setVisible((v) => Math.min(v + 1, steps.length));
  const showAll  = () => setVisible(steps.length);
  const reset    = () => setVisible(1);

  return (
    <div className="my-6 rounded-xl border border-neutral-200 overflow-hidden">
      {title && (
        <div className="bg-neutral-100 px-5 py-3 font-semibold text-neutral-700 text-sm">
          {title}
        </div>
      )}

      <ol className="px-5 py-4 space-y-4">
        <AnimatePresence initial={false}>
          {steps.slice(0, visible).map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 items-start"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-unit1 text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="flex-1">
                {step.label && (
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1">
                    {step.label}
                  </p>
                )}
                <div className="text-neutral-800">{step.content}</div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>

      <div className="px-5 pb-4 flex gap-2">
        {visible < steps.length && (
          <>
            <button
              onClick={showNext}
              className="px-4 py-1.5 bg-unit1 text-white text-sm rounded-lg hover:bg-unit1-dark transition-colors"
            >
              Siguiente paso →
            </button>
            <button
              onClick={showAll}
              className="px-4 py-1.5 bg-neutral-100 text-neutral-700 text-sm rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Ver todo
            </button>
          </>
        )}
        {visible === steps.length && visible > 1 && (
          <button
            onClick={reset}
            className="px-4 py-1.5 bg-neutral-100 text-neutral-600 text-sm rounded-lg hover:bg-neutral-200 transition-colors"
          >
            ↺ Reiniciar
          </button>
        )}
      </div>
    </div>
  );
}
