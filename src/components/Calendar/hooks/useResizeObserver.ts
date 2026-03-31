import { RefObject, useEffect } from "react";

export default function useResizeObserver(
  ref: RefObject<HTMLElement>,
  callback: ResizeObserverCallback,
  options?: ResizeObserverOptions,
) {
  useEffect(() => {
    if (ref.current) {
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, options]);
}
