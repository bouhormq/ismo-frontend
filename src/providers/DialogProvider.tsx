import { type PropsWithChildren, createContext } from "react";

export type DialogContextType = {
  open: boolean;
  handleSetOpen: (open: boolean) => void;
};

export const RootDialogContext = createContext<DialogContextType>({
  open: false,
  handleSetOpen: () => {},
});

export default function RootDialogProvider({
  open,
  handleSetOpen,
  children,
}: PropsWithChildren<DialogContextType>) {
  return (
    <RootDialogContext.Provider value={{ open, handleSetOpen }}>
      {children}
    </RootDialogContext.Provider>
  );
}
