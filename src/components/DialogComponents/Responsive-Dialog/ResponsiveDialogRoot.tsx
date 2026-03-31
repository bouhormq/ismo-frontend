import type { PropsWithChildren } from "react";

import ModalRoot from "../Modal/ModalRoot";

type Props = {
  open: boolean;
  handleSetOpen: (open: boolean) => void;
};

export default function ResponsiveDialogRoot(props: PropsWithChildren<Props>) {
  return <ModalRoot {...props} />;
}
