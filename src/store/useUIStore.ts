import { create } from 'zustand';

type UIState = {
  isStatsActive: boolean;
  toggleStats: () => void;
  isControlActive: boolean;
  toggleControls: () => void;
};

const useUIStore = create<UIState>((set) => ({
  isStatsActive: true,
  toggleStats: () => set((state) => ({ isStatsActive: !state.isStatsActive })),
  isControlActive: true,
  toggleControls: () => set((state) => ({ isControlActive: !state.isControlActive })),
}));

export default useUIStore;
