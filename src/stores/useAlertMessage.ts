import { create } from "zustand";
import { AlertProps } from "../components/template/Alert";

export type AlertMessageStoreProps = AlertProps & {
  message?: string;
  setMessage: (item: AlertProps & { time?: number }) => void;
  resetMessage: () => void;
};

export const useAlertMessage = create<AlertMessageStoreProps>()((set) => ({
  message: "",
  variant: "info",
  setMessage: ({ message, variant, time = 5000 }) => {
    set({ message, variant });
    setTimeout(() => {
      set({ message: undefined });
    }, time);
  },
  resetMessage: () => set({ message: undefined }),
}));
