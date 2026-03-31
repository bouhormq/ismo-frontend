## Install these dependencies:

- react-hook-form
- lucide-react
- zod

# Use this hook in case you don't have it:

<!--
    import { type MutableRefObject, useEffect } from "react";

export default function useOutsideClick(
  ref: MutableRefObject<HTMLElement | null>,
  onOutsideClick: (e: MouseEvent) => void,
) {
  useEffect(() => {
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

-->
