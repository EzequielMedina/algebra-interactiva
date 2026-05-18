"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/store/progress";
import Definition from "@/components/math/Definition";
import Formula from "@/components/math/Formula";
import VennDiagram from "@/components/interactive/VennDiagram";
import ExerciseCard from "@/components/interactive/ExerciseCard";

export default function OperacionesPage() {
  const { markTopicVisited, setLastVisited } = useProgress();
  useEffect(() => {
    markTopicVisited("u1/operaciones");
    setLastVisited("u1/operaciones");
  }, [markTopicVisited, setLastVisited]);

  return (
    <article className="max-w-none">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-neutral-600">Inicio</Link>
        <span>›</span>
        <span className="text-unit1 font-medium">Unidad 1</span>
        <span>›</span>
        <span className="text-neutral-700">Operaciones con Conjuntos</span>
      </nav>

      <div className="mb-8">
        <span className="inline-block bg-unit1 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">Clase 1 — continuación</span>
        <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">Operaciones con Conjuntos</h1>
        <p className="text-neutral-500 text-sm">Complemento · Diferencia · Intersección · Unión · Propiedades</p>
      </div>

      <p className="text-neutral-700 leading-relaxed mb-8">
        En álgebra estudiamos operaciones y propiedades. En este caso, el "ente matemático" con el que operamos es el <strong>conjunto</strong>. Al realizar estas operaciones obtenemos como resultado otro conjunto cuyos elementos son del mismo tipo.
      </p>

      {/* 1. Complemento */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">1. Complemento</h2>

        <Definition type="definition" title="Complemento de A">
          Dado un conjunto A y el conjunto universal U, el <strong>complemento de A</strong> (denotado <strong>Aᶜ</strong> o <strong>Ā</strong>) es el conjunto formado por todos los elementos de U que <em>no</em> pertenecen a A.
        </Definition>

        <div className="my-3">
          <Formula math="A^c = \{x \;|\; x \in U \;\land\; x \notin A\}" block />
        </div>
      </section>

      {/* 2. Diferencia */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">2. Diferencia</h2>

        <Definition type="definition" title="Diferencia B − A">
          La <strong>diferencia B − A</strong> (también llamada complemento de A respecto de B) es el conjunto formado por todos los elementos de B que <em>no</em> pertenecen a A.
        </Definition>

        <div className="my-3">
          <Formula math="B - A = \{x \;|\; x \in B \;\land\; x \notin A\}" block />
        </div>

        <Definition type="example" title="Ejemplo">
          <p>Dados A = &#123;a, b, c&#125; y B = &#123;c, x&#125;:</p>
          <p className="font-mono text-sm mt-2">B − A = &#123;x&#125; &nbsp;&nbsp;&nbsp; A − B = &#123;a, b&#125;</p>
          <p className="text-sm text-neutral-600 mt-1">Nota: la diferencia <em>no es conmutativa</em>: B−A ≠ A−B en general.</p>
        </Definition>
      </section>

      {/* 3. Intersección */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">3. Intersección</h2>

        <Definition type="definition" title="Intersección A ∩ B">
          La <strong>intersección</strong> de A y B es el conjunto formado por todos los elementos <em>comunes</em> a A y a B.
        </Definition>

        <div className="my-3">
          <Formula math="A \cap B = \{x \;|\; x \in A \;\land\; x \in B\}" block />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { case: "Disjuntos", desc: "A ∩ B = ∅", note: "No comparten elementos" },
            { case: "Parcial", desc: "A ∩ B = C", note: "Algunos elementos comunes" },
            { case: "Iguales", desc: "A ∩ B = A = B", note: "Todos los elementos comunes" },
            { case: "A ⊆ B", desc: "A ∩ B = A", note: "A está contenido en B" },
          ].map((c) => (
            <div key={c.case} className="bg-neutral-50 rounded-xl p-3 text-center text-sm">
              <p className="font-semibold text-neutral-700">{c.case}</p>
              <p className="font-mono text-unit1 font-bold my-1">{c.desc}</p>
              <p className="text-xs text-neutral-500">{c.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Unión */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">4. Unión</h2>

        <Definition type="definition" title="Unión A ∪ B">
          La <strong>unión</strong> de A y B es el conjunto formado por <em>todos</em> los elementos de A y <em>todos</em> los de B.
        </Definition>

        <div className="my-3">
          <Formula math="A \cup B = \{x \;|\; x \in A \;\lor\; x \in B\}" block />
        </div>

        <Definition type="example" title="Ejemplo">
          <p>Dados A = &#123;1,2,3,4,6,7,8,9&#125; y B = &#123;5,6,7,8,10&#125;:</p>
          <p className="font-mono text-sm mt-2">A ∪ B = &#123;1,2,3,4,5,6,7,8,9,10&#125;</p>
          <p className="text-xs text-neutral-500 mt-1">Los elementos repetidos no se listan dos veces.</p>
        </Definition>
      </section>

      {/* Venn Diagram interactivo */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Diagrama de Venn — Interactivo</h2>
        <p className="text-neutral-600 text-sm mb-4">
          Hacé clic en cualquier operación para ver qué región se resalta y cuál es el conjunto resultado. Podés editar los conjuntos A y B con tus propios valores.
        </p>

        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <VennDiagram
            defaultA="1, 2, 3, 4, 5"
            defaultB="4, 5, 6, 7"
            title="A = {1,2,3,4,5}   B = {4,5,6,7}"
          />
        </div>
      </section>

      {/* Propiedades */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">5. Propiedades de las Operaciones</h2>

        <div className="space-y-3">
          {[
            { name: "Involución", formula: "\\overline{\\overline{A}} = A", desc: "El complemento del complemento de A es A." },
            { name: "Idempotencia", formula: "A \\cup A = A \\quad A \\cap A = A", desc: "Operar un conjunto consigo mismo no cambia nada." },
            { name: "Conmutatividad", formula: "A \\cup B = B \\cup A \\quad A \\cap B = B \\cap A", desc: "El orden de los conjuntos no altera el resultado (en unión e intersección)." },
            { name: "Asociatividad", formula: "(A \\cup B) \\cup C = A \\cup (B \\cup C)", desc: "El agrupamiento no altera el resultado." },
            { name: "Distributividad", formula: "A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)", desc: "A diferencia de los números, aquí ambas distributivas son válidas (∩ sobre ∪ y ∪ sobre ∩)." },
          ].map((p) => (
            <div key={p.name} className="flex gap-4 items-start bg-neutral-50 rounded-xl px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-wide text-neutral-400 w-28 flex-shrink-0 pt-0.5">{p.name}</span>
              <div>
                <Formula math={p.formula} />
                <p className="text-xs text-neutral-600 mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border-2 border-unit1 bg-unit1-light p-4">
          <p className="font-bold text-neutral-800 mb-2">⭐ Leyes de De Morgan</p>
          <div className="space-y-2 font-mono text-sm">
            <p><Formula math="\overline{A \cup B} = \overline{A} \cap \overline{B}" /> — El complemento de una unión es la intersección de los complementos.</p>
            <p><Formula math="\overline{A \cap B} = \overline{A} \cup \overline{B}" /> — El complemento de una intersección es la unión de los complementos.</p>
          </div>
        </div>
      </section>

      {/* Desempeño 04 */}
      <ExerciseCard
        number="04"
        title="Operaciones con conjuntos — Identificar operaciones"
        exercise={{
          type: "choice",
          question: "Dados U = {0,1,2,3,4,5,6,7,8,9}, A = {1,2,3,4,5} y B = {4,5,6,7}. ¿Cuál de estas afirmaciones es CORRECTA?",
          options: [
            {
              label: "A ∩ B = {4, 5} y A ∪ B = {1,2,3,4,5,6,7}",
              correct: true,
              explanation: "Correcto. A ∩ B contiene los elementos comunes (4 y 5). A ∪ B contiene todos los elementos de ambos conjuntos sin repetir.",
            },
            {
              label: "A ∩ B = {1,2,3,6,7} y A ∪ B = {4,5}",
              correct: false,
              explanation: "Estás confundiendo las operaciones. {4,5} es la intersección (elementos comunes) y {1,2,3,4,5,6,7} es la unión.",
            },
            {
              label: "A − B = {4,5} y B − A = {1,2,3}",
              correct: false,
              explanation: "A − B son los elementos de A que NO están en B = {1,2,3}. B − A son los elementos de B que NO están en A = {6,7}.",
            },
            {
              label: "Aᶜ = {4,5,6,7,8,9} respecto de U",
              correct: false,
              explanation: "Aᶜ = U − A = {0,1,2,3,4,5,6,7,8,9} − {1,2,3,4,5} = {0,6,7,8,9}. Falta el 0 y sobra el 4 y 5.",
            },
          ],
        }}
      />

      {/* Navigation */}
      <div className="mt-10 flex justify-between items-center pt-6 border-t border-neutral-200">
        <Link href="/unidad/1/conjuntos" className="text-sm text-neutral-500 hover:text-neutral-700">
          ← Conjuntos
        </Link>
        <Link
          href="/unidad/1/conteo"
          className="flex items-center gap-2 bg-unit1 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-unit1-dark transition-colors"
        >
          Continuar: Problemas de Conteo →
        </Link>
      </div>
    </article>
  );
}
