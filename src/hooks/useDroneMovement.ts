import { useEffect, useState, useRef } from "react";

export default function useDroneMovement(initialPosition: [number, number]) {
  const [position, setPosition] = useState<[number, number]>(initialPosition);
  const targetPosition = useRef<[number, number]>(initialPosition);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((current) => {
        const [currentLat, currentLng] = current;
        const [targetLat, targetLng] = targetPosition.current;

        // Calculate the next position
        const latDiff = targetLat - currentLat;
        const lngDiff = targetLng - currentLng;

        // If the marker is close to the target, stop updating
        if (Math.abs(latDiff) < 0.0001 && Math.abs(lngDiff) < 0.0001) {
          return current; // Stay at the current position
        }

        // Interpolate the position (adjust the divisor for speed control)
        const nextLat = currentLat + latDiff * 0.1;
        const nextLng = currentLng + lngDiff * 0.1;

        return [nextLat, nextLng];
      });
    }, 50); // Update interval (ms)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const moveTo = (x: number, y: number) => {
    targetPosition.current = [
      targetPosition.current[0] + x * 0.001,
      targetPosition.current[1] + y * 0.001,
    ];
  };

  return { position, moveTo };
}
