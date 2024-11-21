import { create } from 'zustand';

type UIState = {
  isStatsActive: boolean;
  toggleStats: () => void;
  isControlActive: boolean;
  toggleControls: () => void;
  isDroneListActive: boolean;
  toggleDroneList: () => void;

  isMapLayerDefaultActive: boolean;
  toggleMapLayerDefault: () => void;
  isMapLayer1Active: boolean;
  toggleMapLayer1: () => void;
  isMapLayer2Active: boolean;
  toggleMapLayer2: () => void;
};

const useUIStore = create<UIState>((set) => ({
  // Toggle Drone UI
  isStatsActive: true,
  toggleStats: () => set((state) => ({ isStatsActive: !state.isStatsActive })),
  isControlActive: true,
  toggleControls: () => set((state) => ({ isControlActive: !state.isControlActive })),
  isDroneListActive: true,
  toggleDroneList: () => set((state) => ({ isDroneListActive: !state.isDroneListActive })),

  // Toggle Map UI
  isMapLayerDefaultActive: true,
  isMapLayer1Active: false,
  isMapLayer2Active: false,

  toggleMapLayerDefault: () =>
    set(() => ({
      isMapLayerDefaultActive: true,
      isMapLayer1Active: false,
      isMapLayer2Active: false,
    })),

  toggleMapLayer1: () => {
    set(() => {
      console.log("Activating Map Layer 1");
      return {
        isMapLayerDefaultActive: false,
        isMapLayer1Active: true,
        isMapLayer2Active: false,
      };
    });
  },

  toggleMapLayer2: () =>
    set(() => ({
      isMapLayerDefaultActive: false,
      isMapLayer1Active: false,
      isMapLayer2Active: true,
    })),
}));

export default useUIStore;
