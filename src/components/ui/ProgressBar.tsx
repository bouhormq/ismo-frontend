import { cn } from "../../utils/functions/misc.functions";

type Props = {
  progress: number;
  barClassName?: string;
  valueClassName?: string;
};

function ProgressBar({ barClassName, valueClassName, progress }: Props) {
  return (
    <div className={cn(barClassName, "h-4 w-full rounded-full bg-blue-light")}>
      <div
        className={cn(
          valueClassName,
          "bg-progress-bar relative h-full overflow-hidden rounded-full transition-all duration-300",
        )}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
