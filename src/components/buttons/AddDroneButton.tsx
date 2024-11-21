import { createContext, useContext } from "react";
import { useShallow } from "zustand/shallow";
import { Map as LeafletMap } from "leaflet";

// Stores
import useDroneStore, { Coordinates } from "../../store/useDroneStore";


export const MapContext = createContext<LeafletMap | null>(null);

export const useMapInstance = () => {
  const ctx = useContext(MapContext);
  return ctx;
};

export default function AddDroneButton({ className }: { className?: string }) {

  const [addDrone, selectDrone] = useDroneStore(
    useShallow((state) => [state.addDrone, state.selectDrone])
  );

  const map = useMapInstance();

  const handleAddDrone = () => {
    const newDroneId = `Drone-${Date.now()}`; // Generate a unique ID for each drone

    const randomNumber = () => Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    const newPosition: Coordinates = [
      parseFloat(`52.404${randomNumber()}`),
      parseFloat(`4.888${randomNumber()}`),
    ];

    addDrone(newDroneId, newPosition);
    selectDrone(newDroneId);
    map?.setView(newPosition);

  };

  return (
    <button
      onClick={handleAddDrone}
      className="
      flex flex-col justify-center items-center absolute bottom-4 right-4
      bg-[#ff8f00] hover:bg-[#fdaf48] text-white p-5 rounded-3xl
      "
    >
      <div className="text-lg font-semibold">+ Add Drone</div>
    </button>
  );
}
