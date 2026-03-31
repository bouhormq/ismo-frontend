import type { PropsWithChildren } from "react";
import { Drawer } from "vaul";

import RootDialogProvider from "$/providers/DialogProvider";

type Props = {
  open: boolean;
  handleSetOpen: (open: boolean) => void;
};

export default function BottomSheetRoot({
  open,
  handleSetOpen,
  children,
}: PropsWithChildren<Props>) {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleSetOpen(false);
    }
  };

  return (
    <RootDialogProvider open={open} handleSetOpen={handleSetOpen}>
      <Drawer.Root open={open} onOpenChange={handleOpenChange}>
        {children}
      </Drawer.Root>
    </RootDialogProvider>
  );
}
