import { formatHour } from "$/utils/functions/date.functions";
import { cn } from "$/utils/functions/misc.functions";

type Props = {
  hour: number;
  isActiveHour: boolean;
};

export default function CalendarSidebarCell({ hour, isActiveHour }: Props) {
  return (
    <span
      className={cn(
        "relative flex min-h-20 items-center p-4 opacity-30",
        isActiveHour && "text-wisteria font-semibold opacity-100",
      )}
    >
      {isActiveHour && (
        <span className="bg-wisteria absolute right-0 h-3 w-0.5" />
      )}
      {formatHour(hour)}
    </span>
  );
}
