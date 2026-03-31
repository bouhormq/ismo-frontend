import { isSameDay } from "date-fns";

import { weekDays } from "$/utils/functions/date.functions";
import { cn } from "$/utils/functions/misc.functions";

type Props = {
  date: Date;
};

export default function CalendarHeaderCell({ date }: Props) {
  const isToday = isSameDay(date, new Date());

  return (
    <span
      className={cn(
        "flex w-28 flex-col items-center gap-1 pb-2 opacity-30",
        isToday && "opacity-100",
      )}
    >
      {/* <SlotCounter
                containerClassName="text-5xl font-semibold"
                animateOnVisible={false}
                autoAnimationStart={false}
                animateUnchanged={false}
                value={weekdayDate.getDate().toString().padStart(2, "0")}
                sequentialAnimationMode
                delay={0.2}
                duration={1}
              /> */}
      <span className="text-base font-bold">{weekDays[date.getDay()]}</span>
      <span
        className={cn(
          "text-base font-bold",
          isToday && "bg-purple-normal aspect-square rounded-full p-3",
        )}
      >
        {date.getDate().toString().padStart(2, "0")}
      </span>
      <span className={cn("rounded-pill bg-foreground mt-4 block h-4 w-0.5")} />
    </span>
  );
}
