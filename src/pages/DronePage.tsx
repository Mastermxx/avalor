import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import DroneIcon from "../assets/drone.svg";
import DroneControls from "../components/DroneControls";
import Stats from "../components/Stats";
import CursorCoordinates from "../components/CursorCoords";
import useDroneMovement from "../hooks/useDroneMovement";

export default function DronePage() {
  const droneIcon = new L.Icon({
    iconUrl: DroneIcon,
    iconSize: [24, 24],
  });

  const startPosition: [number, number] = [52.40449808679747, 4.888000509250281]; // Office Avalor
  const { position, moveTo } = useDroneMovement(startPosition);

  return (
    <div className="relative">
      <MapContainer
        className="h-full w-screen rounded-3xl"
        center={startPosition}
        zoom={13}
      >
        <CursorCoordinates /> {/* Nested properly */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position} icon={droneIcon}>
          <Popup>Drone #1</Popup>
        </Marker>
      </MapContainer>

      <p className="
          absolute top-2 left-1/2 translate-x-[-50%] 
          bg-stone-800 bg-opacity-60 text-white z-[1000] p-5 rounded-lg
        ">
        Latitude {position[0]}, Longitude {position[1]}
      </p>

      <Stats />
      <DroneControls onMove={moveTo} />
    </div>
  );
}
