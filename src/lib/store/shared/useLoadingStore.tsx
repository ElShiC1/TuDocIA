// store/useRequestProgress.ts
import { create } from "zustand";

interface RequestProgressState {
  loading: boolean;
  progress: number;
  start: number;
  startRequest: () => void;
  finishRequest: () => void;
}

export const useLoadingStore = create<RequestProgressState>((set) => ({
  loading: false,
  progress: 0,
  start: 0,

  startRequest: () => {
    set({ loading: true, progress: 0, start: performance.now() });

    const timer = setInterval(() => {
      set((state) => {
        if (!state.loading) {
          clearInterval(timer);
          return state;
        }
        // simula que sube hasta 90% mientras espera
        const elapsed = performance.now() - state.start;
        const progress = Math.min(90, (elapsed / 3000) * 100);
        return { ...state, progress };
      });
    }, 100);
  },

  finishRequest: () => {
    set({ progress: 100, loading: false });
    setTimeout(() => set({ progress: 0 }), 500);
  },
}));
