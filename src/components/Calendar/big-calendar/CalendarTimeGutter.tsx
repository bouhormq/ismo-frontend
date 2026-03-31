import { PropsWithChildren } from "react";

function CalendarTimeGutter(props: PropsWithChildren) {
  // if the value is a date, and it's minutes are not 00 or 30, return null
  // if (props.value instanceof Date && props.value.getMinutes() % 30 !== 0) {
  //   return null;
  // }

  // if (props.value instanceof Date && props.value.getMinutes() % 30 !== 0) {
  //   return null;
  // }

  return <div>{props.children}</div>;
}

export default CalendarTimeGutter;
