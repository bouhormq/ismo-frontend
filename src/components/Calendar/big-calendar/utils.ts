import clip from "text-clipper";

// import { OpeningHoursType } from "$/types/store/store.type";
import type { DisabledCalendarEvent } from ".";
import { PositionObj } from "../CalendarEvent/CalendarEvent";
import { TCalendarEvent } from "../context/CalendarProvider";

export type ColorType = `#${string}`;
export interface CabinTitleSlot {
  props: {
    color: string;
    onClick: () => void;
  };
}

export function shortenText(
  text: string,
  maxLength: number,
  options?: object,
): string {
  return clip(text, maxLength, {
    breakWords: true,
    ...options,
  });
}

/** Return the date to a specific Date such as Monday  */
export function returnDateTo(
  date: Date,
  targetDay = 1,
  options?: { forceBackward?: boolean; resetTime?: boolean; endDate?: boolean },
) {
  if (date.getDay() === 0) return date;
  let adjustedTargetDay = targetDay;
  if (adjustedTargetDay === 0)
    adjustedTargetDay = options?.forceBackward ? 0 : 7;

  const currentDate = date;
  const currentDayOfWeek = currentDate.getDay();
  const daysToAdd = adjustedTargetDay - currentDayOfWeek;
  const adjustedDate = new Date(currentDate);
  adjustedDate.setDate(currentDate.getDate() + daysToAdd);

  if (options?.resetTime == true) {
    adjustedDate.setHours(0, 0, 0, 0);
  }

  if (options?.endDate == true) {
    adjustedDate.setHours(23, 59, 59);
  }

  return adjustedDate;
}

/** seperate a range of days to single days */
export function separateDateRanges(
  disabledEvents: DisabledCalendarEvent[],
): DisabledCalendarEvent[] {
  const separatedEvents: DisabledCalendarEvent[] = [];

  for (const event of disabledEvents) {
    const currentDate = new Date(event.start);

    while (currentDate <= event.end) {
      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999);

      separatedEvents.push({
        start: new Date(currentDate),
        end: endOfDay,
      });

      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(0, 0, 0, 0);
    }
  }

  return separatedEvents;
}

export function getDateWithTimezoneDifference(date: Date | string) {
  if (date.toString().includes("-")) {
    const xStart = date.toString().split("T")[1].split(":");

    const xStartingHour = xStart[0];
    const xStartingMinute = xStart[1];

    const lastDate = new Date(date).setHours(
      Number(xStartingHour),
      Number(xStartingMinute),
    );
    return lastDate;
  } else {
    const stringDate = date.toString();

    const hoursAndMinutes = stringDate.split(" ")[4].split(":");
    const hour = hoursAndMinutes[0];
    const minute = hoursAndMinutes[1];

    const test = new Date(date).setUTCHours(Number(hour), Number(minute));
    return test;
  }
}

/** seperate a day into time slots within the same day */
export function separateDateTimeRanges(
  disabledEvents: TCalendarEvent[],
  minuteInterval: number,
): TCalendarEvent[] {
  const separatedEvents: TCalendarEvent[] = [];

  for (const event of disabledEvents) {
    let currentDateTime = new Date(event.start);
    const eventEnd = new Date(event.end);

    while (currentDateTime.getTime() < eventEnd.getTime()) {
      const nextDateTime = new Date(
        currentDateTime.getTime() + minuteInterval * 60000,
      );

      if (nextDateTime.getTime() > eventEnd.getTime()) {
        separatedEvents.push({
          ...event,
          start: new Date(currentDateTime),
          end: new Date(eventEnd),
        });
      } else {
        separatedEvents.push({
          ...event,
          start: new Date(currentDateTime),
          end: new Date(nextDateTime.getTime() - 1),
        });
      }

      currentDateTime = nextDateTime;
    }
  }

  return separatedEvents;
}

