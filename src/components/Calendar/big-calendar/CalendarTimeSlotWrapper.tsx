import React, { useEffect, useState } from "react";

import { cn } from "$/utils/functions/misc.functions";

import useCalendar from "../hooks/useCalendar";
import { isWithinOpeningHours } from "./utils";

function CalendarTimeSlotWrapper(props: {
  value: Date;
  children: React.ReactNode;
}) {
  const [isLabel, setIsLabel] = useState(false);
  const { storeOpeningHours } = useCalendar();

  useEffect(() => {
    React.Children.toArray(props.children).map((child) => {
      // @ts-ignore
      React.Children.toArray(child.props.children).map((grandchild) => {
        // @ts-ignore
        if (grandchild.props.className.includes("rbc-label")) setIsLabel(true);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValid = isWithinOpeningHours(
    storeOpeningHours,
    props.value.toISOString(),
  );

  if (
    isLabel &&
    props.value instanceof Date &&
    props.value.getMinutes() % 30 !== 0
  )
    return null;

  return (
    <div
      className={cn(
        "h-full w-full",
        !isLabel && !isValid && "bg-slate-300 opacity-50",
      )}
    >
      {props.children}
    </div>
  );
}

export default CalendarTimeSlotWrapper;
