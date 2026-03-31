import { PropsWithChildren } from "react";

import BottomSheetContent from "./BottomSheetContent";
import BottomSheetPortal from "./BottomSheetPortal";
import BottomSheetRoot from "./BottomSheetRoot";

type Props = {
  open: boolean;
  handleSetOpen: (open: boolean) => void;
};
const BottomSheet = ({
  open,
  handleSetOpen,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <BottomSheetRoot open={open} handleSetOpen={handleSetOpen}>
      <BottomSheetPortal>
        <BottomSheetContent>{children}</BottomSheetContent>
      </BottomSheetPortal>
    </BottomSheetRoot>
  );
};

export default BottomSheet;
