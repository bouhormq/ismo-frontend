import { DateHeaderProps } from "react-big-calendar";

function MyMonthDateHeader({ date }: DateHeaderProps) {
  const dayOfTheMonth = date.getDate();

  return <div className="h-10">{dayOfTheMonth}</div>;
}

export default MyMonthDateHeader;
