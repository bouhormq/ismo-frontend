import type {
  ComponentProps,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import { Drawer } from "vaul";

import { useRootDialog } from "$/hooks/useRootDialog";

export default function BottomSheetTrigger({
  onClick,
  children,
  ...buttonProps
}: PropsWithChildren<ComponentProps<"button">>) {
  const rootDialog = useRootDialog();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    rootDialog.handleSetOpen(true);
    onClick?.(e);
  };

  return (
    <Drawer.Trigger asChild>
      <button type="button" onClick={handleClick} {...buttonProps}>
        {children}
      </button>
    </Drawer.Trigger>
  );
}
