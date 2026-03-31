import { ComponentProps, type PropsWithChildren, forwardRef } from "react";

import { cn } from "$/utils/functions/misc.functions";

export type ModalProps = ComponentProps<"div"> & {
  isOpen: boolean;
  onClose: VoidFunction;
};

const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  ({ isOpen, onClose, children, className }, forwardedRef) => {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          >
            <div
              ref={forwardedRef}
              className={cn(
                "min-w-md max-h-[90vh] w-fit transform overflow-auto rounded-[20px] border border-neutral-500 bg-white p-6 text-black shadow-lg transition-all duration-300",
                { "animate-popup": isOpen },
                className,
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div>{children}</div>
            </div>
          </div>
        )}
      </>
    );
  },
);

Modal.displayName = "Modal";

export default Modal;
