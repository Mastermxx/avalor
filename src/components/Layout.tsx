import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex bg-black w-full h-screen">
      <div className="flex p-5 flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
