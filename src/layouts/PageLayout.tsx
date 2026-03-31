import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Flexbox from "$/components/ui/Flexbox";

type Props = {
  children?: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <Flexbox
      fullWidth
      className="relative max-h-[100dvh] overflow-auto"
      ref={containerRef}
      id="page-layout-container"
    >
      {children}

      <Flexbox fullWidth fullHeight>
        <Outlet />
      </Flexbox>
    </Flexbox>
  );
};

export default PageLayout;
