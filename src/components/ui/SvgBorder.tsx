import { cn } from "$/utils/functions/misc.functions";

type Props = {
  color?: string;
  activeColor?: string;
  width?: number;
  radius?: number;
  dashesSpacing?: number | number[];
  isActive?: boolean;
  className?: string;
};

export default function SvgBorder({
  color = "#b3b3b3",
  activeColor = "#556AEB",
  width = 2,
  radius = 6,
  dashesSpacing = 0,
  isActive,
  className,
}: Props) {
  const strokeDasharray = Array.isArray(dashesSpacing)
    ? dashesSpacing.join(",")
    : dashesSpacing;

  return (
    <svg
      width="100%"
      height="100%"
      role="img"
      aria-label="border"
      className={cn("pointer-events-none absolute inset-0", className)}
      stroke={isActive ? activeColor : color}
    >
      <rect
        width="100%"
        height="100%"
        fill="none"
        rx={radius}
        ry={radius}
        strokeWidth={width}
        strokeDasharray={strokeDasharray}
        strokeDashoffset="10"
        strokeLinecap="round"
        className={cn("duration-100", isActive && "animate-move-svg-border")}
      />
    </svg>
  );
}
