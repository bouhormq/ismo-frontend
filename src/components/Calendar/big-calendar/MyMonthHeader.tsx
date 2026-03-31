import { HeaderProps } from "react-big-calendar";

import { formatDayToFrenchWeekDay } from "$/components/ui/MultiDateRange/date.function";

function MyMonthHeader({ date }: HeaderProps) {
  const dayOfTheWeek = formatDayToFrenchWeekDay(date);
  return <div className="h-10">{dayOfTheWeek}</div>;
}

export default MyMonthHeader;
