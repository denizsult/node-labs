import { create } from "zustand";

type PageState = {
  title: string;
  setTitle: (title: string) => void;
};

export const usePageStore = create<PageState>((set) => ({
  title: "Dashboard",
  setTitle: (title) => set({ title }),
}));