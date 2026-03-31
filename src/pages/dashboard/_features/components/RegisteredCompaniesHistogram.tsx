import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Flexbox from "$/components/ui/Flexbox";
import "$/utils/functions/date.functions";

import { graphOptions } from "../constants.ts/constants";
import {
  Counts,
  categorizeDatesByDayV2,
  categorizeDatesByWeekOfMonthV2,
  categorizeDatesByYearMonthsV2,
  getUniqueYearsAndMonths,
} from "../constants.ts/functions";
import DatesMetricsSelectComponents from "./RegisteredCompaniesHistogramComponents/DatesMetricsSelectComponents";
import { OptionType } from "./SimpleDropdown";

export type CategoryOptions = "Semaine" | "Mois" | "Jour";
export type ExtendedValueType = { year: number; month: number };
export type YearOption = { label: string; value: number };
export type MonthOption = {
  label: string;
  value: { year: number; month: number };
};

type Props = {
  companiesCreatedDates: string[];
};

const RegisteredCompaniesHistogram = ({ companiesCreatedDates }: Props) => {
  const [data, setData] = useState<Counts[]>([]);
  const [category, setCategory] = useState<CategoryOptions>("Semaine");
  const [availableYears, setAvailableYears] = useState<YearOption[]>([]);
  const [availableMonths, setAvailableMonths] = useState<MonthOption[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    new Date().getMonth() + 1,
  );

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const latestMonth = Math.max(
      ...availableMonths
        .filter((m) => m.value.year === year)
        .map((m) => m.value.month),
    );
    setSelectedMonth(latestMonth);
  };

  const handleMonthChange = (option: ExtendedValueType | null) => {
    if (option) setSelectedMonth(option.month);
  };

  const handleCategoryChange = (option: OptionType) => {
    if (option.label) setCategory(option.label as CategoryOptions);
  };

  useEffect(() => {
    const { years, months } = getUniqueYearsAndMonths(companiesCreatedDates);
    setAvailableYears(years);
    setAvailableMonths(months);

    const filteredDates = companiesCreatedDates.filter(
      (date) => new Date(date).getFullYear() === selectedYear,
    );

    if (category === "Mois") {
      setData(categorizeDatesByYearMonthsV2(filteredDates));
    } else {
      setData(categorizeDatesByWeekOfMonthV2(filteredDates));
    }
  }, [companiesCreatedDates, selectedYear, category]);

  useEffect(() => {
    if (selectedMonth !== null && category !== "Mois") {
      const filteredDates = companiesCreatedDates.filter(
        (date) =>
          new Date(date).getFullYear() === selectedYear &&
          new Date(date).getMonth() + 1 === selectedMonth,
      );

      switch (category) {
        case "Semaine":
          setData(categorizeDatesByWeekOfMonthV2(filteredDates));
          break;
        case "Jour":
          setData(categorizeDatesByDayV2(filteredDates));
          break;
      }
    }
  }, [selectedYear, selectedMonth, category, companiesCreatedDates]);

  return (
    <>
      <Flexbox row fullWidth justify="between">
        <DatesMetricsSelectComponents
          availableMonths={availableMonths}
          availableYears={availableYears}
          graphOptions={graphOptions}
          handleCategoryChange={handleCategoryChange}
          handleMonthChange={handleMonthChange}
          handleYearChange={handleYearChange}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          key={selectedYear}
          selectedCategory={category}
        />
      </Flexbox>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -40, bottom: 10 }}
          >
            <CartesianGrid strokeOpacity="0.4" horizontal vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6C757D", fontSize: 12 }}
              tickMargin={8}
              interval={0}
              style={{ fontSize: "clamp(7px, 0.7vw, 16px)" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#6C757D", fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#002855" barSize={14} radius={100} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default RegisteredCompaniesHistogram;
