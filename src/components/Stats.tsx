export default function Stats() {
    return (
        <div className="absolute z-[1000] bottom-2 left-2 flex flex-col gap-2">
            <div className="bg-stone-800 bg-opacity-60 text-white p-5 rounded-lg">
                <div>Speed</div>
                <div className="">18 m/s</div>
            </div>
            <div className="bg-stone-800 bg-opacity-60 text-white p-5 rounded-lg">
                <div>Altitude</div>
                <div className="">788</div>
            </div>
            <div className="bg-stone-800 bg-opacity-60 text-white p-5 rounded-lg">
                <div>Wind</div>
                <div className="">7 m/s</div>
            </div>
        </div>
    )
}