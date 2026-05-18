"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/store/progress";
import Definition from "@/components/math/Definition";
import Formula from "@/components/math/Formula";
import ExerciseCard from "@/components/interactive/ExerciseCard";

/* ── Arrow diagram for relations ─────────────────────────────────────────── */
interface Pair { from: string; to: string }

interface ArrowDiagramProps {
  title: string;
  domainItems: string[];
  codomainItems: string[];
  pairs: Pair[];
  isFunction: boolean;
  explanation: string;
}

function ArrowDiagram({ title, domainItems, codomainItems, pairs, isFunction, explanation }: ArrowDiagramProps) {
  const [revealed, setRevealed] = useState(false);

  const W = 260, H = Math.max(domainItems.length, codomainItems.length) * 44 + 40;
  const leftX = 55, rightX = 205;
  const getY = (items: string[], item: string) => {
    const i = items.indexOf(item);
    return 30 + i * 44;
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4">
      <p className="font-semibold text-sm text-neutral-700 mb-3">{title}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-xs">
        {/* Domain oval */}
        <ellipse cx={leftX} cy={H / 2} rx={40} ry={H / 2 - 8} fill="#EFF6FF" stroke="#3B82F6" strokeWidth={1.5} />
        <text x={leftX} y={H - 4} textAnchor="middle" fontSize={11} fill="#3B82F6" fontWeight="600">A</text>

        {/* Codomain oval */}
        <ellipse cx={rightX} cy={H / 2} rx={40} ry={H / 2 - 8} fill="#F5F3FF" stroke="#8B5CF6" strokeWidth={1.5} />
        <text x={rightX} y={H - 4} textAnchor="middle" fontSize={11} fill="#8B5CF6" fontWeight="600">B</text>

        {/* Domain elements */}
        {domainItems.map((el) => (
          <text key={el} x={leftX} y={getY(domainItems, el) + 5} textAnchor="middle" fontSize={12} fill="#1E40AF" fontWeight="600">{el}</text>
        ))}

        {/* Codomain elements */}
        {codomainItems.map((el) => (
          <text key={el} x={rightX} y={getY(codomainItems, el) + 5} textAnchor="middle" fontSize={12} fill="#5B21B6" fontWeight="600">{el}</text>
        ))}

        {/* Arrows */}
        <defs>
          <marker id={`arr-${title}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#6B7280" />
          </marker>
        </defs>
        {pairs.map((p, i) => {
          const x1 = leftX + 38, y1 = getY(domainItems, p.from);
          const x2 = rightX - 38, y2 = getY(codomainItems, p.to);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#6B7280" strokeWidth={1.5}
              markerEnd={`url(#arr-${title})`} />
          );
        })}
      </svg>

      <button
        onClick={() => setRevealed(!revealed)}
        className={`mt-3 w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
          revealed
            ? isFunction
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
        }`}
      >
        {revealed
          ? isFunction ? "✓ Es función" : "✗ No es función"
          : "¿Es función? →"}
      </button>
      {revealed && (
        <p className="text-xs text-neutral-600 mt-2 bg-neutral-50 rounded-lg p-2">{explanation}</p>
      )}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function FuncionesPage() {
  const { markTopicVisited, setLastVisited } = useProgress();
  useEffect(() => {
    markTopicVisited("u1/funciones");
    setLastVisited("u1/funciones");
  }, [markTopicVisited, setLastVisited]);

  return (
    <article className="max-w-none">
      <nav className="text-xs text-neutral-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-neutral-600">Inicio</Link>
        <span>›</span>
        <span className="text-unit1 font-medium">Unidad 1</span>
        <span>›</span>
        <span className="text-neutral-700">Relaciones y Funciones</span>
      </nav>

      <div className="mb-8">
        <span className="inline-block bg-unit1 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">Clases 2 y 3</span>
        <h1 className="text-3xl font-extrabold text-neutral-900 mb-2">Relaciones y Funciones</h1>
        <p className="text-neutral-500 text-sm">Par ordenado · Producto cartesiano · Relaciones · Funciones · Gráficos</p>
      </div>

      {/* Par ordenado */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">1. Par Ordenado</h2>

        <Definition type="definition" title="Par Ordenado">
          Dados dos objetos a y b, el <strong>par ordenado (a, b)</strong> es su arreglo donde <em>a</em> es el primer componente y <em>b</em> el segundo.
          <Formula math="(a, b) \neq (b, a) \text{ en general}" block />
          <Formula math="(a, b) = (c, d) \iff a = c \;\land\; b = d" block />
        </Definition>

        <Definition type="warning">
          A diferencia de los conjuntos, en los pares ordenados el <strong>orden sí importa</strong>: (3, 5) ≠ (5, 3).
        </Definition>
      </section>

      {/* Producto cartesiano */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">2. Producto Cartesiano</h2>

        <Definition type="definition" title="Producto Cartesiano A × B">
          Dados dos conjuntos no vacíos A y B, el <strong>producto cartesiano A × B</strong> es el conjunto de todos los pares ordenados con el primer componente en A y el segundo en B.
          <Formula math="A \times B = \{(a,b) \;|\; a \in A \;\land\; b \in B\}" block />
        </Definition>

        <Definition type="example" title="Ejemplo">
          <p>Si A = &#123;1, 2, 3&#125; y B = &#123;a, b&#125;:</p>
          <p className="font-mono text-sm mt-2">
            A × B = &#123;(1,a), (1,b), (2,a), (2,b), (3,a), (3,b)&#125;
          </p>
          <p className="text-sm text-neutral-600 mt-1">#(A × B) = #(A) · #(B) = 3 · 2 = 6</p>
        </Definition>

        <Definition type="property">
          El producto cartesiano es una operación <strong>no conmutativa</strong>: en general, A × B ≠ B × A (los pares ordenados invierten el orden).
        </Definition>
      </section>

      {/* Relaciones */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">3. Relaciones entre Conjuntos</h2>

        <Definition type="definition" title="Relación R: A → B">
          Una <strong>relación R de A en B</strong> es un subconjunto de A × B formado por los pares ordenados que satisfacen una determinada propiedad.
          <p className="text-sm mt-2">Se denota: <code>R: A → B / … propiedad …</code></p>
        </Definition>

        <Definition type="example" title="Ejemplo — países y continentes">
          <p>Sean A = &#123;Brasil, Argentina, India, España&#125; y B = &#123;América, Europa, África&#125;.</p>
          <p className="mt-2">R: A → B / "es un país de"</p>
          <p className="font-mono text-sm mt-1">R = &#123;(Brasil, América), (Argentina, América), (España, Europa)&#125;</p>
        </Definition>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Definition type="definition" title="Dominio (Dm)">
            El <strong>dominio</strong> de R son todos los elementos de A que participan en algún par de R.
            <Formula math="Dm_R = \{a \in A \;|\; \exists\, b \in B : (a,b) \in R\}" block />
          </Definition>
          <Definition type="definition" title="Imagen (Im)">
            La <strong>imagen</strong> de R son todos los elementos de B que aparecen como segunda componente en algún par de R.
            <Formula math="Im_R = \{b \in B \;|\; \exists\, a \in A : (a,b) \in R\}" block />
          </Definition>
        </div>
      </section>

      {/* Funciones */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">4. Funciones</h2>

        <Definition type="definition" title="Función f: A → B">
          Una <strong>función</strong> es una relación que verifica que <em>a cada elemento del conjunto de partida A le corresponde un único elemento del conjunto de llegada B</em>.
        </Definition>

        <p className="text-neutral-700 leading-relaxed mt-3 mb-4">
          Para que una relación sea función, deben cumplirse dos condiciones en el conjunto de partida:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-semibold text-green-800 mb-2">✓ Condición 1 — Todo elemento relacionado</p>
            <p className="text-sm text-green-700">Cada elemento de A debe tener al menos una imagen en B. No puede quedar ningún elemento "sin flecha".</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="font-semibold text-green-800 mb-2">✓ Condición 2 — Una única imagen</p>
            <p className="text-sm text-green-700">Cada elemento de A debe tener exactamente una imagen. No pueden partir dos o más flechas del mismo elemento.</p>
          </div>
        </div>

        <Definition type="warning">
          En una <em>relación</em>, un elemento de A puede tener varias imágenes o ninguna. En una <em>función</em>, debe tener exactamente <strong>una</strong>.
        </Definition>
      </section>

      {/* Diagramas interactivos */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">5. ¿Es función? — Diagramas interactivos</h2>
        <p className="text-neutral-600 text-sm mb-4">
          Para cada diagrama, decidí si la relación representada es una función o no. Hacé clic para ver la respuesta y la explicación.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ArrowDiagram
            title="Relación 1"
            domainItems={["1", "2", "3"]}
            codomainItems={["a", "b", "c"]}
            pairs={[{ from: "1", to: "a" }, { from: "2", to: "b" }, { from: "3", to: "c" }]}
            isFunction={true}
            explanation="Cada elemento de A tiene exactamente una imagen en B. Es una función biyectiva (uno a uno)."
          />
          <ArrowDiagram
            title="Relación 2"
            domainItems={["1", "2", "3"]}
            codomainItems={["a", "b", "c"]}
            pairs={[{ from: "1", to: "a" }, { from: "1", to: "b" }, { from: "2", to: "c" }, { from: "3", to: "a" }]}
            isFunction={false}
            explanation="El elemento 1 tiene dos imágenes (a y b). Esto viola la condición de unicidad. No es función."
          />
          <ArrowDiagram
            title="Relación 3"
            domainItems={["1", "2", "3"]}
            codomainItems={["a", "b", "c"]}
            pairs={[{ from: "1", to: "a" }, { from: "2", to: "a" }, { from: "3", to: "a" }]}
            isFunction={true}
            explanation="Varios elementos de A pueden tener la misma imagen. Lo importante es que cada uno tiene exactamente una. Es una función constante."
          />
          <ArrowDiagram
            title="Relación 4"
            domainItems={["1", "2", "3"]}
            codomainItems={["a", "b", "c"]}
            pairs={[{ from: "1", to: "a" }, { from: "3", to: "c" }]}
            isFunction={false}
            explanation="El elemento 2 no tiene imagen. La función no está definida para todo el dominio A. No es función (con este conjunto de partida)."
          />
          <ArrowDiagram
            title="Relación 5"
            domainItems={["1", "2"]}
            codomainItems={["a", "b", "c"]}
            pairs={[{ from: "1", to: "b" }, { from: "2", to: "b" }]}
            isFunction={true}
            explanation="Ambos elementos tienen exactamente una imagen (b). Que no todos los elementos del codominio sean imagen no afecta. Es una función."
          />
          <ArrowDiagram
            title="Relación 6"
            domainItems={["1", "2", "3"]}
            codomainItems={["a", "b"]}
            pairs={[{ from: "1", to: "a" }, { from: "2", to: "b" }, { from: "2", to: "a" }, { from: "3", to: "b" }]}
            isFunction={false}
            explanation="El elemento 2 tiene dos imágenes (b y a). Viola la condición de unicidad. No es función."
          />
        </div>
      </section>

      {/* Interpretación de gráficos */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-4">6. Variable Discreta vs. Continua</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Definition type="definition" title="Variable discreta">
            Solo puede tomar valores dentro de un conjunto numerable. <strong>Entre dos valores sucesivos no hay valores intermedios</strong>.
            <p className="text-sm mt-2 text-neutral-600">Ejemplo: cantidad de televisores (no existe ½ televisor). Se grafica con puntos aislados.</p>
          </Definition>
          <Definition type="definition" title="Variable continua">
            Puede tomar cualquier valor dentro de un intervalo. <strong>Entre dos valores siempre existe otro valor intermedio</strong>.
            <p className="text-sm mt-2 text-neutral-600">Ejemplo: temperatura corporal, peso, tiempo. Se grafica con una línea continua.</p>
          </Definition>
        </div>
      </section>

      {/* Ejercicio */}
      <ExerciseCard
        number="11"
        title="Relación divisor — ¿es función?"
        exercise={{
          type: "choice",
          question: "Dados M = {x ∈ ℤ | -1 < x ≤ 3} = {0, 1, 2, 3} y P = {x ∈ ℤ | 3 < x ≤ 9} = {4, 5, 6, 7, 8, 9}. La relación R: M → P / 'es divisor de' tiene como conjunto relación R = {(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(2,4),(2,6),(2,8),(3,6),(3,9)}. ¿Es R una función de M en P?",
          options: [
            {
              label: "Sí, es función porque todo elemento de M tiene imagen en P",
              correct: false,
              explanation: "El elemento 0 no tiene imagen en P (0 no divide a ningún número positivo de esa forma). Además el 1 tiene múltiples imágenes.",
            },
            {
              label: "No es función: el elemento 0 no tiene imagen y el 1 tiene varias imágenes",
              correct: true,
              explanation: "Exacto. Para ser función, (1) todo elemento del dominio debe tener imagen y (2) cada uno debe tener exactamente una. Aquí ambas condiciones fallan.",
            },
            {
              label: "Es función porque el conjunto relación está bien definido",
              correct: false,
              explanation: "Que la relación esté bien definida no implica que sea función. El 1 está relacionado con 4, 5, 6, 7, 8 y 9 — son múltiples imágenes.",
            },
            {
              label: "No es función solo porque 0 no tiene imagen",
              correct: false,
              explanation: "También falla la condición de unicidad: el 1 tiene 6 imágenes distintas, el 2 tiene 3 y el 3 tiene 2.",
            },
          ],
        }}
      />

      {/* Navigation */}
      <div className="mt-10 flex justify-between items-center pt-6 border-t border-neutral-200">
        <Link href="/unidad/1/conteo" className="text-sm text-neutral-500 hover:text-neutral-700">
          ← Conteo
        </Link>
        <Link
          href="/unidad/2/proposiciones"
          className="flex items-center gap-2 bg-unit2 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-unit2-dark transition-colors"
        >
          Siguiente unidad: Álgebra de Proposiciones →
        </Link>
      </div>
    </article>
  );
}
