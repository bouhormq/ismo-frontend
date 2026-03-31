import { ChevronLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "../../../utils/functions/misc.functions";
import Button from "../Button";
import Flexbox from "../Flexbox";
import {
  calendarEntries,
  compareDates,
  dateNames,
  monthNames,
} from "./date.function";

type MapCalendarProps = {
  onDate?: (startDate: Date, endDate: Date | undefined) => void;
  firstDate?: Date;
  lastDate?: Date;
  disabledDaysAfterYesterday?: number;
  onCancel?: () => void;
  singleDate?: boolean;
  automaticApply?: boolean;
  value?: string;
  showResetButton?: boolean;
  handleReset?: () => void;
};

export const MultiDatePicker = ({
  onDate,
  firstDate,
  handleReset,
  lastDate,
  disabledDaysAfterYesterday = 0,
  onCancel,
  singleDate = false,
  automaticApply = false,
  value,
  showResetButton,
}: MapCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const entries = calendarEntries(year, month);

  const [startDate, setStartDate] = useState<Date | undefined>(firstDate);
  const [endDate, setEndDate] = useState<Date | undefined>(lastDate);
  const [hoverDate, setHoverDate] = useState<Date>();
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(year.toString());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isBeforeToday = (entryDate: { date: number; month: number }) => {
    if (disabledDaysAfterYesterday === -1) return false;
    const extraDisabledDaysTime =
      disabledDaysAfterYesterday * 24 * 60 * 60 * 1000;
    const checkDate = new Date(year, entryDate.month, entryDate.date);
    return checkDate.getTime() < today.getTime() + extraDisabledDaysTime;
  };

  const isDateInRange = (checkDate: Date) => {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    const hover = hoverDate ? new Date(hoverDate) : undefined;
    const check = new Date(checkDate).getTime();

    if (start) {
      start.setDate(start.getDate() - 1);
    }

    const startTimestamp = start?.getTime();
    const endTimestamp = end?.getTime();
    const hoverTimestamp = hover?.getTime();

    if (startTimestamp && !endTimestamp && hoverTimestamp) {
      return (
        check >= Math.min(startTimestamp, hoverTimestamp) &&
        check <= Math.max(startTimestamp, hoverTimestamp)
      );
    }

    return (
      startTimestamp &&
      endTimestamp &&
      check >= Math.min(startTimestamp, endTimestamp) &&
      check <= Math.max(startTimestamp, endTimestamp)
    );
  };

  const handleDateClick = (entryDate: { date: number; month: number }) => {
    const newDate = new Date(Date.UTC(year, entryDate.month, entryDate.date));

    if (singleDate) {
      setStartDate(newDate);
      automaticApply && onDate?.(newDate, undefined);
      return;
    }

    if (!startDate || (startDate && endDate)) {
      setStartDate(newDate);
      setHoverDate(newDate);
      setEndDate(undefined);
      automaticApply && onDate?.(newDate, undefined);
    } else if (startDate && !endDate) {
      if (compareDates(newDate, startDate) === -1) {
        setEndDate(startDate);
        setStartDate(newDate);
        automaticApply && onDate?.(newDate, startDate);
      } else {
        setEndDate(newDate);
        automaticApply && onDate?.(startDate, newDate);
      }
    }
  };

  const handleDateHover = (entryDate: { month: number; date: number }) => {
    if (startDate && !endDate) {
      const newHoverDate = new Date(year, entryDate.month, entryDate.date);
      setHoverDate(newHoverDate);
    }
  };

  const handleCancel = () => {
    setStartDate(undefined);
    setEndDate(undefined);

    if (onCancel) onCancel();
  };

  const handleApply = () => {
    if (startDate && endDate) {
      onDate?.(startDate, endDate);
    } else if (startDate) {
      onDate?.(startDate, undefined);
    }

    handleCancel();
  };

  const handleYearClick = () => {
    setIsEditingYear(true);
  };

  const handleYearInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setYearInput(value);
    }
  };

  const handleYearInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleYearInputBlur();
    }
  };

  const handleYearInputBlur = () => {
    let newYear = parseInt(yearInput, 10);
    if (isNaN(newYear) || newYear < 1700) {
      newYear = 1700;
    }
    if (newYear > 9999) {
      newYear = 9999;
    }
    setYearInput(newYear.toString());
    setDate(new Date(newYear, month, day));
    setIsEditingYear(false);
    onDate?.(new Date(newYear, month, day), endDate);
  };

  useEffect(() => {
    const disabledDate = new Date();
    if (disabledDaysAfterYesterday === -1) return;
    disabledDate.setDate(
      disabledDate.getDate() + disabledDaysAfterYesterday - 1,
    );

    if (startDate && compareDates(startDate, disabledDate) === -1) {
      setStartDate(disabledDate);
    }
  }, [disabledDaysAfterYesterday, startDate]);

  useEffect(() => {
    if (!singleDate) {
      if (value === undefined || value === "undefined-undefined") {
        setStartDate(undefined);
        setEndDate(undefined);
      }
    }
    if (singleDate && value) {
      setStartDate(new Date(value));
    }
  }, [singleDate, value]);

  return (
    <Flexbox
      fullWidth
      className="relative max-w-80 select-none rounded-2xl p-4 text-center 13inch:max-w-60 13inch:p-3"
    >
      <Flexbox fullWidth align="center" justify="center">
        {/* Previous Month Button */}
        <Flexbox
          onClick={() => {
            setDate(
              new Date(
                month <= 0 ? year - 1 : year,
                month <= 0 ? 11 : month - 1,
                day,
              ),
            );
          }}
          className="absolute left-0 cursor-pointer px-2 py-1"
        >
          <ChevronLeftIcon size={20} />
        </Flexbox>
        {/* Month and Year Selectors */}
        <Flexbox
          fullWidth
          row
          align="center"
          justify="center"
          className="gap-1"
        >
          <p className="font-bold">{monthNames[month]}</p>
          {isEditingYear ? (
            <input
              type="text"
              value={yearInput}
              onChange={handleYearInputChange}
              onKeyDown={handleYearInputKeyDown}
              onBlur={handleYearInputBlur}
              className="w-12 border-b-2 border-black text-center font-bold outline-none"
              autoFocus
            />
          ) : (
            <p className="cursor-pointer font-bold" onClick={handleYearClick}>
              {year}
            </p>
          )}
        </Flexbox>
        {/* Next Month Button */}
        <Flexbox
          className="absolute right-0 cursor-pointer px-2 py-1"
          onClick={() => {
            setDate(
              new Date(
                month >= 11 ? year + 1 : year,
                month >= 11 ? 0 : month + 1,
                day,
              ),
            );
          }}
        >
          <ChevronLeftIcon size={20} className="rotate-180" />
        </Flexbox>
      </Flexbox>

      {/* Calendar Header */}
      <Flexbox
        fullWidth
        row
        className="grid-cols-7 items-center justify-center gap-1"
      >
        {dateNames.map((dateName) => (
          <p className="my-3 w-10 text-center text-xs" key={dateName}>
            {dateName.slice(0, 3)}.
          </p>
        ))}
      </Flexbox>

      {/* Calendar Body */}
      <Flexbox row className="grid-cols-7 grid-rows-5 flex-wrap justify-center">
        {entries.map((entry) => {
          const entryDate = new Date(year, entry.month, entry.date);
          const isPastDate = isBeforeToday({
            date: entry.date + 1,
            month: entry.month,
          });

          const isOtherMonths = entry.month !== month;
          const isActive =
            (startDate && compareDates(entryDate, startDate) == 1) ||
            (endDate && compareDates(entryDate, endDate) == 1);
          const isInRange = isDateInRange(entryDate);

          const isStartDate =
            startDate && compareDates(entryDate, startDate) === 1;
          const isEndDate = endDate && compareDates(entryDate, endDate) === 1;

          return (
            <button
              key={`${entry.month}-${entry.date}`}
              type="button"
              className={cn(
                "hover:bg-primary-light mt-1 h-10 w-10 cursor-pointer border-2 border-none p-2 text-center font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50 13inch:h-7 13inch:w-7 13inch:p-1",
                isPastDate && "text-gray-400",
                isInRange && !singleDate && "bg-gray-200",
                (isStartDate || isEndDate) &&
                  "before:border-purple-normal relative border-2 text-white before:absolute before:inset-0 before:aspect-square before:h-full before:w-full before:scale-110 before:rounded-full before:border-2 before:bg-blue-normal",
                isStartDate && "rounded-l-full",
                isEndDate && "rounded-r-full",
                isOtherMonths && "font-normal text-gray-400",
                singleDate && "rounded-full",
              )}
              disabled={isPastDate}
              onClick={() => handleDateClick(entry)}
              onMouseEnter={() => handleDateHover(entry)}
            >
              <p
                color={isActive || isInRange ? "white" : "black"}
                className="13inch:text-font10 relative z-10 text-sm"
              >
                {entry.date}
              </p>
            </button>
          );
        })}
      </Flexbox>
      {!automaticApply && (
        <Flexbox
          row
          fullWidth
          justify="end"
          className="mt-4 gap-3 border-t-2 pt-4 13inch:mt-2 13inch:pt-0"
        >
          <Button
            variant="outlined"
            className="shadow-custom flex items-center justify-center rounded-lg p-2 text-sm"
            onClick={handleCancel}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            className="flex items-center justify-center rounded-lg p-2 text-sm"
            disabled={!startDate}
            onClick={handleApply}
          >
            Appliquer
          </Button>
        </Flexbox>
      )}
      {showResetButton && (
        <Flexbox
          row
          fullWidth
          justify="end"
          className="mt-4 gap-3 border-t-2 pt-4 13inch:mt-2 13inch:pt-0"
        >
          <Button
            variant="outlined"
            className="shadow-custom flex items-center justify-center rounded-lg border-red-400 p-2 text-sm text-red-400 13inch:mt-2"
            onClick={handleReset}
          >
            Réinitialiser
          </Button>
        </Flexbox>
      )}
    </Flexbox>
  );
};
