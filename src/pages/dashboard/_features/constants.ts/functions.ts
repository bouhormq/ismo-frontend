import {
  MonthOption,
  YearOption,
} from "../components/RegisteredCompaniesHistogram";

export type Counts = {
  label: string;
  value: number;
};

const padDate = (date: number): string => String(date).padStart(2, "0");
const capitalizeDayName = (dayName: string): string =>
  dayName.charAt(0).toUpperCase() + dayName.slice(1).replace(".", "");

export const categorizeDatesByDayV2 = (dates: string[]): Counts[] => {
  const dayMap: Map<string, { count: number; date: Date }> = new Map();

  dates.forEach((date) => {
    const d = new Date(date);
    const dayName = d.toLocaleString("fr-FR", { weekday: "short" });
    // const weekNumber = Math.ceil(d.getDate() / 7);
    const capitalizedDayName = capitalizeDayName(dayName);
    const day = padDate(d.getDate());
    const monthNumber = padDate(d.getMonth() + 1);

    const label = `${capitalizedDayName} - ${day}/${monthNumber}`;

    const existingEntry = dayMap.get(label);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      dayMap.set(label, { count: 1, date: d });
    }
  });

  const result = Array.from(dayMap.entries()).map(
    ([label, { count, date }]) => ({
      label,
      value: count,
      date,
    }),
  );

  result.sort((a, b) => a.date.getTime() - b.date.getTime());

  return result.map(({ label, value }) => ({ label, value }));
};

export const categorizeDatesByWeekOfMonthV2 = (dates: string[]): Counts[] => {
  const weekMap: Map<string, { count: number; startOfWeek: Date }> = new Map();

  dates.forEach((date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth();
    const dayOfMonth = d.getDate();

    const startOfWeek = new Date(year, month, dayOfMonth - d.getDay() + 1);
    const endOfWeek = new Date(year, month, dayOfMonth + (6 - d.getDay()));

    const startLabel = startOfWeek.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
    });

    const endLabel = endOfWeek.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
    });

    const capitalizedStartLabel = capitalizeDayName(startLabel);
    const capitalizedEndLabel = capitalizeDayName(endLabel);
    const label = `${capitalizedStartLabel} - ${capitalizedEndLabel}`;

    const existingEntry = weekMap.get(label);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      weekMap.set(label, { count: 1, startOfWeek });
    }
  });

  const result = Array.from(weekMap.entries()).map(
    ([label, { count, startOfWeek }]) => ({
      label,
      value: count,
      startOfWeek,
    }),
  );

  result.sort((a, b) => a.startOfWeek.getTime() - b.startOfWeek.getTime());

  return result.map(({ label, value }) => ({ label, value }));
};

export const categorizeDatesByMonthV2 = (dates: string[]): Counts[] => {
  const monthMap: Map<string, { count: number; date: Date }> = new Map();

  dates.forEach((date) => {
    const d = new Date(date);
    const month = d.toLocaleString("fr-FR", { month: "long" });
    const year = d.getFullYear();

    const label = `${month} ${year}`;

    const existingEntry = monthMap.get(label);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      monthMap.set(label, { count: 1, date: new Date(year, d.getMonth(), 1) });
    }
  });

  const result = Array.from(monthMap.entries()).map(
    ([label, { count, date }]) => ({
      label,
      value: count,
      date,
    }),
  );

  result.sort((a, b) => a.date.getTime() - b.date.getTime());

  return result.map(({ label, value }) => ({ label, value }));
};

export const getUniqueYearsAndMonths = (
  dates: string[],
): { years: YearOption[]; months: MonthOption[] } => {
  const yearMonthMap: Map<number, Set<number>> = new Map();

  dates.forEach((date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    if (!yearMonthMap.has(year)) {
      yearMonthMap.set(year, new Set());
    }
    yearMonthMap.get(year)?.add(month);
  });

  const years: YearOption[] = Array.from(yearMonthMap.keys()).map((year) => ({
    label: `${year}`,
    value: year,
  }));

  const months: MonthOption[] = Array.from(yearMonthMap.entries()).flatMap(
    ([year, monthsSet]) =>
      Array.from(monthsSet).map((month) => ({
        label: `${year}-${month.toString().padStart(2, "0")}`,
        value: { year, month },
      })),
  );

  return { years, months };
};

export const categorizeDatesByYearMonthsV2 = (dates: string[]): Counts[] => {
  const yearMonthMap: Map<string, { count: number; date: Date }> = new Map();

  dates.forEach((date) => {
    const d = new Date(date);
    const month = d.toLocaleString("fr-FR", { month: "long" });
    const year = d.getFullYear();

    const label = `${month} ${year}`;

    const existingEntry = yearMonthMap.get(label);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      yearMonthMap.set(label, {
        count: 1,
        date: new Date(year, d.getMonth(), 1),
      });
    }
  });

  const result = Array.from(yearMonthMap.entries()).map(
    ([label, { count, date }]) => ({
      label,
      value: count,
      date,
    }),
  );

  result.sort((a, b) => a.date.getTime() - b.date.getTime());

  return result.map(({ label, value }) => ({ label, value }));
};
