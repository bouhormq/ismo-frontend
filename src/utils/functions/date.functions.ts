import { format as dateFnsFormat } from "date-fns";
import { fr } from "date-fns/locale";

import { CalendarViewMode } from "$/components/Calendar/ToggleableCalendarView/ToggleableCalendarView";

import { SelectOption } from "../types/misc.types";

export const format = (date: Date, formatString: string) => {
  const formattedDate = dateFnsFormat(date, formatString, { locale: fr });
  return formattedDate.replace(/(\b[a-z])/, (match) => match.toUpperCase());
};

export function formatHour(hour: number) {
  if (hour === 0) return "12 am";
  if (hour === 12) return "12 pm";
  if (hour < 12) return `${hour} am`;
  return `${hour - 12} pm`;
}

export const weekDays = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

export function convertViewModeToLabel(mode: CalendarViewMode) {
  switch (mode) {
    case "day":
      return "Jour";
    case "week":
      return "Semaine";
    case "month":
      return "Mois";
    default:
      return "";
  }
}

export function getDisplayTime(date?: Date | string) {
  if (!date) return "";

  // const dateCopy = addHours(date, -3);
  const dateCopy = new Date(date);

  // append 0 if minutes or hours are less than 10
  const minutes =
    dateCopy.getMinutes() < 10
      ? `0${dateCopy.getMinutes()}`
      : dateCopy.getMinutes();
  const hours =
    dateCopy.getHours() < 10 ? `0${dateCopy.getHours()}` : dateCopy.getHours();

  return `${hours}:${minutes}`;
}

export function isDurationGreaterThan15Mintues(start: Date, end: Date) {
  return end.getTime() - start.getTime() > 15 * 60 * 1000;
}

export const monthlyOptions: SelectOption[] = [
  { value: "month", label: "Mois" },
  { value: "week", label: "Semaine" },
  { value: "day", label: "Jour" },
];
