import { ValidLocales } from "@/i18n/locales";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Ii18Store {
  locale: string;
  setLocale: (locale: string) => void;
}

export const useI18Store = create(
  persist<Ii18Store>(
    (set) => ({
      locale: ValidLocales.SPANISH.locale,
      setLocale: (locale: string) => set({ locale }),
    }),
    { name: "i18Store" }
  )
);
