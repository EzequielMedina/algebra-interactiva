import { create } from "zustand";
import { persist } from "zustand/middleware";

const TOPICS_PER_UNIT: Record<number, string[]> = {
  1: ["conjuntos", "operaciones", "conteo", "funciones"],
  2: ["proposiciones", "tablas-verdad", "tautologias"],
  3: ["matrices", "operaciones", "determinantes", "inversa"],
  4: ["sistemas", "cramer", "graficas"],
};

interface ProgressState {
  visitedTopics: Record<string, boolean>;
  completedExercises: Record<string, boolean>;
  lastVisited: string | null;

  markTopicVisited: (topic: string) => void;
  markExerciseCompleted: (exerciseId: string) => void;
  setLastVisited: (topic: string) => void;
  getUnitProgress: (unit: number) => number;
  getTotalCompleted: () => number;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      visitedTopics: {},
      completedExercises: {},
      lastVisited: null,

      markTopicVisited: (topic) =>
        set((s) => ({ visitedTopics: { ...s.visitedTopics, [topic]: true } })),

      markExerciseCompleted: (exerciseId) =>
        set((s) => ({ completedExercises: { ...s.completedExercises, [exerciseId]: true } })),

      setLastVisited: (topic) => set({ lastVisited: topic }),

      getUnitProgress: (unit) => {
        const topics = TOPICS_PER_UNIT[unit] ?? [];
        if (topics.length === 0) return 0;
        const visited = get().visitedTopics;
        const done = topics.filter((t) => visited[`u${unit}/${t}`]).length;
        return Math.round((done / topics.length) * 100);
      },

      getTotalCompleted: () => Object.values(get().completedExercises).filter(Boolean).length,
    }),
    {
      name: "algebra-progress",
      // Manejo seguro de localStorage (puede estar bloqueado en modo privado)
      storage: {
        getItem: (key) => {
          try {
            const val = localStorage.getItem(key);
            return val ? JSON.parse(val) : null;
          } catch {
            return null;
          }
        },
        setItem: (key, value) => {
          try {
            localStorage.setItem(key, JSON.stringify(value));
          } catch {
            /* modo privado: ignorar */
          }
        },
        removeItem: (key) => {
          try {
            localStorage.removeItem(key);
          } catch {
            /* noop */
          }
        },
      },
    }
  )
);
