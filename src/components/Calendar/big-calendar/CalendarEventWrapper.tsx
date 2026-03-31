import { PropsWithChildren } from "react";

export interface CalendarEvent {
  allDay?: boolean | undefined;
  title?: React.ReactNode | undefined;
  start?: Date | undefined;
  end?: Date | undefined;
  resource?: any;
}

function CalendarEventWrapper({ children }: PropsWithChildren<CalendarEvent>) {
  return <div className="relative">{children}</div>;
}

export default CalendarEventWrapper;
