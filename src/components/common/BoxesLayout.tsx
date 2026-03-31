import { PropsWithChildren } from "react";

import Flexbox from "$/components/ui/Flexbox";
import { cn } from "$/utils/functions/misc.functions";

type Props = {
  icon: JSX.Element;
  title: string;
  className?: string;
};
const BoxesLayout = ({
  className,
  icon,
  title,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Flexbox
      className={cn(
        "min-w-[310px] flex-shrink basis-0 gap-2.5 rounded-[34px] bg-white px-3.5 pb-[30px] pt-2.5",
        className,
      )}
    >
      <Flexbox fullWidth row className="gap-2.5 px-2.5 py-1" align="center">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E5F7FF] pb-0.5">
          {icon}
        </div>
        <p className="text-2xl text-[#1F1F1F]">{title}</p>
      </Flexbox>
      <div className="w-full">{children}</div>
    </Flexbox>
  );
};

export default BoxesLayout;
