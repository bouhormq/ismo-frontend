import { createContext } from "react";

type GeneralContextType = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (isSideBarOpen?: boolean) => void;
  isFilterBarOpen: boolean;
  setIsFilterBarOpen: (isFilterBarOpen?: boolean) => void;
};
const GeneralContext = createContext<GeneralContextType>({
  isSideBarOpen: true,
  setIsSideBarOpen: () => {},
  isFilterBarOpen: false,
  setIsFilterBarOpen: () => {},
});

export default GeneralContext;
