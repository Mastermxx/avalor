import useDroneStore from "../store/useDroneStore";

export default function DroneLocation() {
    const getSelectedDrone = useDroneStore((state) => state.getSelectedDrone);
    const selectedDrone = getSelectedDrone();

    return (
        <div
            className="
                absolute top-2 left-1/2 translate-x-[-50%] z-[1000]
                bg-stone-800 bg-opacity-60 text-white p-2 rounded-lg text-sm
            "
        >
            {selectedDrone ? (
                <>
                    <p>Latitude: {selectedDrone.position[0].toFixed(5)}, Longitude: {selectedDrone.position[1].toFixed(5)}</p>
                </>
            ) : (
                <p>No drone selected</p>
            )}
        </div>
    )
}