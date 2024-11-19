import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

export default function DroneControls({ onMove }: { onMove: (x: number, y: number) => void }) {
  // Attach the keydown listener directly
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

  // Attach the listener once
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", handleKeyDown);
  }

  return (
    <div className="absolute bottom-2 left-1/2 translate-x-[-50%] z-[1000] flex flex-row gap-2">
      <button onClick={() => onMove(0, -1)} className="bg-stone-800 text-white p-5 rounded-lg">
        <ArrowLeft />
      </button>
      <button onClick={() => onMove(0, 1)} className="bg-stone-800 text-white p-5 rounded-lg">
        <ArrowRight />
      </button>
      <button onClick={() => onMove(-1, 0)} className="bg-stone-800 text-white p-5 rounded-lg">
        <ArrowDown />
      </button>
      <button onClick={() => onMove(1, 0)} className="bg-stone-800 text-white p-5 rounded-lg">
        <ArrowUp />
      </button>
    </div>
  );
}
