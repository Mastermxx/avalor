import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import useDroneStore, { Coordinates } from "../store/useDroneStore";

import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

import { useMapInstance } from "../pages/DronePage";

export default function DroneControls({
  className = "",
}: {
  className?: string;
}) {
  const [setPosition, selectedDroneId, getSelectedDrone] = useDroneStore(
    useShallow((s) => [s.setPosition, s.selectedDroneId, s.getSelectedDrone])
  );

  const map = useMapInstance();

  const drone = getSelectedDrone();
  const onMove = (x: number, y: number) => {
    if (!drone) {
      console.warn("onMove called without a drone selected.");
      return;
    }

    const newPosition: Coordinates = [
      drone.position[0] + x * 0.001,
      drone.position[1] + y * 0.001,
    ];

    setPosition(drone.id, newPosition);

    map?.setView(newPosition);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        onMove(1, 0);
        break;
      case "ArrowDown":
        onMove(-1, 0);
        break;
      case "ArrowLeft":
        onMove(0, -1);
        break;
      case "ArrowRight":
        onMove(0, 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDroneId, drone?.position[0], drone?.position[1]]);

  if (!selectedDroneId) {
    return null;
  }

  return (
    <div className={`flex flex-row gap-2 ${className}`}>
      {/* Components van maken: */}
      <button
        onClick={() => onMove(0, -1)}
        className="bg-stone-800 text-white p-5 rounded-lg"
      >
        <ArrowLeft />
      </button>
      <button
        onClick={() => onMove(0, 1)}
        className="bg-stone-800 text-white p-5 rounded-lg"
      >
        <ArrowRight />
      </button>
      <button
        onClick={() => onMove(-1, 0)}
        className="bg-stone-800 text-white p-5 rounded-lg"
      >
        <ArrowDown className="pointer-events-none" />
      </button>
      <button
        onClick={() => onMove(1, 0)}
        className="bg-stone-800 text-white p-5 rounded-lg"
      >
        <ArrowUp />
      </button>
    </div>
  );
}
