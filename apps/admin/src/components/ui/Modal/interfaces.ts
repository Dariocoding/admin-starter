export type SizeModal = "sm" | "md" | "lg" | "xl";

export interface IModalProps {
  showModal: boolean;
  onClose(): void;
  children?: React.ReactNode;
  title?: React.ReactNode;
  size?: SizeModal;
  id?: string;
}
