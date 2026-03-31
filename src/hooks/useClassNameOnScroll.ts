import { useEffect } from "react";

type StyleObject = React.CSSProperties;

const useClassNameOnScroll = (
  elementRef: React.RefObject<HTMLDivElement>,
  threshold: number = 20,
  styles: StyleObject = {},
  parentRef?: React.RefObject<HTMLDivElement>,
  useParentRef: boolean = false,
) => {
  useEffect(() => {
    const element = elementRef.current;
    // const parent = useParentRef ? parentRef?.current : element?.parentElement;
    const parent = document.getElementById("page-layout-container");

    if (!element || !parent) return;
    const initialStyles: Partial<StyleObject> = {};

    Object.keys(styles).forEach((key) => {
      const styleKey = key as keyof StyleObject;
      initialStyles[styleKey] = element.style[
        styleKey as unknown as number
      ] as any;
    });
    const handleScroll = () => {
      const scrollPosition =
        parent instanceof Window ? window.scrollY : parent.scrollTop;
      if (scrollPosition > threshold) {
        Object.assign(element.style, styles);
      } else {
        Object.assign(element.style, initialStyles);
      }
    };

    parent.addEventListener("scroll", handleScroll);

    return () => {
      parent.removeEventListener("scroll", handleScroll);
    };
  }, [elementRef, parentRef, threshold, styles, useParentRef]);

  return elementRef;
};

export default useClassNameOnScroll;
