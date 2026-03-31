import { PropsWithChildren, useState } from "react";

import GeneralContext from "../contexts/general/general.context";

const GeneralProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const handleSetIsSideBarOpen = (isSideBarOpen?: boolean) => {
    setOpen(isSideBarOpen ?? !open);
  };

  const handleSetIsFilterBarOpen = (isFilterBarOpen?: boolean) => {
    setFilterOpen(isFilterBarOpen ?? !filterOpen);
  };

  return (
    <GeneralContext.Provider
      value={{
        isSideBarOpen: open,
        setIsSideBarOpen: handleSetIsSideBarOpen,
        isFilterBarOpen: filterOpen,
        setIsFilterBarOpen: handleSetIsFilterBarOpen,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralProvider;
