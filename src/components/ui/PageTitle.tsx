import { Bell, Grip } from "lucide-react";

import useGeneral from "../../hooks/contexts/useGeneral";
import Flexbox from "./Flexbox";

type Props = {
  title: string;
};
function PageTitle({ title }: Props) {
  const { setIsSideBarOpen } = useGeneral();
  return (
    <Flexbox
      row
      justify="between"
      align="center"
      fullWidth
      className="tabletScreen:[&>h4]:heading-mobile shadow-normal h-20 bg-white p-6 tabletScreen:gap-4"
    >
      <button
        type="button"
        className="hidden tabletScreen:block"
        onClick={() => setIsSideBarOpen(true)}
      >
        <Grip />
      </button>
      <h4>{title}</h4>
      <Flexbox className="rounded-2xl bg-blue-light p-3">
        <Bell />
      </Flexbox>
    </Flexbox>
  );
}

export default PageTitle;
