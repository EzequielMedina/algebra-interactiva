"use client";

import { useState } from "react";

export interface ChoiceOption {
  label: string;
  correct: boolean;
  explanation: string;
}

export interface TFItem {
  statement: string;
  correct: boolean;
  explanation: string;
}

interface ChoiceExercise {
  type: "choice";
  question: string;
  options: ChoiceOption[];
}

interface TrueFalseExercise {
  type: "truefalse";
  instructions: string;
  items: TFItem[];
}

export type Exercise = ChoiceExercise | TrueFalseExercise;

interface ExerciseCardProps {
  number: string;
  title: string;
  exercise: Exercise;
}

/* ─── Multiple choice ─── */
function ChoiceExercise({ question, options }: ChoiceExercise) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <div>
      <p className="text-neutral-800 mb-3 leading-relaxed">{question}</p>
      <div className="space-y-2">
        {options.map((opt, i) => {
          let style = "border-neutral-200 bg-white hover:bg-neutral-50";
          if (answered && i === selected)
            style = opt.correct
              ? "border-green-400 bg-green-50"
              : "border-red-400 bg-red-50";
          else if (answered && opt.correct)
            style = "border-green-400 bg-green-50";

          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className={`w-full text-left px-4 py-2.5 rounded-lg border-2 text-sm transition-colors ${style}`}
            >
              <span className="font-semibold mr-2 text-neutral-500">{String.fromCharCode(65 + i)})</span>
              {opt.label}
              {answered && i === selected && (
                <p className={`mt-1 text-xs ${opt.correct ? "text-green-700" : "text-red-700"}`}>
                  {opt.correct ? "✓ " : "✗ "}{opt.explanation}
                </p>
              )}
              {answered && !opt.correct && opt.correct && (
                <p className="mt-1 text-xs text-green-700">✓ {opt.explanation}</p>
              )}
            </button>
          );
        })}
      </div>
      {answered && (
        <button
          onClick={() => setSelected(null)}
          className="mt-3 text-xs text-neutral-500 hover:text-neutral-700 underline"
        >
          Intentar de nuevo
        </button>
      )}
    </div>
  );
}

/* ─── True / False ─── */
function TFExercise({ instructions, items }: TrueFalseExercise) {
  const [answers, setAnswers] = useState<(boolean | null)[]>(() => items.map(() => null));
  const [checked, setChecked] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const score = checked
    ? items.filter((it, i) => answers[i] === it.correct).length
    : 0;

  function pick(i: number, val: boolean) {
    if (checked) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = val;
      return next;
    });
  }

  return (
    <div>
      <p className="text-neutral-600 text-sm mb-3">{instructions}</p>
      <div className="space-y-3">
        {items.map((item, i) => {
          const answered = checked;
          const userAns = answers[i];
          const isCorrect = userAns === item.correct;

          return (
            <div
              key={i}
              className={`rounded-lg border px-4 py-3 text-sm ${
                answered
                  ? isCorrect
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
                  : "border-neutral-200"
              }`}
            >
              <p className="text-neutral-800 mb-2">
                <span className="font-semibold text-neutral-500 mr-2">{i + 1}.</span>
                {item.statement}
              </p>
              <div className="flex gap-2">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    onClick={() => pick(i, val)}
                    className={`px-4 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                      answers[i] === val
                        ? "bg-neutral-800 text-white border-neutral-800"
                        : "border-neutral-300 text-neutral-600 hover:bg-neutral-100"
                    } ${checked ? "cursor-default" : ""}`}
                  >
                    {val ? "Verdadero" : "Falso"}
                  </button>
                ))}
              </div>
              {answered && (
                <p className={`mt-2 text-xs ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                  {isCorrect ? "✓ Correcto. " : `✗ Incorrecto — la respuesta es ${item.correct ? "Verdadero" : "Falso"}. `}
                  {item.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-4">
        {!checked ? (
          <button
            disabled={!allAnswered}
            onClick={() => setChecked(true)}
            className="px-5 py-2 bg-unit1 text-white rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-unit1-dark transition-colors"
          >
            Verificar respuestas
          </button>
        ) : (
          <>
            <p className="text-sm font-semibold text-neutral-800">
              Resultado: {score}/{items.length}{" "}
              {score === items.length ? "🎉 ¡Perfecto!" : score >= items.length / 2 ? "👍 Bien" : "📖 Repasá los conceptos"}
            </p>
            <button
              onClick={() => { setAnswers(items.map(() => null)); setChecked(false); }}
              className="text-xs text-neutral-500 underline hover:text-neutral-700"
            >
              Reintentar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Card wrapper ─── */
export default function ExerciseCard({ number, title, exercise }: ExerciseCardProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-2 border-unit1 rounded-xl overflow-hidden my-8">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 bg-unit1-light hover:bg-blue-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="bg-unit1 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
            Desempeño {number}
          </span>
          <span className="font-semibold text-neutral-800">{title}</span>
        </div>
        <span className="text-neutral-500 text-lg">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="px-5 py-4">
          {exercise.type === "choice" && <ChoiceExercise {...exercise} />}
          {exercise.type === "truefalse" && <TFExercise {...exercise} />}
        </div>
      )}
    </div>
  );
}
