import { useContext } from "react";

import { OutsideClickContext } from "../../contexts/general/outsideClickChildren.context";

export default function useOutsideClickChildren() {
  return useContext(OutsideClickContext);
}
