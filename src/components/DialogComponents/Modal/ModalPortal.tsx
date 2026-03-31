import * as Dialog from "@radix-ui/react-dialog";
import { type PropsWithChildren, useRef } from "react";

import { useRootDialog } from "../../../hooks/useRootDialog";

export default function ModalPortal({ children }: PropsWithChildren) {
  const rootDialog = useRootDialog();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm" />

      {/* second overlay to add scroll ability to overflow content without being related to first overlay style and animations */}
      <Dialog.Overlay
        onClick={(e) => {
          e.stopPropagation();
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
        // the closing animation class is here only to let radix know to not unmount the component, otherwise we would lose the hide content animation
        className="data-[state=closed]:animate-fade-out fixed inset-0 z-[200] grid overflow-y-auto"
      >
        <Dialog.Content
          onClick={(e) => e.stopPropagation()}
          ref={contentRef}
          onEscapeKeyDown={() => rootDialog.handleSetOpen(false)}
          className="data-[state=closed]:animate-hide-modal-content data-[state=open]:animate-show-modal-content z-[52] mx-5 my-16 flex max-w-[90dvh] items-center justify-center !border-none !outline-none md:mx-auto md:w-full"
        >
          {children}
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
