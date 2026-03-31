import { PropsWithChildren } from "react";

import { cn } from "$/utils/functions/misc.functions";

import Flexbox from "../ui/Flexbox";

type Props = {
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

const ClickableBox = ({
  icon,
  onClick,
  className,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Flexbox
      align="center"
      className={cn(
        "effect shadow-blur-xl mb-4 cursor-pointer gap-4 rounded-[20px] bg-white px-10 py-6 transition-all duration-300 ease-in-out",
        className,
      )}
      onClick={onClick}
    >
      {icon}
      <div>{children}</div>
    </Flexbox>
  );
};

export default ClickableBox;
