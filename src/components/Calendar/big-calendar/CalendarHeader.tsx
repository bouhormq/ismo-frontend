import type { HeaderProps } from "react-big-calendar";

import { cn } from "$/utils/functions/misc.functions";

export default function CalendarHeader({ date }: HeaderProps) {
  const newDate = new Date(date);
  const name = newDate.toLocaleDateString("fr-FR", { weekday: "long" });
  const day = newDate.getDate();
  const isToday = new Date().toDateString() === newDate.toDateString();

  return (
    <div className="flex flex-col gap-1 border-b-0 py-2">
      {name.charAt(0).toUpperCase() + name.slice(1, 3)}
      <span className={cn("p-3", isToday && "bg-purple-normal rounded-full")}>
        {day}
      </span>
    </div>
  );
}
