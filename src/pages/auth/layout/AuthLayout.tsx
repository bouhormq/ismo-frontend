import { PropsWithChildren } from "react";

import Logo from "$/assets/LogoLogin.png";
import LogoMap from "$/assets/WorldMapLogin2.png";
import Flexbox from "$/components/ui/Flexbox";
import PageWrapper from "$/guard/PageWrapper";
import { cn } from "$/utils/functions/misc.functions";

type Props = {
  className?: string;
};

const AuthLayout = ({ className, children }: PropsWithChildren<Props>) => {
  return (
    <PageWrapper unAuthenticated>
      <div
        className={cn(
          "tabletScreen:grid-rows-[50%, 50%] tabletScreen:no-scrollbar grid min-h-[100dvh] grid-cols-[1fr,1fr] bg-white tabletScreen:max-h-[100dvh] tabletScreen:grid-cols-[1fr] tabletScreen:overflow-auto",
          className,
        )}
      >
        <Flexbox
          fullFlex
          fullHeight
          fullWidth
          className="login_logo_container relative"
        >
          <Flexbox
            fullFlex
            fullWidth
            align="center"
            justify="center"
            className="mt-20 gap-8 mobileScreen:mt-6"
          >
            <img
              src={Logo}
              className="mx-auto w-full max-w-[55%] tabletScreen:max-w-[45%] mobileScreen:max-w-[70%]"
            />
            <img
              src={LogoMap}
              className="w-full max-w-[90%] tabletScreen:max-w-[70%] mobileScreen:max-w-[90%]"
            />
          </Flexbox>
        </Flexbox>
        {children}
      </div>
    </PageWrapper>
  );
};

export default AuthLayout;
