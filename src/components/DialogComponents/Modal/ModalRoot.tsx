import * as Dialog from "@radix-ui/react-dialog";
import { type PropsWithChildren } from "react";

import RootDialogProvider from "../../../providers/DialogProvider";

type Props = {
  open: boolean;
  handleSetOpen: (open: boolean) => void;
};

export default function ModalRoot({
  open,
  handleSetOpen,
  children,
}: PropsWithChildren<Props>) {
  return (
    <RootDialogProvider open={open} handleSetOpen={handleSetOpen}>
      <Dialog.Root open={open}>{children}</Dialog.Root>
    </RootDialogProvider>
  );
}
