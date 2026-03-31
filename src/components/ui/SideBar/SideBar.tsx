import { LogOutIcon } from "lucide-react";
import { useEffect } from "react";

import logo from "$/assets/Logo.png";
import useAuth from "$/hooks/contexts/useAuth";
import useGeneral from "$/hooks/contexts/useGeneral";
import { useMediaQuery } from "$/hooks/useMediaQuery";
import { cn } from "$/utils/functions/misc.functions";

import Button from "../Button";
import Flexbox from "../Flexbox";
import SideBarLinks from "./_components/SideBarLinks";

const SideBar = () => {
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const { setIsSideBarOpen, isSideBarOpen } = useGeneral();
  const { clearUser } = useAuth();

  useEffect(() => {
    if (isDesktop) setIsSideBarOpen(false);
  }, [isDesktop, setIsSideBarOpen]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[210] bg-black opacity-50 transition-opacity tabletScreen:hidden",
          {
            "!hidden": !isSideBarOpen,
            "!block": isSideBarOpen,
          },
        )}
        onClick={() => setIsSideBarOpen(false)}
      />
      <div
        className={cn(
          "relative flex flex-col bg-white transition-transform duration-300 tabletScreen:absolute tabletScreen:z-[220] tabletScreen:h-full tabletScreen:w-80 tabletScreen:-translate-x-full mobileScreen:w-2/3",
          isSideBarOpen && "tabletScreen:translate-x-0",
        )}
      >
        <img
          src={logo}
          alt="small logo"
          className={cn(
            "m-6 mx-auto h-auto w-44 object-contain",
            "hidden tabletScreen:block",
          )}
        />
        <img
          src={logo}
          alt="logo"
          className={cn(
            "m-6 mx-auto w-52 object-contain",
            "block tabletScreen:hidden",
          )}
        />
        <SideBarLinks />
        <Flexbox fullWidth className="mb-4 mt-auto px-4 tabletScreen:px-2">
          <Button
            onClick={clearUser}
            className={cn(
              "text-purple-normal mx-auto flex w-fit justify-start rounded-2xl p-0 delay-0 duration-0 tabletScreen:rounded-xl",
            )}
          >
            <div
              className={cn(
                "relative flex h-12 items-center gap-2 px-5 tabletScreen:h-10 tabletScreen:px-2 tabletScreen:py-0",
              )}
            >
              <LogOutIcon width={16} />
              <div>
                <p className="text-xs font-semibold">Déconnexion</p>
              </div>
            </div>
          </Button>
        </Flexbox>
      </div>
    </>
  );
};

export default SideBar;
