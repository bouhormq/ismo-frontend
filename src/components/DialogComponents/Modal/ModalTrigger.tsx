import * as Dialog from "@radix-ui/react-dialog";
import {
  type ComponentProps,
  type MouseEventHandler,
  type PropsWithChildren,
} from "react";

import { useRootDialog } from "../../../hooks/useRootDialog";

export default function ModalTrigger({
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
    <Dialog.Trigger asChild>
      <button type="button" onClick={handleClick} {...buttonProps}>
        {children}
      </button>
    </Dialog.Trigger>
  );
}
