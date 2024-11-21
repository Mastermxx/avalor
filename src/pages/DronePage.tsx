import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import * as L from "leaflet";
import { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import DroneIcon from "../assets/drone.svg";
import DroneControls from "../components/DroneControls";
import DroneStats from "../components/DroneStats";
import AddDroneButton from "../components/buttons/AddDroneButton";
import DroneList from "../components/DroneList";
import { useShallow } from "zustand/react/shallow";

// Stores
import useUIStore from "../store/useUIStore";
import useDroneStore, { Coordinates, Drone } from "../store/useDroneStore";

import { SlidersHorizontal, ChartColumnIncreasing } from "lucide-react";

// Components
import ToggleButton from "../components/buttons/ToggleButton";
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { renderToString } from "react-dom/server";

const DEFAULT_COORDINATES: Coordinates = [52.40449808679747, 4.888000509250281]; // Office Avalor
const DEFAULT_ZOOM = 13;

export default function DronePage() {
  const isStatsActive = useUIStore((state) => state.isStatsActive);
  const isControlActive = useUIStore((state) => state.isControlActive);

  const toggleStats = useUIStore((state) => state.toggleStats);
  const toggleControls = useUIStore((state) => state.toggleControls);

  const [drones, getSelectedDrone, selectDrone] = useDroneStore(
    useShallow((state) => [
      state.drones,
      state.getSelectedDrone,
      state.selectDrone,
    ])
  );
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);

  const initialCenter = getSelectedDrone()?.position;

  useEffect(() => {
    const deselect = () => {
      selectDrone(null);
    };
    mapInstance?.on("click", deselect);

    return () => {
      mapInstance?.off("click", deselect);
    };
  });

  return (
    <MapContext.Provider value={mapInstance}>
      <div className="relative h-full w-full rounded-3xl overflow-hidden flex">
        <div className="flex flex-col text-center gap-2 justify-between text-[#858585] bg-[#1c1c1e] p-5 max-w-30">
          <div className="flex flex-col gap-2">
            <ToggleButton
              Icon={ChartColumnIncreasing}
              onToggle={toggleStats}
              isActive={isStatsActive}
            >
              Stats
            </ToggleButton>
            <ToggleButton
              Icon={SlidersHorizontal}
              onToggle={toggleControls}
              isActive={isControlActive}
            >
              Controls
            </ToggleButton>
          </div>
        </div>

        <div className="w-full h-full relative">
          <MapArea startPosition={initialCenter} ref={setMapInstance}>
            {drones.map((drone) => (
              <DroneMarker drone={drone} key={drone.id} />
            ))}
          </MapArea>

          <div className="absolute flex w-full h-full top-0 left-0 z-[10000] pointer-events-none [&>*]:pointer-events-auto">
            {/* First paint the map instance will be null: */}
            {mapInstance && (
              <>
                {isControlActive && (
                  <DroneControls className="absolute bottom-4 left-1/2 -translate-x-1/2" />
                )}

                <AddDroneButton className="absolute bottom-4 right-4" />

                {isStatsActive && <DroneStats />}

                <DroneList />
              </>
            )}
          </div>
        </div>
      </div>
    </MapContext.Provider>
  );
}

export const MapContext = createContext<LeafletMap | null>(null);

export const useMapInstance = () => {
  const ctx = useContext(MapContext);
  return ctx;
};

const MapArea = forwardRef<
  L.Map,
  {
    children?: React.ReactNode;
    startPosition?: Coordinates;
    zoom?: number;
  }
>(
  (
    { children, startPosition = DEFAULT_COORDINATES, zoom = DEFAULT_ZOOM },
    ref
  ) => {
    return (
      <MapContainer
        className="h-full w-full"
        center={startPosition}
        zoom={zoom}
        ref={ref}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    );
  }
);

function DroneMarker({ drone }: { drone: Drone }) {
  const [selectDrone, selectedDroneId] = useDroneStore(
    useShallow((state) => [state.selectDrone, state.selectedDroneId])
  );

  // const droneIcon = new L.Icon({
  // iconUrl: DroneIcon,
  // iconSize: : [32, 32],
  // }

  const isSelectedDrone = drone.id == selectedDroneId;
  const droneIcon = L.divIcon({
    html: renderToString(
      <DroneIcon2
        fill={isSelectedDrone ? "#070759" : ""}
      />
    ),
    iconSize: isSelectedDrone ? [64, 64] : [32, 32],
    className: "bg-transparent",
  });

  return (
    <Marker
      interactive
      position={drone.position}
      icon={droneIcon}
      eventHandlers={{
        click: (e) => {
          selectDrone(drone.id);
        },
      }}
    >
      <Popup>
        <strong>Drone ID:</strong> {drone.id}
        <br />
        <strong>Latitude:</strong> {drone.position[0].toFixed(5)}
        <br />
        <strong>Longitude:</strong> {drone.position[1].toFixed(5)}
      </Popup>
    </Marker>
  );
}

// function AddDroneButton({ className }: { className?: string }) {
//   const [addDrone, selectDrone] = useDroneStore(
//     useShallow((state) => [state.addDrone, state.selectDrone])
//   );

