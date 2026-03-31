import { useRef } from "react";
import { Outlet } from "react-router-dom";

import SideBar from "$/components/ui/SideBar/SideBar";
import { cn } from "$/utils/functions/misc.functions";

const MainLayout = () => {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollableContainerRef}
      className={cn(
        "grid h-[100dvh] grid-cols-[260px,calc(100%-260px)] grid-rows-[100dvh] overflow-hidden bg-gray-bodyBg transition-all duration-75 tabletScreen:grid-cols-[100%]",
      )}
    >
      <SideBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
