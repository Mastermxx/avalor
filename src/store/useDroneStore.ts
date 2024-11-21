import { create } from "zustand";

export type Coordinates = [number, number];

export type Drone = {
  id: string;
  position: Coordinates;
};

type DroneId = string;

type DroneState = {
  drones: Drone[];
  selectedDroneId: DroneId | null;
  addDrone: (id: DroneId, position: Coordinates) => void;
  removeDrone: (id: DroneId) => void;
  selectDrone: (id: DroneId | null) => void;
  setPosition: (id: DroneId, position: Coordinates) => void;
  getSelectedDrone: () => Drone | null;
  getDrone: (id: DroneId) => Drone | null;
};

const useDroneStore = create<DroneState>((set, get) => ({
  drones: [
    {
      id: "#1 R2-D2",
      position: [52.40449808679747, 4.888000509250281],
    },
  ],

  getDrone: (id) => get().drones.find((d) => d.id == id) ?? null,

  getSelectedDrone: () => {
    const id = get().selectedDroneId;
    if (!id) {
      return null;
    }

    return get().drones.find((d) => d.id == id) ?? null;
  },

  selectedDroneId: "DEFAULT",

  addDrone: (id, position) =>
    set((state) => ({
      drones: [...state.drones, { id, position }],
    })),

  removeDrone: (id) =>
    set((state) => ({
      drones: state.drones.filter((drone) => drone.id !== id),
      selectedDroneId:
        state.selectedDroneId === id ? null : state.selectedDroneId, // Reset if removed
    })),

  selectDrone: (id) => set({ selectedDroneId: id }),

  setPosition: (id, position) =>
    set((s) => ({
      drones: s.drones.map((d) => {
        if (d.id !== id) return d;
        return {
          ...d,
          position,
        };
      }),
    })),
}));

export default useDroneStore;
