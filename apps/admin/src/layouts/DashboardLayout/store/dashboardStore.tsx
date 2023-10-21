import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DashboardStoreValues {
  isCollapsed: boolean;
  expanded: string;
  setExpanded(value: string): void;
  setCollapsed(isCollapsed: boolean): void;
  toggleCollapse(): void;
  closeCollapse(): void;
  openCollapse(): void;
}

export const useDashboardStore = create(
  persist<DashboardStoreValues>(
    (set) => ({
      expanded: null,
      setExpanded(expanded) {
        set({ expanded });
      },
      isCollapsed: false,
      setCollapsed(isCollapsed) {
        set({ isCollapsed });
      },
      toggleCollapse() {
        set((state) => ({ isCollapsed: !state.isCollapsed }));
      },
      openCollapse() {
        set({ isCollapsed: true });
      },
      closeCollapse() {
        set({ isCollapsed: false });
      },
    }),
    {
      name: "state-dashboard",
    }
  )
);
