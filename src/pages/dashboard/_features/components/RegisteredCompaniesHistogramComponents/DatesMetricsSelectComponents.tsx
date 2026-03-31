import Flexbox from "$/components/ui/Flexbox";

import {
  CategoryOptions,
  ExtendedValueType,
  MonthOption,
  YearOption,
} from "../RegisteredCompaniesHistogram";
import { OptionType, SimpleDropdown } from "../SimpleDropdown";

type Props = {
  availableYears: YearOption[];
  selectedYear: number;
  handleYearChange: (year: number) => void;
  availableMonths: MonthOption[];
  selectedMonth: number | null;
  handleMonthChange: (month: ExtendedValueType) => void;
  graphOptions: { label: string; value: string }[];
  handleCategoryChange: (option: OptionType) => void;
  selectedCategory: CategoryOptions;
};

const DatesMetricsSelectComponents = ({
  availableMonths,
  availableYears,
  handleMonthChange,
  handleYearChange,
  selectedMonth,
  selectedYear,
  graphOptions,
  handleCategoryChange,
  selectedCategory,
}: Props) => {
  return (
    <Flexbox row fullWidth justify="end">
      {availableYears.length > 1 && (
        <SimpleDropdown
          options={availableYears.map((year) => {
            return { label: `${year.value}`, value: `${year.value}` };
          })}
          defaultOption={{
            label: `${selectedYear}`,
            value: `${selectedYear}`,
          }}
          handleOnClick={(option) => handleYearChange(Number(option.value))}
        />
      )}
      {availableMonths.length > 1 &&
        selectedYear &&
        selectedCategory !== "Mois" && (
          <SimpleDropdown
            options={availableMonths.filter(
              (m) => m.value.year === selectedYear,
            )}
            defaultOption={{
              label: `${selectedYear}-${selectedMonth?.toString().padStart(2, "0")}`,
              value: `${selectedMonth}`,
            }}
            handleOnClick={(option) =>
              handleMonthChange(option.value as ExtendedValueType)
            }
          />
        )}
      {selectedMonth !== null && (
        <SimpleDropdown
          options={graphOptions}
          defaultOption={
            graphOptions.find((opt) => opt.label === selectedCategory) ||
            graphOptions[0]
          }
          handleOnClick={handleCategoryChange}
        />
      )}
    </Flexbox>
  );
};

export default DatesMetricsSelectComponents;
