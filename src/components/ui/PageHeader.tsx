import { PropsWithChildren, ReactNode, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "$/hooks/contexts/useAuth";
import MenuIcon from "$/icons/MenuIcon";
import ArrowIcon from "$/icons/Ui/ArrowIcon";
import { PATHS } from "$/routes/constants";

import useGeneral from "../../hooks/contexts/useGeneral";
import useClassNameOnScroll from "../../hooks/useClassNameOnScroll";
import { cn } from "../../utils/functions/misc.functions";
import { Notifications } from "../Notifications/Notifications";
import Flexbox from "./Flexbox";

type Props = {
  headerText: string;
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  useParentRef?: boolean;
  handleGoBack?: VoidFunction;
  rightContent?: ReactNode;
  subtitle?: string;
};
const PageHeader = ({
  headerText,
  className,
  containerRef,
  useParentRef = false,
  handleGoBack,
  rightContent,
  subtitle,
}: PropsWithChildren<Props>) => {
  const { setIsSideBarOpen } = useGeneral();
  const { user } = useAuth();
  const navigate = useNavigate();

  const initials = user?.username
    ? user.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";
  const pageHeader = useRef<HTMLDivElement>(null);

  const pageHeaderRef = useClassNameOnScroll(
    pageHeader,
    10,
    {
      boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.05)",
      backgroundColor: "white",
      zIndex: 100,
    },
    containerRef,
    useParentRef,
  );

  return (
    <Flexbox
      fullWidth
      align="center"
      justify="between"
      row
      className={cn(
        "sticky top-0 z-[100] min-h-[86px] shrink-0 gap-4 px-[18px] duration-200 ease-in tabletScreen:z-[155] tabletScreen:flex-col tabletScreen:justify-start tabletScreen:pt-2.5",
        className,
      )}
      ref={pageHeaderRef}
    >
      <Flexbox
        row
        align="center"
        justify="center"
        className="gap-4 tabletScreen:w-full tabletScreen:justify-start tabletScreen:gap-2"
      >
        {handleGoBack && (
          <button type="button" onClick={handleGoBack}>
            <ArrowIcon />
          </button>
        )}

        <button
          type="button"
          className={cn("hidden tabletScreen:block", {
            "tabletScreen:hidden": handleGoBack,
          })}
          onClick={() => setIsSideBarOpen(true)}
        >
          <MenuIcon />
        </button>

        <h4 className="text-3xl font-semibold leading-8 mobileScreen:text-xl">
          {headerText}
          {subtitle && (
            <span className="text-base font-semibold text-[#898989] mobileScreen:text-xs">
              &nbsp;&nbsp;
              {subtitle}
            </span>
          )}
        </h4>

        <Flexbox row align="center" className="ml-auto hidden gap-3 tabletScreen:flex">
          <Notifications />
          <button
            type="button"
            onClick={() => navigate(PATHS.PROFILE)}
            className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-normal text-3xl font-semibold text-white"
          >
            {user?.profileImageUrl ? (
              <img src={user.profileImageUrl} alt={user.username} className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </button>
        </Flexbox>
      </Flexbox>

      <Flexbox row align="center" justify="center" className="gap-4">
        {rightContent}

        <Notifications className="flex tabletScreen:hidden" />
        <button
          type="button"
          onClick={() => navigate(PATHS.PROFILE)}
          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-normal text-lg font-semibold text-white tabletScreen:hidden"
        >
          {user?.profileImageUrl ? (
            <img src={user.profileImageUrl} alt={user.username} className="h-full w-full object-cover" />
          ) : (
            initials
          )}
        </button>
      </Flexbox>
    </Flexbox>
  );
};

export default PageHeader;
