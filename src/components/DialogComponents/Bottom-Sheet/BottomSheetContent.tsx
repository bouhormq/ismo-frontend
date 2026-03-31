import type { PropsWithChildren } from "react";
import { Drawer } from "vaul";

import { cn } from "$/utils/functions/misc.functions";

type Props = {
  title?: string;
  description?: string;
  className?: string;
  hideDefaultHeaders?: boolean;
};

export default function BottomSheetContent({
  title,
  description,
  className,
  children,
  hideDefaultHeaders = true,
}: PropsWithChildren<Props>) {
  const hasTitleOnly = !!title && !description && !children;

  return (
    <div
      className={cn(
        "relative max-h-[inherit] w-full rounded-t-xl bg-white py-4",
        className,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <Drawer.Handle className="mx-auto mb-4 h-fit rounded-full bg-[#BCBCBC]" />

      <div className="max-h-[inherit] w-full overflow-auto p-4 pb-7 pt-0 tabletScreen:p-2">
        {hideDefaultHeaders ? null : (
          <>
            {!!title && (
              <Drawer.Title
                className={cn("text-lg font-semibold", !hasTitleOnly && "mb-8")}
              >
                {title}
              </Drawer.Title>
            )}
            {!!description && (
              <Drawer.Description
                className={cn("text-sm leading-normal", !!children && "mb-5")}
              >
                {description}
              </Drawer.Description>
            )}
          </>
        )}
        {children}
      </div>
    </div>
  );
}
