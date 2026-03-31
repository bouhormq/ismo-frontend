import { PropsWithChildren } from "react";

import ResponsiveDialogContent from "./Responsive-Dialog/ResponsiveDialogContent";
import ResponsiveDialogPortal from "./Responsive-Dialog/ResponsiveDialogPortal";
import ResponsiveDialogRoot from "./Responsive-Dialog/ResponsiveDialogRoot";

type Props = {
  open: boolean;
  handleSetOpen: (open: boolean) => void;
  className?: string;
  hideDefaultHeaders?: boolean;
  hasBottomSheet?: boolean;
};
const ResponsiveDialog = ({
  children,
  open,
  hasBottomSheet = false,
  handleSetOpen,
  className,
  hideDefaultHeaders,
}: PropsWithChildren<Props>) => {
  return (
    <ResponsiveDialogRoot
      open={open}
      handleSetOpen={(newOpen) => {
        handleSetOpen(newOpen);
      }}
    >
      <ResponsiveDialogPortal>
        <ResponsiveDialogContent
          title="Dialog titre"
          description="Dialog description"
          hideDefaultHeaders={hideDefaultHeaders}
          className={className}
          hasBottomSheet={hasBottomSheet}
        >
          {children}
        </ResponsiveDialogContent>
      </ResponsiveDialogPortal>
    </ResponsiveDialogRoot>
  );
};

export default ResponsiveDialog;
