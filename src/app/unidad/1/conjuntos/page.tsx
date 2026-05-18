"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/store/progress";
import Definition from "@/components/math/Definition";
import Formula from "@/components/math/Formula";
import ExerciseCard from "@/components/interactive/ExerciseCard";

export default function ConjuntosPage() {
  const { markTopicVisited, setLastVisited } = useProgress();
  useEffect(() => {
    markTopicVisited("u1/conjuntos");
    setLastVisited("u1/conjuntos");
  }, [markTopicVisited, setLastVisited]);

  return (
    <article className="prose-custom max-w-none">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-neutral-600">Inicio</Link>
        <span>›</span>
        <span className="text-unit1 font-medium">Unidad 1</span>
        <span>›</span>
        <span className="text-neutral-700">Conjuntos</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block bg-unit1 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">Clase 1</span>
        <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">Álgebra de Conjuntos</h1>
        <p className="text-neutral-500 text-sm">Conceptos primitivos · Pertenencia · Inclusión · Formas de definir</p>
      </div>

      {/* Preguntas disparadoras */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {[
          "¿Qué es un conjunto? ¿Tiene relación con la realidad?",
          "¿Cómo se pueden definir los conjuntos?",
          "¿Es lo mismo pertenencia que inclusión?",
          "¿Es importante la expresión simbólica?",
        ].map((q) => (
          <div key={q} className="bg-unit1-light rounded-xl px-4 py-3 text-sm text-unit1-dark font-medium">
            💭 {q}
          </div>
        ))}
      </div>

      {/* Introducción */}
      <section className="mb-8">
        <p className="text-neutral-700 leading-relaxed mb-3">
          La noción de conjunto es un concepto natural que manejamos casi sin darnos cuenta en las acciones más simples de la vida cotidiana. De chicos, por ejemplo, armamos grupos de juguetes, los agrupamos según distintas características —un conjunto de autos y uno de juguetes rojos—. Así, descubrimos que algunos cumplen varias propiedades a la vez, y los ponemos en ambos conjuntos.
        </p>
        <p className="text-neutral-700 leading-relaxed">
          A lo largo de esta clase nos ocuparemos de dar una clara explicación de estos temas y darle la formalidad matemática que necesitan.
        </p>
      </section>

      {/* 1. Conjuntos y elementos */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">1. Conjuntos y Elementos</h2>

        <Definition type="definition" title="Conjunto">
          Un <strong>conjunto</strong> es una <em>colección bien definida</em> de objetos, los cuales reciben el nombre de <strong>elementos</strong> del conjunto. La expresión "bien definida" significa que, dado cualquier objeto, puede determinarse si pertenece o no al conjunto.
        </Definition>

        <p className="text-neutral-700 leading-relaxed my-3">
          Los conjuntos se denotan con letras mayúsculas (A, B, C…) y sus elementos con minúsculas (a, b, c…). Un conjunto puede tener una cantidad <strong>finita</strong> o <strong>infinita</strong> de elementos.
        </p>
      </section>

      {/* 2. Pertenencia e Inclusión */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">2. Pertenencia e Inclusión</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Definition type="definition" title="Pertenencia (∈)">
            Se da <strong>entre un elemento y un conjunto</strong>. <br />
            <Formula math="a \in A" /> se lee: "el elemento <em>a</em> pertenece al conjunto <em>A</em>". <br />
            <Formula math="a \notin A" /> indica que <em>a</em> no pertenece a <em>A</em>.
          </Definition>

          <Definition type="definition" title="Inclusión (⊆)">
            Se da <strong>entre dos conjuntos</strong>. <br />
            <Formula math="A \subseteq B" /> significa que todo elemento de <em>A</em> también pertenece a <em>B</em>. <br />
            Si además existe algún elemento en B que no está en A, decimos que A está <em>estrictamente incluido</em>: <Formula math="A \subset B" />.
          </Definition>
        </div>

        <Definition type="warning">
          <strong>¡Mucho cuidado!</strong> La relación de pertenencia se da entre un <em>elemento</em> y un <em>conjunto</em>. La relación de inclusión se da entre dos <em>conjuntos</em>. Son conceptos distintos.
        </Definition>

        <Definition type="example" title="Ejemplo">
          <p className="mb-2">Dado el conjunto <strong>A = &#123;1, 3, 5&#125;</strong>, se puede afirmar que:</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-sm mt-2">
            <span><Formula math="1 \in A" /> ✓ (el 1 es elemento de A)</span>
            <span><Formula math="4 \notin A" /> ✓ (el 4 no está en A)</span>
            <span><Formula math="\{1,3\} \subseteq A" /> ✓ (inclusión)</span>
            <span><Formula math="\{1,2\} \not\subseteq A" /> ✓ (el 2 no está en A)</span>
          </div>
        </Definition>

        <Definition type="warning" title="Caso especial">
          <p>Dado el conjunto <strong>A = &#123;1, &#123;3&#125;, 5&#125;</strong>, el elemento <em>&#123;3&#125;</em> —entre llaves— está definido como elemento de A (no es el número 3, es el conjunto &#123;3&#125;). Por lo tanto:</p>
          <p className="font-mono mt-1"><Formula math="\{3\} \in A" /> (pertenencia, porque así está definido)</p>
        </Definition>
      </section>

      {/* 3. Formas de definir */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">3. Formas de Definir un Conjunto</h2>

        <div className="space-y-4">
          <Definition type="property" title="Por Extensión (enumeración)">
            Se listan todos los elementos del conjunto entre llaves, separados por comas.
            <p className="font-mono text-sm mt-2">V = &#123; a, e, i, o, u &#125;</p>
            <p className="text-sm text-neutral-600 mt-1">Se lee: "conjunto V formado por los elementos a, e, i, o, u".</p>
          </Definition>

          <Definition type="property" title="Por Comprensión (propiedad)">
            Se describe una propiedad característica de todos los elementos.
            <p className="font-mono text-sm mt-2">V = &#123; x / x es una vocal del alfabeto español &#125;</p>
            <p className="text-sm text-neutral-600 mt-1">Se lee: "conjunto V formado por todos los x tales que x es una vocal".</p>
          </Definition>

          <Definition type="property" title="Gráficamente (Diagrama de Venn)">
            Se encierra a los elementos en una figura cerrada (generalmente una elipse o rectángulo).
          </Definition>
        </div>

        <div className="mt-4 bg-neutral-50 rounded-xl p-4 overflow-x-auto">
          <table className="text-sm w-full">
            <thead>
              <tr className="text-neutral-500 text-xs uppercase">
                <th className="text-left pb-2">Por extensión</th>
                <th className="text-left pb-2">Por comprensión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 font-mono">
              {[
                ["A = { a, e, i, o, u }", "A = { x | x es una vocal }"],
                ["B = { 0, 2, 4, 6, 8 }", "B = { x | x ∈ ℕ₀, x es par, x < 10 }"],
                ["C = { 1, 3, 5, 7, 9 }", "C = { x | x es impar y 0 < x < 10 }"],
                ["P = { 1, 2, 4, 8, 16, … }", "P = { x | x = 2ⁿ, n ∈ ℕ₀ }"],
              ].map(([ext, comp]) => (
                <tr key={ext} className="text-xs">
                  <td className="py-1.5 pr-4">{ext}</td>
                  <td className="py-1.5">{comp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Definition type="warning">
          En la noción de conjunto, el <strong>orden</strong> y la <strong>repetición</strong> de elementos no afectan al conjunto. Así: &#123;a, e, i, i, o, u&#125; = &#123;u, o, i, e, a&#125; = V.
        </Definition>
      </section>

      {/* 4. Conjuntos especiales */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">4. Conjuntos Especiales</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              symbol: "∅",
              name: "Conjunto vacío",
              desc: "No contiene ningún elemento. Se denota ∅ o { }.",
              color: "border-unit1 bg-unit1-light",
            },
            {
              symbol: "{ x }",
              name: "Conjunto unitario",
              desc: "Contiene exactamente un solo elemento.",
              color: "border-unit2 bg-unit2-light",
            },
            {
              symbol: "U",
              name: "Conjunto universal",
              desc: "Contiene todos los objetos bajo estudio. Depende del contexto.",
              color: "border-unit3 bg-unit3-light",
            },
          ].map((item) => (
            <div key={item.name} className={`rounded-xl border-2 ${item.color} p-4 text-center`}>
              <p className="text-3xl font-mono mb-2">{item.symbol}</p>
              <p className="font-semibold text-sm text-neutral-800">{item.name}</p>
              <p className="text-xs text-neutral-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <p className="text-neutral-700 mt-4 text-sm leading-relaxed">
          Conjuntos numéricos importantes: <Formula math="\mathbb{N}" /> (naturales), <Formula math="\mathbb{Z}" /> (enteros), <Formula math="\mathbb{Q}" /> (racionales), <Formula math="\mathbb{R}" /> (reales).
        </p>
      </section>

      {/* 5. Igualdad */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">5. Igualdad de Conjuntos</h2>

        <Definition type="theorem" title="Principio de extensión">
          Dados dos conjuntos A y B, se dice que son <strong>iguales</strong> (A = B) si y solamente si están formados por los <strong>mismos elementos</strong>.
        </Definition>

        <Definition type="example" title="Ejemplo N°3">
          <p>Dado A = &#123;1, 2, 3&#125;, los siguientes conjuntos son iguales a A:</p>
          <ul className="font-mono text-sm mt-2 space-y-1">
            <li>B = &#123;2, 3, 1, 1&#125; (repetición no importa)</li>
            <li>C = &#123; x | x ∈ ℕ y x &lt; 4 &#125; (comprensión)</li>
            <li>D = &#123; x | (x=1) ó (x=2) ó (x=3) &#125;</li>
          </ul>
        </Definition>
      </section>

      {/* Desempeño 01 */}
      <ExerciseCard
        number="01"
        title="¿Está bien definido? ¿Es finito o infinito?"
        exercise={{
          type: "truefalse",
          instructions: "Indicá si las siguientes expresiones definen un conjunto válido (bien definido). Marcá Verdadero si es un conjunto válido, Falso si no lo es.",
          items: [
            {
              statement: '"Los actuales habitantes de la Luna" define un conjunto válido.',
              correct: true,
              explanation: "Sí, es un conjunto válido (y vacío): dado cualquier persona, podemos decir si vive en la Luna o no. Actualmente nadie lo hace, así que es el conjunto vacío.",
            },
            {
              statement: '"Los hombres altos" define un conjunto bien definido.',
              correct: false,
              explanation: "No está bien definido: no podemos determinar con precisión si una persona es 'alta' o no. El criterio es ambiguo.",
            },
            {
              statement: '"Los algoritmos de exactamente cuatro instrucciones" define un conjunto válido.',
              correct: true,
              explanation: "Sí, dado cualquier algoritmo podemos contar exactamente cuántas instrucciones tiene. El conjunto está bien definido.",
            },
            {
              statement: '"Las estrellas brillantes del cielo austral" define un conjunto bien definido.',
              correct: false,
              explanation: '"Brillantes" es un término relativo y ambiguo. No podemos determinar si una estrella específica pertenece o no al conjunto.',
            },
          ],
        }}
      />

      {/* Desempeño 03 */}
      <ExerciseCard
        number="03"
        title="¿Cuáles conjuntos son iguales?"
        exercise={{
          type: "choice",
          question: "Dados los conjuntos: A = {x ∈ ℕ | x es primo y x < 10}, B = {x ∈ ℤ | x < 8}, C = {1,2,3,4,5,6,7}, D = {1,7,5,3,1}, E = {2,3,4,5,6,1,7}. ¿Qué pares son iguales?",
          options: [
            {
              label: "C, D y E son iguales entre sí",
              correct: false,
              explanation: "D = {1, 3, 5, 7} (sin repetición). No es igual a C = {1,2,3,4,5,6,7} ni a E.",
            },
            {
              label: "C y E son iguales entre sí",
              correct: true,
              explanation: "C = {1,2,3,4,5,6,7} y E = {2,3,4,5,6,1,7} = {1,2,3,4,5,6,7}. Son el mismo conjunto (el orden no importa).",
            },
            {
              label: "A y D son iguales entre sí",
              correct: false,
              explanation: "A = {2,3,5,7} (los primos menores que 10). D = {1,3,5,7}. No son iguales: A contiene el 2 y no el 1, D contiene el 1 y no el 2.",
            },
            {
              label: "Todos son iguales",
              correct: false,
              explanation: "No. B es un conjunto infinito (todos los enteros menores que 8), mientras que los demás son finitos.",
            },
          ],
        }}
      />

      {/* Navigation */}
      <div className="mt-10 flex justify-between items-center pt-6 border-t border-neutral-200">
        <span className="text-sm text-neutral-400">Clase 1 completa</span>
        <Link
          href="/unidad/1/operaciones"
          className="flex items-center gap-2 bg-unit1 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-unit1-dark transition-colors"
        >
          Continuar: Operaciones con conjuntos →
        </Link>
      </div>
    </article>
  );
}
