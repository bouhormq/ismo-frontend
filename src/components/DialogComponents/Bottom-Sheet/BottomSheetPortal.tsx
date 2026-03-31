import { type PropsWithChildren, useRef } from "react";
import { Drawer } from "vaul";

import { useRootDialog } from "$/hooks/useRootDialog";

export default function BottomSheetPortal({ children }: PropsWithChildren) {
  const rootDialog = useRootDialog();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Drawer.Portal>
      <Drawer.Overlay
        className="fixed inset-0 z-[155] bg-black/60 backdrop-blur-sm"
        onClick={(e) => {
          if (contentRef.current) {
            const { top, right, bottom, left } =
              contentRef.current.getBoundingClientRect();
            const { clientX, clientY } = e;

            if (
              clientX < left ||
              clientX > right ||
              clientY < top ||
              clientY > bottom
            ) {
              rootDialog.handleSetOpen(false);
            }
          }
        }}
      />

      <Drawer.Content
        ref={contentRef}
        onEscapeKeyDown={() => rootDialog.handleSetOpen(false)}
        className="fixed bottom-0 left-0 right-0 z-[160] mt-24 max-h-[100dvh]"
      >
        {children}
      </Drawer.Content>
    </Drawer.Portal>
  );
}
