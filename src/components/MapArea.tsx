import {
    forwardRef,
} from "react";

// Leaflet related
import * as L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Coordinates } from "../store/useDroneStore";

const DEFAULT_COORDINATES: Coordinates = [52.40449808679747, 4.888000509250281]; // Office Avalor
const DEFAULT_ZOOM = 13;

export const MapArea = forwardRef<
  L.Map,
  {
    children?: React.ReactNode;
    startPosition?: Coordinates;
    zoom?: number;
    isLayer1Active?: boolean;
    isLayer2Active?: boolean;
  }
>(
  (
    {
      children,
      startPosition = DEFAULT_COORDINATES,
      zoom = DEFAULT_ZOOM,
      isLayer1Active = false,
      isLayer2Active = false,
    },
    ref
  ) => {
    const mapKey = `${isLayer1Active ? "layer1" : ""}-${isLayer2Active ? "layer2" : ""}`;

    return (
      <MapContainer
        key={mapKey}
        className={`h-full w-full 
          ${isLayer1Active ? "layer1" : ""}
          ${isLayer2Active ? "layer2" : ""}
        `}
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