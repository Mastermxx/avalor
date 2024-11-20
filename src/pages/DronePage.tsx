import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import DroneIcon from "../assets/drone.svg";
import DroneControls from "../components/DroneControls";
import Stats from "../components/Stats";
import CursorCoordinates from "../components/CursorCoords";
import useDroneMovement from "../hooks/useDroneMovement";
import DroneStats from "../components/DroneStats";

// Stores
import useUIStore from '../store/useUIStore';
import useDroneStore from "../store/useDroneStore";

export default function DronePage() {
  const isStatsActive = useUIStore((state) => state.isStatsActive);
  const isControlActive = useUIStore((state) => state.isControlActive);

  const drones = useDroneStore((state) => state.drones); // Get drones from the store
  const droneIcon = new L.Icon({
    iconUrl: DroneIcon,
    iconSize: [24, 24],
  });

  const startPosition: [number, number] = [52.40449808679747, 4.888000509250281]; // Office Avalor
  const { position, moveTo } = useDroneMovement(startPosition);

  return (
    <div className="relative">
      <MapContainer
        className="h-full rounded-3xl w-[calc(100vw-160px)]"
        center={startPosition}
        zoom={13}
      >
        <CursorCoordinates />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={droneIcon}>
          <Popup>Drone #1 : {position}</Popup>
        </Marker>

        {drones.map((drone) => (
          <Marker key={drone.id} position={drone.position} icon={droneIcon}>
            <Popup className="absolute right-5">
              <strong>Drone ID:</strong> {drone.id}
              <br />
              <strong>Latitude:</strong> {drone.position[0].toFixed(5)}
              <br />
              <strong>Longitude:</strong> {drone.position[1].toFixed(5)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <p className="
          absolute top-2 left-1/2 translate-x-[-50%] 
          bg-stone-800 bg-opacity-60 text-white z-[1000] p-5 rounded-lg
        ">
        Latitude {position[0]}, Longitude {position[1]}
      </p>

      {isStatsActive && (
        <div className="w-full">
          <Stats />
        </div>
      )}

      {isControlActive && (
        <div className="w-full mt-4">
          <DroneControls onMove={moveTo} />
        </div>
      )}

      <DroneStats />

      Edit Speed: <input type="text" />

    </div>
  );
}


