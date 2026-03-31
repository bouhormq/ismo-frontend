import moment from "moment";
import { useRef, useState } from "react";

import CalendarIcon from "$/icons/CalendarIcon";

import useOutsideClick from "../../../hooks/useOutsideClick";
import { cn, formatDate } from "../../../utils/functions/misc.functions";
import { MultiDatePicker } from "./MultiDateRange";

type Props = {
  handleSetDateRange: (startDate: Date, endDate: Date | undefined) => void;
  placeholder?: string;
  value?: string;
  className?: string;
  automaticApply?: boolean;
  singleDate?: boolean;
  iconClassName?: string;
  calendarClassName?: string;
  handleFocus?: () => void;
  handleBlur?: () => void;
  disabled?: boolean;
  showResetButton?: boolean;
  handleReset?: () => void;
};
const StyledDatePicker = ({
  handleSetDateRange,
  placeholder,
  value,
  className,
  automaticApply = true,
  iconClassName,
  singleDate,
  calendarClassName,
  handleFocus,
  handleBlur,
  disabled,
  showResetButton,
  handleReset,
}: Props) => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  useOutsideClick(datePickerRef, () => {
    setOpen(false);
    handleBlur && handleBlur();
  });

  const handleSetReset = () => {
    setOpen(false);
    handleReset?.();
  };

  return (
    <div
      ref={datePickerRef}
      className={cn(
        "secondary-body-caption border-lightGray-input relative flex h-10 w-full cursor-pointer items-center justify-between gap-5 rounded-full bg-[#F4F5F7] p-2.5 px-4 py-[11px] text-black active:opacity-100 smallTabletScreen:px-2",
        {
          "pointer-events-none cursor-not-allowed opacity-70": disabled,
        },
        className,
      )}
      onClick={() => {
        if (disabled) return;
        if (open) handleBlur && handleBlur();
        else handleFocus && handleFocus();
        setOpen(!open);
      }}
    >
      {placeholder && (
        <span
          className={cn("text-xs font-normal text-[#6C757D]", {
            "text-sm text-black": value,
          })}
        >
          {placeholder}
        </span>
      )}
      {value && !placeholder && (
        <span
          className={cn("font-normal text-black mobileScreen:text-xs", {
            "no-scrollbar w-[85%] overflow-auto whitespace-nowrap text-xs":
              !singleDate && value.search("/") !== -1,
          })}
        >
          {singleDate ? formatDate(new Date(value)) : value}
        </span>
      )}
      <CalendarIcon
        width={17}
        // fill="black"
        className={cn(
          "absolute right-3 smallTabletScreen:right-2",
          iconClassName,
        )}
      />
      <div
        className={cn(
          "shadow-date absolute top-full z-[300] mt-3 w-max rounded-2xl bg-white",
          !open && "hidden",
          calendarClassName,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <MultiDatePicker
          showResetButton={showResetButton}
          onCancel={() => setOpen(false)}
          firstDate={
            value
              ? moment(value).isValid()
                ? new Date(value)
                : undefined
              : undefined
          }
          automaticApply={automaticApply}
          disabledDaysAfterYesterday={-1}
          onDate={handleSetDateRange}
          singleDate={singleDate}
          value={value}
          handleReset={handleSetReset}
        />
      </div>
    </div>
  );
};

export default StyledDatePicker;
