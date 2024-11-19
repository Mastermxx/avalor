import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToggleButtonProps {
  children: React.ReactNode;
  Icon: LucideIcon;
  onToggle: () => void;
}

export function ToggleButton({ children, Icon, onToggle }: ToggleButtonProps) {

    const handleToggle = () => {
        onToggle();
    }

  return (
    <button
      onClick={handleToggle}
      className="
      flex flex-col justify-center text-center items-center
      w-20 h-20 p-5 rounded-lg text-sm
      hover:bg-[#101010] hover:text-[#fafafa]
      text-[#f8f8f8] bg-[#101010]
      "
    >
      <Icon />
      {children}
    </button>
  );
}
