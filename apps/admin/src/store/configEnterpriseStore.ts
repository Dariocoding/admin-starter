import { ConfigEnterprise } from "@teslo/interfaces";
import { create } from "zustand";

interface ConfigEnterpriseStore {
  setConfigEnterprise: (configEnterprise: Partial<ConfigEnterprise>) => void;
  configEnterprise: Partial<ConfigEnterprise>;
}

export const useConfigEnterpriseStore = create<ConfigEnterpriseStore>((set) => ({
  configEnterprise: {},
  setConfigEnterprise: (configEnterprise) => set({ configEnterprise }),
}));
