import z from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Bet, LeaderboardEntry, User } from "../types";
import { loadBets, createBet, loadLeaderboard } from "../utils/services";
import { useAuthStore } from "./auth.store";

export type IBetStore = {
  status: boolean;
  bets: Bet[];
  leaderboard: LeaderboardEntry[];
  loadBets: () => Promise<void>;
  loadLeaderboard: () => Promise<void>;
  createBet: (payload: Partial<Bet>) => Promise<void>;
  message: string | null;
  isSubmitting: boolean;
  clearFormState: () => void;
  errors: z.ZodIssue[] | null;
};

const INIT_VALUES = {
  bets: [],
  errors: null,
  status: false,
  message: null,
  leaderboard: [],
  isSubmitting: false,
};

export const useBetStore = create(
  persist<IBetStore>(
    (set, get) => ({
      ...INIT_VALUES,
      createBet: async (payload) => {
        set({ isSubmitting: true });
        try {
          const response = await createBet(payload);
          if (response.data) {
            const user = useAuthStore.getState().user;
            useAuthStore.setState({
              user: {
                ...user,
                balance: (user?.balance ?? 0) - response.data.amount,
              } as User,
            });
            set({ bets: [response.data, ...get().bets] });
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
      loadBets: async () => {
        set({ isSubmitting: true });
        try {
          const response = await loadBets();
          if (response.data) {
            set({ bets: response.data });
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
      loadLeaderboard: async () => {
        set({ isSubmitting: true });
        try {
          const response = await loadLeaderboard();
          if (response.data) {
            set({ leaderboard: response.data });
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
      name: "bet-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
