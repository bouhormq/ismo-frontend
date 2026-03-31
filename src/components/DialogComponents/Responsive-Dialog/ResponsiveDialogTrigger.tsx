import type { ComponentProps, PropsWithChildren } from "react";

import ModalTrigger from "../Modal/ModalTrigger";

export default function ResponsiveDialogTrigger(
  props: PropsWithChildren<ComponentProps<"button">>,
) {
  return <ModalTrigger {...props} />;
}
