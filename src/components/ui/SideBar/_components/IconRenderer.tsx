import { SVGProps } from "react";

import ArticlesIcon from "$/icons/SideBar/ArticlesIcon";
import CalendarTasksIcon from "$/icons/SideBar/CalendarTasksIcon";
import ClientsIcon from "$/icons/SideBar/ClientsIcon";
import ReportsIcon from "$/icons/SideBar/ReportsIcon";
import TableauDuBordIcon from "$/icons/SideBar/TableauDuBordIcon";

import { ICONS } from "../_constants/index.constants";

type Props = {
  icon: ICONS;
  props: SVGProps<SVGSVGElement>;
};

const IconRenderer = ({ icon, props }: Props) => {
  switch (icon) {
    case "DASHBOARD":
      return <TableauDuBordIcon {...props} />;
    case "CLIENTS":
      return <ClientsIcon {...props} />;
    case "ARTICLES":
      return <ArticlesIcon {...props} />;
    case "CALENDAR":
      return <CalendarTasksIcon {...props} />;
    case "REPORTS":
      return <ReportsIcon {...props} />;
  }
};

export default IconRenderer;
