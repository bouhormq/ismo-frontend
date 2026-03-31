import { EventProps } from "react-big-calendar";

import CalendarEvent from "../CalendarEvent/CalendarEvent";
import { TCalendarEvent } from "../context/CalendarProvider";

function MyMonthEvent({ event }: EventProps<TCalendarEvent>) {
  return (
    <div className="h-full">
      <CalendarEvent event={event} />
    </div>
  );
}

export default MyMonthEvent;
