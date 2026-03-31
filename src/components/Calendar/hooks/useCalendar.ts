import { useContext } from "react";

import { CalendarContext } from "../context/CalendarProvider";

export default function useCalendar() {
  return useContext(CalendarContext);
}
