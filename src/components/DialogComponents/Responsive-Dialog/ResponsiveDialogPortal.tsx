import type { PropsWithChildren } from "react";

import ModalPortal from "../Modal/ModalPortal";

export default function ResponsiveDialogPortal(props: PropsWithChildren) {
  return <ModalPortal {...props} />;
}
