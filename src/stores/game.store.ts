import z from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Game } from "../types";
import { loadGames } from "../utils/services";

export type IGameStore = {
  status: boolean;
  games: Game[];
  loadGames: () => Promise<void>;
  message: string | null;
  isSubmitting: boolean;
  clearFormState: () => void;
  errors: z.ZodIssue[] | null;
};

const INIT_VALUES = {
  games: [],
  errors: null,
  status: false,
  message: null,
  isSubmitting: false,
};

export const useGameStore = create(
  persist<IGameStore>(
    (set) => ({
      ...INIT_VALUES,
      loadGames: async () => {
        set({ isSubmitting: true });
        try {
          const response = await loadGames();
          if (response.data) {
            set({ games: response.data });
          } else {
            set({ status: false, message: response.message });
          }
        } catch (error) {
          console.log(error);
          set({
            status: false,
            message: "Something went wrong. Please try again.",
          });
        } finally {
          set({ isSubmitting: false });
        }
      },
      clearFormState: () => set({ status: false, message: null, errors: null }),
    }),
    {
      name: "game-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
