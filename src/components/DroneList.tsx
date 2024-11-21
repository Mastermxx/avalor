import { useMapInstance } from "../pages/DronePage";
import useDroneStore from "../store/useDroneStore";

export default function Dronelist() {
  const drones = useDroneStore((state) => state.drones);
  const selectedDroneId = useDroneStore((state) => state.selectedDroneId);
  const selectDrone = useDroneStore((state) => state.selectDrone);
  const removeDrone = useDroneStore((state) => state.removeDrone);

  const map = useMapInstance();

  return (
    <div className="absolute z-[1000] top-2 right-2 flex flex-col gap-2">
      <div className="bg-stone-800 bg-opacity-60 text-white p-5 rounded-3xl flex flex-col justify-center items-center">
        <div className="text-lg font-semibold">Dronelist</div>
        <ul className="mt-2 w-full">
          {drones.length > 0 ? (
            drones.map((drone) => (
              <li
                key={drone.id}
                onClick={() => {
                  selectDrone(drone.id);
                  map?.setView(drone.position);
                }} // Select drone on click
                className={`flex justify-between items-center p-2 rounded-lg mt-1 cursor-pointer ${
                  selectedDroneId === drone.id
                    ? "bg-stone-800 text-white border-white border-2"
                    : "bg-stone-800 text-white"
                }`}
              >
                <span className="font-medium">{drone.id}</span>
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-400">No drones available</li>
          )}
        </ul>

        {/* Show buttons only if a drone is selected */}
        {selectedDroneId && (
          <div className="mt-4">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => console.log("Edit Position for", selectedDroneId)}
                className="bg-[#14296a] hover:bg-[#143c6a] text-white p-2 rounded-lg w-full"
              >
                Edit Position
              </button>
              <button
                onClick={() => removeDrone(selectedDroneId)} // Remove drone
                className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg w-full"
              >
                Remove Drone
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
