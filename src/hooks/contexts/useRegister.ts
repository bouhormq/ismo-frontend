import { useContext } from "react";

import { RegisterContext } from "../../providers/RegisterProvider";

export default function useRegister() {
  return useContext(RegisterContext);
}
