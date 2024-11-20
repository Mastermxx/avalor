import { create } from 'zustand';

type DroneState = {
  position: [number, number];
  setPosition: (newPosition: [number, number]) => void;
};

const useDroneStore = create<DroneState>((set) => ({
  position: [52.40449808679747, 4.888000509250281], // Default starting position
  setPosition: (newPosition) => set({ position: newPosition }),
}));

export default useDroneStore;
