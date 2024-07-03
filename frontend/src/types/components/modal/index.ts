import { Dispatch, SetStateAction } from "react";

export type ModalType = {
  width?: number;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
};

export type ModalStateType<T> = {
  title: string;
  type: "add" | "update" | "delete";
  data: T | null;
};

export type ModalAddType<T> = {
  data?: T;
  id: number;
  type: "add" | "update";
  onClose: () => void;
};

export type ModalDeleteType = {
  id: number;
  name: string;
  onDelete: (id: number) => void;
  onClose: () => void;
};
