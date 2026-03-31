import { useContext } from "react";

import GeneralContext from "../../contexts/general/general.context";

export default function useGeneral() {
  return useContext(GeneralContext);
}
