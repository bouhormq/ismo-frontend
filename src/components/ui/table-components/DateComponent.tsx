import { cn } from "../../../utils/functions/misc.functions";
import { formatDateToFrench } from "../MultiDateRange/date.function";

type Props = { date: Date; className?: string };
function DateComponent({ date, className }: Props) {
  const formattedDate = formatDateToFrench(date);
  return (
    <div
      className={cn(
        "border-normal w-fit whitespace-nowrap rounded-xl border-[1px] p-2 text-center text-xs font-bold",
        className,
      )}
    >
      {formattedDate}
    </div>
  );
}

export default DateComponent;
