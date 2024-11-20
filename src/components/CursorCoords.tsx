import { useState, useEffect } from 'react';
import { LeafletMouseEvent } from 'leaflet';
import { useMap } from 'react-leaflet';

type Coordinates = {
  lat: number | null;
  lng: number | null;
};

const CursorCoordinates = () => {
  const [coords, setCoords] = useState<Coordinates>({ lat: null, lng: null });
  const map = useMap();

  useEffect(() => {
    const handleMouseMove = (event: LeafletMouseEvent) => {
      setCoords({ lat: event.latlng.lat, lng: event.latlng.lng });
    };

    // map.on('mousemove', handleMouseMove);
    map.on('click', handleMouseMove)

    return () => {
      map.off('mousemove', handleMouseMove);
    };
  }, [map]);

  return (
    <div className='absolute top-40 left-1/2 translate-x-[-50%] bg-stone-800 bg-opacity-60 text-white z-[1000] p-5 rounded-lg'>
      {coords.lat !== null && coords.lng !== null && (
        <span>
          Latitude: {coords.lat.toFixed(5)}, Longitude: {coords.lng.toFixed(5)}
        </span>
      )}
      {(coords.lat === null || coords.lng === null) && <span>Click on the map to see the Coordinates</span>}
    </div>
  );
};

export default CursorCoordinates;
