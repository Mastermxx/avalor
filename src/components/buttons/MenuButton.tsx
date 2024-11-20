import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  Link: string;
  Icon: LucideIcon;
}

export default function Button({ children, Icon, Link }: ButtonProps) {
  return (
    <NavLink
      to={Link}
      className={({ isActive }) => (isActive ? "group active" : 'border-2 border-[#262626]')}
    >
      <div className="
      flex flex-col justify-center text-center items-center
      w-20 h-20 p-5 rounded-lg text-sm
      hover:bg-[#101010] hover:text-[#fafafa]
      group-[.active]:text-[#f8f8f8] group-[.active]:bg-[#101010]
      ">
        <Icon />
        {children}
      </div >
    </NavLink>
  );
}


