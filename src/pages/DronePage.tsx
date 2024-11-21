import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Leaflet related
import { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

// Zustand
import { useShallow } from "zustand/react/shallow";

// Icons
import { SlidersHorizontal, ChartColumnIncreasing, Layers } from "lucide-react";

// Components
import ToggleButton from "../components/buttons/ToggleButton";
import XmasToggleButton from "../components/buttons/XmasToggleButton";
import AddDroneButton from "../components/buttons/AddDroneButton";

import DroneControls from "../components/DroneControls";
import DroneStats from "../components/DroneStats";
import DroneMarker from "../components/DroneMarker";
import DroneList from "../components/DroneList";
import DroneLocation from "../components/DroneLocation";

import { MapArea } from "../components/MapArea";

// Stores
import useUIStore from "../store/useUIStore";
import useDroneStore from "../store/useDroneStore";

export default function DronePage() {
  const isStatsActive = useUIStore((state) => state.isStatsActive);
  const isControlActive = useUIStore((state) => state.isControlActive);
  const isDroneListActive = useUIStore((state) => state.isDroneListActive);

  const isMapLayerDefaultActive = useUIStore((state) => state.isMapLayerDefaultActive);
  const isMapLayer1Active = useUIStore((state) => state.isMapLayer1Active);
  const isMapLayer2Active = useUIStore((state) => state.isMapLayer2Active);

  const isXmasActive = useUIStore((state) => state.isXmasActive);

  const toggleStats = useUIStore((state) => state.toggleStats);
  const toggleControls = useUIStore((state) => state.toggleControls);
  const toggleDroneList = useUIStore((state) => state.toggleDroneList);

  const toggleMapLayerDefault = useUIStore((state) => state.toggleMapLayerDefault);
  const toggleMapLayer1 = useUIStore((state) => state.toggleMapLayer1);
  const toggleMapLayer2 = useUIStore((state) => state.toggleMapLayer2);

  const toggleisXmasMode = useUIStore((state) => state.toggleisXmasMode);


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
          <div className="flex flex-col items-center gap-2 justify-between h-full">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold">Drone Options</p>
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
              <ToggleButton
                Icon={SlidersHorizontal}
                onToggle={toggleDroneList}
                isActive={isDroneListActive}
              >
                Drone List
              </ToggleButton>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold">Map Options</p>
              <ToggleButton
                Icon={Layers}
                onToggle={toggleMapLayerDefault}
                isActive={isMapLayerDefaultActive}
              >
                Default
              </ToggleButton>
              <ToggleButton
                Icon={Layers}
                onToggle={toggleMapLayer1}
                isActive={isMapLayer1Active}
              >
                Layer-1
              </ToggleButton>
              <ToggleButton
                Icon={Layers}
                onToggle={toggleMapLayer2}
                isActive={isMapLayer2Active}
              >
                Layer-2
              </ToggleButton>
              <XmasToggleButton
                onToggle={toggleisXmasMode}
                isActive={isXmasActive}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-full relative">
          <MapArea
            startPosition={initialCenter}
            ref={setMapInstance}
            isLayer1Active={isMapLayer1Active}
            isLayer2Active={isMapLayer2Active}
          >
            {drones.map((drone) => (
              <DroneMarker drone={drone} key={drone.id} />
            ))}
          </MapArea>

          <div className="absolute flex w-full h-full top-0 left-0 z-[10000]">
            {mapInstance && (
              <>
                <DroneLocation />

                {isControlActive && (
                  <DroneControls className="absolute bottom-4 left-1/2 -translate-x-1/2" />
                )}

                <AddDroneButton className="absolute bottom-4 right-4" />

                {isStatsActive && <DroneStats />}

                {isDroneListActive && <DroneList />}
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