export const compareDatesByDay = (date1: Date, date2: Date) => {
  const newDate1 = new Date(date1);
  const newDate2 = new Date(date2);
  const today = new Date();

  newDate1.setFullYear(today.getFullYear());
  newDate2.setFullYear(today.getFullYear());
  newDate1.setMonth(today.getMonth());
  newDate2.setMonth(today.getMonth());

  return newDate1.getTime() >= newDate2.getTime();
};

const aboveClassName = "bottom-full left-1/2 -translate-x-1/2";
const belowClassName = "left-1/2 top-full -translate-x-1/2";
const leftClassName = "right-full top-1/2 -translate-y-1/2";
const rightClassName = "left-full top-1/2 -translate-y-1/2";
const aboveRightClassName = "left-0 bottom-full";
const aboveLeftClassName = "right-0 bottom-full";
const belowRightClassName = "left-0 top-full";
const belowLeftClassName = "right-0 top-full";
export function getCalendarPopupClassName(position?: PositionObj) {
  if (!position) return aboveClassName;

  const isDefault =
    position.canPlaceAbove &&
    position.canPlaceBelow &&
    position.canPlaceLeft &&
    position.canPlaceRight;
  const isTopRight = position.canPlaceAbove && position.canPlaceRight;
  const isTopLeft = position.canPlaceAbove && position.canPlaceLeft;
  const isBottomRight = position.canPlaceBelow && position.canPlaceRight;
  const isBottomLeft = position.canPlaceBelow && position.canPlaceLeft;
  const isTop = position.canPlaceAbove;
  const isBottom = position.canPlaceBelow;
  const isLeft = position.canPlaceLeft;
  const isRight = position.canPlaceRight;

  return isDefault
    ? aboveClassName
    : isBottom
      ? belowClassName
      : isTop
        ? aboveClassName
        : isLeft
          ? leftClassName
          : isRight
            ? rightClassName
            : isBottomRight
              ? belowRightClassName
              : isBottomLeft
                ? belowLeftClassName
                : isTopRight
                  ? aboveRightClassName
                  : isTopLeft
                    ? aboveLeftClassName
                    : aboveClassName;

  return isDefault
    ? aboveClassName
    : isTopRight
      ? aboveRightClassName
      : isTopLeft
        ? aboveLeftClassName
        : isBottomRight
          ? belowRightClassName
          : isBottomLeft
            ? belowLeftClassName
            : isTop
              ? aboveClassName
              : isLeft
                ? leftClassName
                : isRight
                  ? rightClassName
                  : !isBottom
                    ? aboveClassName
                    : belowClassName;
}

export function isWithinOpeningHours(
  openingHours?: any[],
  value?: string,
): boolean {
  if (!openingHours) return true;

  const valueDate = new Date(value ?? "");
  const appointmentWeekday = valueDate.getDay();
  // Split opening hours into regular and exceptional hours
  const regularHours = openingHours.filter(
    (hours) =>
      !hours.exceptional &&
      new Date(hours.day).getDay() === appointmentWeekday &&
      hours.activated,
  );

  const exceptionalHours = openingHours.filter(
    (hours) =>
      hours.exceptional &&
      new Date(hours.day).toDateString() === valueDate.toDateString() &&
      hours.activated,
  );

  // Combine regular and exceptional hours into a single array to check
  const relevantOpeningHours = [...exceptionalHours, ...regularHours];

  // If no matching opening hours are found for the given day, return false
  if (relevantOpeningHours.length === 0) {
    return false;
  }
  const time = new Date(
    `1970-01-01T${valueDate.toTimeString().split(" ")[0]}Z`,
  ).getTime();

  for (const hours of relevantOpeningHours) {
    const openingStartTime = new Date(
      `1970-01-01T${new Date(hours.startingHour).toTimeString().split(" ")[0]}Z`,
    ).getTime();
    const openingEndTime = new Date(
      `1970-01-01T${new Date(hours.endingHour).toTimeString().split(" ")[0]}Z`,
    ).getTime();

    // Check if the appointment's start and end times are within the opening hours
    if (time >= openingStartTime && time <= openingEndTime) {
      return true;
    }
  }

  return false;
}
