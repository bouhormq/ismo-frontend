import { type MutableRefObject, useEffect } from "react";

export default function useOutsideClick(
  ref: MutableRefObject<HTMLElement | null>,
  onOutsideClick: (e: MouseEvent) => void,
  isActive?: boolean,
) {
  useEffect(() => {
    if (isActive) return;

    // handle click outside
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick(event);
      }
    }
    // bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onOutsideClick]);
}
