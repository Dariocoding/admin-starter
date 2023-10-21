import { SizeModal } from "@/components/ui/Modal";
import { create } from "zustand";

interface SetModalValuesParams {
  children?: React.ReactNode;
  title?: React.ReactNode;
  size?: SizeModal;
}

interface ModalStoreValue {
  show: boolean;
  size: SizeModal;
  title: React.ReactNode;
  content: React.ReactNode;
  closeModal(): void;
  setModal(values: SetModalValuesParams): void;
  setSize(size: SizeModal): void;
}

export const useModalStore = create<ModalStoreValue>((set) => ({
  show: false,
  size: "md",
  title: null,
  content: null,
  closeModal() {
    set({ show: false, title: null, content: null });
  },
  setSize: (size: SizeModal) => {
    set({ size });
  },
  setModal(values) {
    set({
      show: true,
      content: values.children,
      size: values.size || "md",
      title: values.title,
    });
  },
}));
