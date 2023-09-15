import { create } from "zustand";



const useStore = create((set) => ({
  height: 0,
  setHeight: (height) => set({height: height}),
}));

export default useStore;
