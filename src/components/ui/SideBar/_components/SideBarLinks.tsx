import { Link, useLocation } from "react-router-dom";

import { cn } from "$/utils/functions/misc.functions";

import { getSidebarLinks } from "../_functions/getSideBarLinks";
import IconRenderer from "./IconRenderer";

const SideBarLinks = () => {
  const sidebarLinks = getSidebarLinks("ADMIN");
  const { pathname } = useLocation();

  return (
    <div className={cn("mt-4 flex flex-col gap-3")}>
      {sidebarLinks.map((link, index) => {
        return (
          <Link
            key={index}
            to={link.path}
            tabIndex={index + 2}
            className={cn(
              "ml-4 block rounded-3xl rounded-r-none text-[#43454E] tabletScreen:ml-2 tabletScreen:rounded-xl",
              pathname === link.path
                ? "invertedRoundedBorder active bg-gray-bodyBg"
                : pathname !== "/" &&
                    link.path !== "/" &&
                    pathname.includes(link.path) &&
                    "invertedRoundedBorder active bg-gray-bodyBg",
            )}
          >
            <div className="inverted_radius_parent">
              <div className="inverted_relative_container"></div>
            </div>
            <div
              className={cn(
                "relative flex h-12 items-center gap-2 px-5 tabletScreen:h-10 tabletScreen:px-2 tabletScreen:py-0",
              )}
            >
              <IconRenderer
                icon={link.icon}
                props={{
                  className: cn(
                    "link_icon w-5 h-5 shrink-0 tabletScreen:w-4 tabletScreen:h-4",
                  ),
                }}
              />
              <div className="overflow-hidden">
                <p className={cn("min-w-44 text-xs font-semibold")}>
                  {link.label}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SideBarLinks;
