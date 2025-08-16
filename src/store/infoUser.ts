import { create } from "zustand";

interface InfoUserState {
  imgUserToNavbar: string | null;
  setImgUserToNavbar: (url: string) => void;
}

export const infoUser = create<InfoUserState>((set) => ({
  imgUserToNavbar: null,
  setImgUserToNavbar: (url) => set({ imgUserToNavbar: url }),
}));
