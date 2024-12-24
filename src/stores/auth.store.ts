import z from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthDetails, AuthPayload, User } from "../types";
import { login, register } from "../utils/services";
import { redirect } from "react-router-dom";

export type IAuthStore = {
  status: boolean;
  logout: () => void;
  user: User | null;
  error: string | null;
  message: string | null;
  isSubmitting: boolean;
  login: (payload: AuthPayload) => Promise<void>;
  signup: (payload: AuthPayload) => Promise<void>;
  clearFormState: () => void;
  errors: z.ZodIssue[] | null;
} & AuthDetails;

const INIT_VALUES = {
  user: null,
  error: null,
  errors: null,
  status: false,
  message: null,
  accessToken: null,
  isSubmitting: false,
};

export const useAuthStore = create(
  persist<IAuthStore>(
    (set) => ({
      ...INIT_VALUES,
      login: async (payload) => {
        set({ isSubmitting: true, error: null });
        try {
          const response = await login(payload);
          if (response.accessToken) {
            set({ user: response.user, accessToken: response.accessToken })
            redirect('/dashboard')
          } else {
            set({ status: false, message: response.message })
          }
        } catch (error) {
          console.log(error)
          set({ status: false, message: "Something went wrong. Please try again." })
        } finally {
          set({ isSubmitting: false })
        }
      },
      signup: async (payload) => {
        set({ isSubmitting: true, error: null });
        try {
          const response = await register(payload);
          if (response.user) {
            set({ status: true, message: response.message })
          } else {
            set({ status: false, message: response.message })
          }
        } catch (error) {
          console.log(error)
          set({ status: false, message: "Something went wrong. Please try again." })
        } finally {
          set({ isSubmitting: false })
        }
      },
      logout: () => set({ ...INIT_VALUES }),
      clearFormState: () => set({ status: false, message: null, errors: null }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
