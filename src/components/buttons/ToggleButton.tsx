import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToggleButtonProps {
  children: React.ReactNode;
  Icon: LucideIcon;
  onToggle: () => void;
  isActive: boolean;
}

export default function ToggleButton({ children, Icon, onToggle, isActive }: ToggleButtonProps) {

    const handleToggle = () => {
        onToggle();
    }

  return (
    <button
      onClick={handleToggle}
      className={`
        flex flex-col justify-center text-center items-center
        w-20 h-20 p-5 rounded-lg text-sm
        hover:bg-[#1c1c1e] hover:text-[#fafafa] hover:border-white
        ${isActive ? 'bg-[#101010] text-[#fafafa] border-2 border-[#ff8f00]' : 'border-2 border-[#6a6a6e]'}
      `}
    >
      <Icon />
      {children}
    </button>
  );
}
