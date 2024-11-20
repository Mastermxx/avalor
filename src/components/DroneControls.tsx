import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import useDroneStore from "../store/useDroneStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

export default function DroneControls({}: {
  onMove: (x: number, y: number) => void;
}) {
  const [getDrone, setPosition, selectedDroneId] = useDroneStore(
    useShallow((s) => [s.getDrone, s.setPosition, s.selectedDroneId])
  );

  console.log({ selectedDroneId });

  const onMove = (x: number, y: number) => {
    console.log("onMove");
    console.log(selectedDroneId);
    if (!selectedDroneId) {
      // do something?
      return;
    }

    const drone = getDrone(selectedDroneId);

    if (!drone) {
      // do something?
      return;
    }

    setPosition(drone.id, [
      drone.position[0] + x * 0.001,
      drone.position[1] + y * 0.001,
    ]);
  };
  // Attach the keydown listener directly
  const handleKeyDown = (event: KeyboardEvent) => {
    console.log("handlekeydown");
    console.log(event.key);
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

    event.stopPropagation();
    event.preventDefault();
  };

  useEffect(() => {
    // Attach the listener once
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDroneId]);

  if (!selectedDroneId) {
    return null;
  }

  return (
    <div className="absolute bottom-2 left-1/2 translate-x-[-50%] z-[1000] flex flex-row gap-2">
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
        <ArrowDown />
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
