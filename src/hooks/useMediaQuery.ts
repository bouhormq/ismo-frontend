import { useEffect, useState } from "react";

export function useMediaQuery(query: string, initialValue = false): boolean {
  const [matches, setMatches] = useState<boolean>(initialValue);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    const handleChange = () => {
      setMatches(window.matchMedia(query).matches);
    };
    handleChange();

    matchMedia.addEventListener("change", handleChange);
    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
