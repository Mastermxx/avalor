export default function DroneStats() {
    return (
        <div className="absolute z-[1000] bottom-2 left-2 flex flex-col gap-2">
            <div className="bg-stone-800 bg-opacity-60 text-white p-5 rounded-3xl flex flex-col justify-center items-center">
                <div className="text-sm">Speed</div>
                <div className="text-lg font-semibold">XX m/s</div>
            </div>
            <div className="bg-stone-800 bg-opacity-60 text-white p-5 rounded-3xl flex flex-col justify-center items-center">
                <div className="text-sm">Altitude</div>
                <div className="text-lg font-semibold">120 m</div> {/* Consumer drones, on the other hand, are limited to a maximum altitude of 400 (120m) feet above ground level. */}
                
            </div>
            {/* <div className="bg-stone-800 bg-opacity-60 text-white p-5 rounded-3xl flex flex-col justify-center items-center">
                <div className="text-sm">Wind</div>
                <div className="text-lg font-semibold">X m/s</div>
            </div> */}
        </div>
    )
}