import type { PropsWithChildren } from "react";

import { useMediaQuery } from "$/hooks/useMediaQuery";

import BottomSheetContent from "../Bottom-Sheet/BottomSheetContent";
import ModalContent from "../Modal/ModalContent";

type Props = {
  title?: string;
  description?: string;
  className?: string;
  hideDefaultHeaders?: boolean;
  hasBottomSheet: boolean;
};

export default function ResponsiveDialogContent(
  props: PropsWithChildren<Props>,
) {
  const isDesktop = useMediaQuery("(min-width: 900px)");

  if (props.hasBottomSheet) {
    if (isDesktop) return <ModalContent {...props} />;

    return <BottomSheetContent {...props} />;
  }

  return <ModalContent {...props} />;
}
