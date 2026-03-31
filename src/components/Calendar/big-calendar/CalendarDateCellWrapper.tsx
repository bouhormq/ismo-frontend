import { PropsWithChildren } from "react";

function CalendarDateCellWrapper(props: PropsWithChildren) {
  return <div className="h-full w-full">{props.children}</div>;
}

export default CalendarDateCellWrapper;
