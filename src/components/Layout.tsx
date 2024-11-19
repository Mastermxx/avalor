import { Outlet } from "react-router-dom";
import { useState } from "react";
import { House, Focus, SlidersHorizontal, ChartColumnIncreasing   } from 'lucide-react';
import MenuButton from './buttons/MenuButton'
import { ToggleButton } from "./buttons/ToggleButton";

export default function Layout() {

    const [isStatsActive, setStatsActive] = useState(true);
    const [isControlActive, setControlsActive] = useState(true);

    const handleStatsToggle = () => {
        setStatsActive(!isStatsActive);
    }

    const handleControlsToggle = () => {
        setControlsActive(!isControlActive);
    }

    return (
        <div className="flex bg-black w-full h-screen">
            <div className="flex flex-row">
                <div className="flex text-[#858585] bg-[#1c1c1e] p-5">
                    <nav className="flex flex-col gap-2">
                        <MenuButton Icon={House} Link='/'>Home</MenuButton>
                        <MenuButton Icon={Focus} Link='/drones'>Drones</MenuButton>
                        Settings
                        <hr />
                        <ToggleButton Icon={ChartColumnIncreasing} onToggle={handleStatsToggle}>Stats</ToggleButton>
                        <ToggleButton Icon={SlidersHorizontal } onToggle={handleControlsToggle}>Controls</ToggleButton>

                        {isStatsActive && 'Stats are ON!'}
                        {isControlActive && 'Controls are ON!'}
                    </nav>
                </div>
                <div className="flex p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}



