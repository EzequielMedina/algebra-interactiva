"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/store/progress";
import Definition from "@/components/math/Definition";
import Formula from "@/components/math/Formula";
import StepByStep from "@/components/math/StepByStep";

/* ── Counting problem solver ─────────────────────────────────────────────── */
interface Region { key: string; label: string; value: number | "" }

function CountingProblem() {
  const [regions, setRegions] = useState<Region[]>([
    { key: "abc", label: "T ∩ C ∩ R (los tres)", value: 4 },
    { key: "ab_only", label: "Solo T y C (no R)", value: "" },
    { key: "ac_only", label: "Solo T y R (no C)", value: 3 },
    { key: "bc_only", label: "Solo C y R (no T)", value: 2 },
    { key: "a_only", label: "Solo T", value: "" },
    { key: "b_only", label: "Solo C", value: 7 },
    { key: "c_only", label: "Solo R", value: "" },
  ]);
  const [checked, setChecked] = useState(false);

  // Known totals: T=15, C=19, R=20, all=4, only-C+R=2, only-C=7, only-T+R=3, total=56
  const answers: Record<string, number> = {
    abc: 4, ab_only: 2, ac_only: 3, bc_only: 2, a_only: 5, b_only: 7, c_only: 11,
  };

  function update(key: string, v: string) {
    setRegions((r) => r.map((region) => region.key === key ? { ...region, value: v === "" ? "" : Number(v) } : region));
  }

  const allFilled = regions.every((r) => r.value !== "");
  const score = checked ? regions.filter((r) => Number(r.value) === answers[r.key]).length : 0;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 mt-4">
      <p className="font-semibold text-neutral-800 mb-1">Desempeño 07 — Problema de la profesora</p>
      <p className="text-sm text-neutral-600 mb-4">
        Una profesora preguntó a sus alumnos sobre sus preferencias de lectura. 15 prefieren <strong>Poesía (T)</strong>, 19 prefieren <strong>Cuentos de terror (C)</strong> y 20 prefieren <strong>Revistas (R)</strong>. Además: 4 leen los tres, 2 solo C y R, 7 solo C, 3 solo T y R. Se encuestaron 56 alumnos en total. Completá la cantidad de alumnos en cada región del diagrama.
      </p>

      {/* Venn diagram schematic (text-based) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {regions.map((r) => {
          const correct = checked ? Number(r.value) === answers[r.key] : null;
          return (
            <div key={r.key} className={`rounded-xl border-2 p-3 transition-colors ${
              correct === null ? "border-neutral-200" :
              correct ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"
            }`}>
              <p className="text-xs text-neutral-500 mb-1">{r.label}</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={r.value}
                  onChange={(e) => !checked && update(r.key, e.target.value)}
                  disabled={checked}
                  className="w-16 border border-neutral-300 rounded-lg px-2 py-1 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-unit1"
                  placeholder="?"
                />
                {correct !== null && (
                  <span className={`text-sm font-bold ${correct ? "text-green-600" : "text-red-600"}`}>
                    {correct ? "✓" : `✗ (${answers[r.key]})`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        {!checked ? (
          <button
            disabled={!allFilled}
            onClick={() => setChecked(true)}
            className="px-5 py-2 bg-unit1 text-white rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-unit1-dark transition-colors"
          >
            Verificar
          </button>
        ) : (
          <>
            <p className="text-sm font-semibold">
              {score}/{regions.length} correctos{" "}
              {score === regions.length ? "🎉" : ""}
            </p>
            <button
              onClick={() => {
                setRegions((r) => r.map((reg) => ({ ...reg, value: ["abc","ac_only","bc_only","b_only"].includes(reg.key) ? answers[reg.key] : "" })));
                setChecked(false);
              }}
              className="text-xs text-neutral-500 underline"
            >
              Reintentar
            </button>
          </>
        )}
      </div>

      {checked && (
        <div className="mt-4 bg-unit1-light rounded-xl p-3 text-sm">
          <p className="font-semibold text-neutral-800 mb-1">Respuestas a las preguntas:</p>
          <ul className="space-y-1 text-neutral-700">
            <li>a) Solo revistas: <strong>11 alumnos</strong></li>
            <li>b) No contestaron: <strong>56 − (5+2+7+3+4+2+11) = 56 − 34 = 22 alumnos</strong></li>
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function ConteoPage() {
  const { markTopicVisited, setLastVisited } = useProgress();
  useEffect(() => {
    markTopicVisited("u1/conteo");
    setLastVisited("u1/conteo");
  }, [markTopicVisited, setLastVisited]);

  return (
    <article className="max-w-none">
      <nav className="text-xs text-neutral-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-neutral-600">Inicio</Link>
        <span>›</span>
        <span className="text-unit1 font-medium">Unidad 1</span>
        <span>›</span>
        <span className="text-neutral-700">Problemas de Conteo</span>
      </nav>

      <div className="mb-8">
        <span className="inline-block bg-unit1 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">Clase 2</span>
        <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">Problemas de Conteo</h1>
        <p className="text-neutral-500 text-sm">Cardinal de un conjunto · Principio de inclusión-exclusión</p>
      </div>

      {/* Cardinal */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">1. Cardinal de un Conjunto</h2>

        <Definition type="definition" title="Cardinal">
          En los problemas de conteo trabajamos con conjuntos <strong>finitos</strong>. La cantidad de elementos de un conjunto A se llama <strong>cardinal de A</strong> y se denota <strong>#(A)</strong>.
        </Definition>

        <Definition type="example" title="Ejemplo">
          <p>Si A = &#123;a, e, i, o, u&#125; entonces <strong>#(A) = 5</strong>.</p>
          <p className="mt-1">Si B = &#123;&#125; = ∅ entonces <strong>#(B) = 0</strong>.</p>
        </Definition>
      </section>

      {/* Inclusión-exclusión 2 conjuntos */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">2. Principio de Inclusión-Exclusión (2 conjuntos)</h2>

        <Definition type="theorem">
          Si A y B son conjuntos finitos, entonces:
          <Formula math="\#(A \cup B) = \#(A) + \#(B) - \#(A \cap B)" block />
          <p className="text-sm text-neutral-600 mt-2">
            Al sumar #(A) + #(B), contamos dos veces los elementos de A ∩ B, por eso los restamos una vez.
          </p>
        </Definition>

        <StepByStep
          title="¿Por qué restamos la intersección?"
          steps={[
            {
              label: "Paso 1 — Contar A",
              content: <p>Contamos todos los elementos de A: <strong>#(A)</strong> elementos.</p>,
            },
            {
              label: "Paso 2 — Sumar B",
              content: <p>Sumamos todos los elementos de B: <strong>#(A) + #(B)</strong>. Pero ahora los elementos de A ∩ B fueron contados dos veces (una como elemento de A, otra como elemento de B).</p>,
            },
            {
              label: "Paso 3 — Corregir",
              content: <p>Restamos una vez los elementos que contamos dos veces: <strong>#(A) + #(B) − #(A ∩ B)</strong>. Así cada elemento se cuenta exactamente una vez.</p>,
            },
          ]}
        />
      </section>

      {/* Inclusión-exclusión 3 conjuntos */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">3. Generalización a 3 Conjuntos</h2>

        <Definition type="theorem">
          <Formula
            math="\#(A \cup B \cup C) = \#(A) + \#(B) + \#(C) - \#(A \cap B) - \#(A \cap C) - \#(B \cap C) + \#(A \cap B \cap C)"
            block
          />
          <p className="text-sm text-neutral-600 mt-2">
            Sumamos los tres conjuntos, restamos las intersecciones dobles (cada una fue contada dos veces) y sumamos la triple intersección (fue restada tres veces pero debería contarse una).
          </p>
        </Definition>
      </section>

      {/* Ejemplo resuelto */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">4. Ejemplo Resuelto — Preferencias de Lectura</h2>

        <div className="bg-neutral-50 rounded-xl p-4 text-sm text-neutral-700 mb-4">
          <p className="font-semibold mb-2">Enunciado:</p>
          <p>
            Una profesora preguntó a sus alumnos sobre sus preferencias. 15 prefieren Poesía (P), 19 prefieren Cuentos de terror (C) y 20 prefieren Revistas (R). De ellos: 4 leen P, C y R; 2 solo C y R; 7 solo C; 3 P y R. Se encuestaron 56 alumnos en total.
          </p>
          <p className="mt-2 font-semibold">¿Cuántos alumnos leen solo revistas? ¿Cuántos no contestaron?</p>
        </div>

        <StepByStep
          title="Resolución paso a paso"
          steps={[
            {
              label: "Paso 1 — Ubicar los datos conocidos en el diagrama",
              content: (
                <div>
                  <p className="mb-2">Comenzamos por el centro (los 3 conjuntos a la vez) y avanzamos hacia afuera:</p>
                  <ul className="space-y-1 text-sm font-mono">
                    <li>P ∩ C ∩ R = 4</li>
                    <li>Solo C y R (no P) = 2</li>
                    <li>Solo P y R (no C) = 3</li>
                    <li>Solo C = 7</li>
                  </ul>
                </div>
              ),
            },
            {
              label: "Paso 2 — Calcular «solo C y P» (no R)",
              content: (
                <p>
                  Sabemos que #(C) = 19 en total. Ya colocamos: 7 (solo C) + 4 (P∩C∩R) + 2 (C∩R solo) = 13. Entonces solo C y P = 19 − 13 = <strong>6</strong>.
                </p>
              ),
            },
            {
              label: "Paso 3 — Calcular «solo R»",
              content: (
                <p>
                  #(R) = 20 en total. Ya colocamos: 3 (P∩R solo) + 4 (triple) + 2 (C∩R solo) = 9. Entonces solo R = 20 − 9 = <strong>11 alumnos</strong>.
                </p>
              ),
            },
            {
              label: "Paso 4 — Calcular «solo P»",
              content: (
                <p>
                  #(P) = 15. Ya colocamos: 6 (P∩C solo) + 4 (triple) + 3 (P∩R solo) = 13. Entonces solo P = 15 − 13 = <strong>2</strong>.
                </p>
              ),
            },
            {
              label: "Paso 5 — Alumnos que no contestaron",
              content: (
                <p>
                  Total en P∪C∪R = 2+6+7+3+4+2+11 = <strong>35</strong>. Como se encuestaron 56: no contestaron = 56 − 35 = <strong>21 alumnos</strong>.
                </p>
              ),
            },
          ]}
        />
      </section>

      {/* Desempeño interactivo */}
      <CountingProblem />

      {/* Navigation */}
      <div className="mt-10 flex justify-between items-center pt-6 border-t border-neutral-200">
        <Link href="/unidad/1/operaciones" className="text-sm text-neutral-500 hover:text-neutral-700">
          ← Operaciones
        </Link>
        <Link
          href="/unidad/1/funciones"
          className="flex items-center gap-2 bg-unit1 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-unit1-dark transition-colors"
        >
          Continuar: Relaciones y Funciones →
        </Link>
      </div>
    </article>
  );
}
