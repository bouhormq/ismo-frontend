import { PropsWithChildren } from "react";

import { cn } from "../../utils/functions/misc.functions";
import Flexbox from "./Flexbox";

type Props = {
  title: string;
  className?: string;
};

function StylizedContainer({
  title,
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Flexbox
      fullWidth
      fullHeight
      className={cn(
        "space-y-3 rounded-2xl bg-white p-4 tabletScreen:p-0",
        className,
      )}
    >
      <h3 className="font-raleway text-lg font-bold tabletScreen:text-base">
        {title}
      </h3>
      {children}
    </Flexbox>
  );
}

export default StylizedContainer;
