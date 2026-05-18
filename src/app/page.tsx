"use client";

import UnitCard from "@/components/ui/UnitCard";
import { useProgress } from "@/lib/store/progress";

const UNITS = [
  {
    unit: 1,
    title: "Conjuntos y Funciones",
    description:
      "El lenguaje fundamental de la Matemática. Aprendé a definir, operar y relacionar conjuntos.",
    topics: [
      "Conjuntos: pertenencia, inclusión e igualdad",
      "Operaciones: unión, intersección, diferencia",
      "Problemas de conteo (inclusión-exclusión)",
      "Relaciones y funciones",
    ],
    href: "/unidad/1/conjuntos",
    color: {
      bg:     "bg-unit1-light",
      border: "border-unit1",
      text:   "text-unit1",
      badge:  "bg-unit1 text-white",
      bar:    "bg-unit1",
      button: "bg-unit1 hover:bg-unit1-dark",
    },
  },
  {
    unit: 2,
    title: "Álgebra de Proposiciones",
    description:
      "El lenguaje de la lógica. Aprendé a construir y evaluar fórmulas proposicionales.",
    topics: [
      "Conectores lógicos: ¬, ∧, ∨, →, ↔",
      "Fórmulas bien formadas y tablas de verdad",
      "Tautologías, contradicciones y contingencias",
      "Implicación y equivalencia lógica",
    ],
    href: "/unidad/2/proposiciones",
    color: {
      bg:     "bg-unit2-light",
      border: "border-unit2",
      text:   "text-unit2",
      badge:  "bg-unit2 text-white",
      bar:    "bg-unit2",
      button: "bg-unit2 hover:bg-unit2-dark",
    },
  },
  {
    unit: 3,
    title: "Matrices y Determinantes",
    description:
      "Estructuras algebraicas rectangulares. Operaciones, determinantes e inversas paso a paso.",
    topics: [
      "Tipos de matrices y operaciones básicas",
      "Multiplicación matricial y propiedades",
      "Determinantes: Sarrus, Chio, propiedades",
      "Inversa por Gauss-Jordan",
    ],
    href: "/unidad/3/matrices",
    color: {
      bg:     "bg-unit3-light",
      border: "border-unit3",
      text:   "text-unit3",
      badge:  "bg-unit3 text-white",
      bar:    "bg-unit3",
      button: "bg-unit3 hover:bg-unit3-dark",
    },
  },
  {
    unit: 4,
    title: "Sistemas de Ecuaciones",
    description:
      "Resolver sistemas de ecuaciones lineales con múltiples métodos y visualización geométrica.",
    topics: [
      "Clasificación: compatible, incompatible, indeterminado",
      "Método de Gauss (escalonamiento)",
      "Regla de Cramer",
      "Interpretación geométrica",
    ],
    href: "/unidad/4/sistemas",
    color: {
      bg:     "bg-unit4-light",
      border: "border-unit4",
      text:   "text-unit4",
      badge:  "bg-unit4 text-white",
      bar:    "bg-unit4",
      button: "bg-unit4 hover:bg-unit4-dark",
    },
  },
];

export default function Home() {
  const { getUnitProgress, getTotalCompleted } = useProgress();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-unit1-light text-unit1 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          <span>✦</span> Plataforma de Álgebra Interactiva
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4 leading-tight">
          Aprendé Álgebra<br />
          <span className="text-unit1">de forma interactiva</span>
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-6">
          Contenido visual, ejercicios con feedback inmediato y explicaciones
          paso a paso. Podés avanzar a tu ritmo, sin necesidad de registrarte.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 text-sm text-neutral-500">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-neutral-900">4</span>
            <span>unidades</span>
          </div>
          <div className="w-px bg-neutral-200" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-neutral-900">30+</span>
            <span>ejercicios</span>
          </div>
          <div className="w-px bg-neutral-200" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-neutral-900">{getTotalCompleted()}</span>
            <span>completados</span>
          </div>
        </div>
      </section>

      {/* Unidades */}
      <section>
        <h2 className="text-lg font-semibold text-neutral-700 mb-6">Unidades del curso</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {UNITS.map((u) => (
            <UnitCard
              key={u.unit}
              {...u}
              progress={getUnitProgress(u.unit)}
            />
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="mt-16 bg-neutral-50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-6 text-center">¿Cómo funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            {
              icon: "📖",
              title: "Leé la teoría",
              desc: "Definiciones claras con ejemplos del mundo real y notación matemática correcta.",
            },
            {
              icon: "⚡",
              title: "Interactuá",
              desc: "Diagramas de Venn, tablas de verdad y matrices que podés manipular directamente.",
            },
            {
              icon: "✅",
              title: "Practicá",
              desc: "Desempeños interactivos con feedback inmediato. Tu progreso se guarda automáticamente.",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-semibold text-neutral-900">{item.title}</h3>
              <p className="text-sm text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
