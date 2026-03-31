import { useContext } from "react";

import { RootDialogContext } from "../providers/DialogProvider";

export function useRootDialog() {
  return useContext(RootDialogContext);
}
