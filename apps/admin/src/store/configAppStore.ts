import { ColorsAdmin } from "@teslo/interfaces";
import { create } from "zustand";

interface ConfigEnterpriseStore {
  colors: Partial<ColorsAdmin>;
  setColors: (colors: Partial<ColorsAdmin>) => void;
  chatGtpKey: string;
  setChatGtpKey: (chatGtpKey: string) => void;
}

export const useConfigApp = create<ConfigEnterpriseStore>((set, get) => ({
  colors: {},
  setColors: (colors: Partial<ColorsAdmin>) => {
    const { colors: colorsState } = get();
    set({ colors: { ...colorsState, ...colors } });
  },
  chatGtpKey: "",
  setChatGtpKey: (chatGtpKey: string) => set({ chatGtpKey }),
}));
