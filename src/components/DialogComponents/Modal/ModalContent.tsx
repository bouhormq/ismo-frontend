import { type PropsWithChildren } from "react";

import { cn } from "../../../utils/functions/misc.functions";

type Props = {
  title?: string;
  description?: string;
  className?: string;
};

export default function ModalContent({
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        "text-black-light relative max-w-[90vh] rounded-md md:min-w-96",
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