//   const map = useMapInstance();

//   const handleAddDrone = () => {
//     const newDroneId = `Drone-${Date.now()}`; // Generate a unique ID for each drone

//     const randomNumber = () =>
//       Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

//     const newPosition: Coordinates = [
//       parseFloat(`52.404${randomNumber()}`),
//       parseFloat(`4.888${randomNumber()}`),
//     ];

//     addDrone(newDroneId, newPosition);

//     selectDrone(newDroneId);

//     map?.setView(newPosition);
//   };

//   return (
//     <button
//       onClick={handleAddDrone}
//       className={`bg-[#14296a] hover:bg-[#143c6a] text-white p-2 rounded-lg ${className}`}
//     > +
//       Add Drone
//     </button>
//   );
// }

function DroneIcon2({
  fill = "#000000",
  stroke = "",
}: {
  fill?: string;
  stroke?: string;
}) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 256 256"
      enableBackground="new 0 0 256 256"
    >
      <metadata>Svg Vector Icons : http://www.onlinewebfonts.com/icon</metadata>
      <g>
        <g>
          <g>
            <path
              fill={fill}
              stroke={stroke}
              strokeWidth={10}
              d="M76.2,11.3c-5.6,3-16.9,12.6-23.4,20l-3.4,4L46.6,35c-2.3-0.2-3.3,0-5.1,0.7c-4.8,2.1-6.8,5.4-6.9,10.7v3.5l-4.4,4C20,63.1,9.4,76.8,10,79.9c0.7,4,13.7-5.1,26.2-18.2l4.9-5.2l2.8,0.5l2.8,0.5l17.7,23.1c9.7,12.7,18.2,23.8,18.7,24.7c2.1,3.3,2.5,7.2,1.9,15.5c-0.4,5.5-0.4,9.3,0,15c0.6,8,0.3,10.7-1.6,14.5c-0.4,0.8-8.8,12-18.7,25l-18,23.5l-2.1,0.3c-1.2,0.2-2.4,0.4-2.7,0.6c-0.3,0.1-2.5-1.9-5.1-4.7c-12.4-13.3-26.1-23-26.8-18.9c-0.6,3.1,10,16.7,20.2,26.1l4.4,4v3.7c0,3.2,0.2,4,1.3,5.9c2.4,4.1,7.4,6.5,11.7,5.5l1.8-0.4l3.9,4.3c9.1,10.2,23.4,21.4,26.6,20.8c4-0.7-5-13.7-18.3-26.3l-5.4-5.2l0.5-2.7l0.5-2.7l23.3-17.9c12.8-9.9,24.1-18.3,25-18.7c3.2-1.7,5.3-1.8,23-1.8c16.4,0,17.4,0.1,19.8,1.1c1.8,0.7,9,5.9,26.2,19.1l23.8,18.2l0.6,2.8l0.6,2.8l-7.3,7.2c-8.2,8.1-13.1,14.1-15.5,18.7c-2.7,5-1.8,6.5,2.7,4.3c5.2-2.5,15.7-11.4,22.8-19.2l4-4.4l3.3,0c3.8,0,6.1-1,8.6-3.6c2.2-2.3,3.4-5.9,3-9l-0.3-2.2l4.4-3.9c7.8-7,17.3-18.1,19.9-23.4c1.6-3.2,1.4-4.1-0.8-4.1c-3.6,0.1-11.6,6.2-22.4,17.1l-7.5,7.6l-1.7-0.5c-0.9-0.2-2.2-0.5-2.7-0.6c-1.5-0.2-37.1-46.6-38.5-50.2c-1.1-2.8-1.1-2.2-1.1-20.5c0-18.5,0-17.8,1.1-20.6c0.7-1.9,5.7-8.7,19.3-26.5c17.9-23.3,18.4-23.8,20-24c1-0.1,2.2-0.3,2.8-0.6c0.9-0.3,1.9,0.6,8.4,7.1c8.2,8.2,13.6,12.7,18.5,15.5c3.4,1.9,5.4,2.2,5.7,0.7c0.6-3.2-10.6-17.5-20.8-26.6l-4.4-3.9l0.3-1.9c0.2-1.2,0-2.9-0.5-4.4c-1.5-5.1-6.1-8.4-11.3-8.1l-2.7,0.1l-4.2-4.6c-9.4-10.4-23.1-21-26.2-20.4c-4,0.7,5,13.7,18.2,26.2l5.3,4.9l-0.5,1.8c-0.3,1-0.5,2.3-0.5,3c0,1-3.7,4-23.5,19.1c-12.9,9.9-24.5,18.4-25.7,19c-3.8,1.7-6.1,1.9-14.3,1.4c-5.6-0.4-9.2-0.4-14.6,0c-7.9,0.6-11,0.3-14.6-1.5c-1.2-0.6-12.5-9-25.4-18.9L57.2,47.2l-0.6-2.9L56,41.6l5.6-5.4c8.2-7.7,15-15.8,17.9-21.3C82.1,10.2,80.8,8.8,76.2,11.3z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
