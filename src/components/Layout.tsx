import { Outlet } from "react-router-dom";

// Styling / Icons
import { House, Focus, SlidersHorizontal, ChartColumnIncreasing } from 'lucide-react';

// Components
import MenuButton from './buttons/MenuButton';
import ToggleButton from "./buttons/ToggleButton";

// Stores
import useUIStore from '../store/useUIStore';
import useDroneStore from '../store/useDroneStore';

export default function Layout() {
    const isStatsActive = useUIStore((state) => state.isStatsActive);
    const toggleStats = useUIStore((state) => state.toggleStats);

    const isControlActive = useUIStore((state) => state.isControlActive);
    const toggleControls = useUIStore((state) => state.toggleControls);

    const addDrone = useDroneStore((state) => state.addDrone);

    const handleAddDrone = () => {
        const newDroneId = `Drone-${Date.now()}`; // Generate a unique ID for each drone
        // const defaultPosition: [number, number] = [52.40449808679747, 4.888000509250281];

        const randomNumber = () => Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        addDrone(newDroneId, [parseFloat(`52.404${randomNumber()}`), parseFloat(`4.888${randomNumber()}`)]);
        console.log(newDroneId)
    };

    return (
        <div className="flex bg-black w-full h-screen">
            <div className="flex flex-col text-center gap-2 justify-between text-[#858585] bg-[#1c1c1e] p-5 max-w-30">
                <nav className="flex flex-col gap-2">
                    <MenuButton Icon={House} Link='/'>Home</MenuButton>
                    <MenuButton Icon={Focus} Link='/drones'>Drones</MenuButton>
                    <button
                        onClick={handleAddDrone}
                        className="bg-stone-800 text-white p-2 rounded-lg hover:bg-stone-700"
                    >
                        Add Drone
                    </button>
                </nav>
                <div className="flex flex-col gap-2">
                    Toggle Settings
                    <ToggleButton Icon={ChartColumnIncreasing} onToggle={toggleStats} isActive={isStatsActive}>
                        Stats
                    </ToggleButton>
                    <ToggleButton Icon={SlidersHorizontal} onToggle={toggleControls} isActive={isControlActive}>
                        Controls
                    </ToggleButton>
                </div>
            </div>
            <div className="flex p-5 flex-grow">
                <Outlet />
            </div>
        </div>
    );
}
