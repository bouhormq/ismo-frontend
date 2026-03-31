import { type PropsWithChildren, createContext, useState } from "react";

export type OutsideClickChildrenContextType = {
  isChildPopupOpen?: boolean;
  setIsChildPopupOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const OutsideClickContext =
  createContext<OutsideClickChildrenContextType>({
    isChildPopupOpen: false,
    setIsChildPopupOpen: () => {},
  });

export default function OutsideClickChildrenProvider({
  children,
}: PropsWithChildren<OutsideClickChildrenContextType>) {
  const [isChildPopupOpen, setIsChildPopupOpen] = useState(false);
  return (
    <OutsideClickContext.Provider
      value={{
        isChildPopupOpen,
        setIsChildPopupOpen,
      }}
    >
      {children}
    </OutsideClickContext.Provider>
  );
}
