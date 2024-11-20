import { create } from "zustand";

type Drone = {
  id: string;
  position: [number, number];
};

type DroneState = {
  drones: Drone[];
  selectedDroneId: string | null;
  addDrone: (id: string, position: [number, number]) => void;
  removeDrone: (id: string) => void;
  selectDrone: (id: string) => void;
};

const useDroneStore = create<DroneState>((set) => ({
  drones: [],
  selectedDroneId: null,

  addDrone: (id, position) =>
    set((state) => ({
      drones: [...state.drones, { id, position }],
    })),

  removeDrone: (id) =>
    set((state) => ({
      drones: state.drones.filter((drone) => drone.id !== id),
      selectedDroneId: state.selectedDroneId === id ? null : state.selectedDroneId, // Reset if removed
    })),

  selectDrone: (id) => set({ selectedDroneId: id }),
}));

export default useDroneStore;
