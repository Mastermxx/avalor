import { Outlet } from "react-router-dom";

import { House, Focus, SlidersHorizontal, ChartColumnIncreasing } from 'lucide-react';

import MenuButton from './buttons/MenuButton';
import ToggleButton from "./buttons/ToggleButton";

import useUIStore from '../store/useUIStore';

export default function Layout() {
    const isStatsActive = useUIStore((state) => state.isStatsActive);
    const toggleStats = useUIStore((state) => state.toggleStats);

    const isControlActive = useUIStore((state) => state.isControlActive);
    const toggleControls = useUIStore((state) => state.toggleControls);

    return (
        <div className="flex bg-black w-full h-screen">
            {/* <div className="flex flex-row"> */}
                <div className="flex flex-col text-center gap-2 justify-between text-[#858585] bg-[#1c1c1e] p-5 max-w-30">
                    <nav className="flex flex-col gap-2">
                        <MenuButton Icon={House} Link='/'>Home</MenuButton>
                        <MenuButton Icon={Focus} Link='/drones'>Drones</MenuButton>
                        <button>Add Drone</button>
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
            {/* </div> */}
        </div>
    );
}
