import { useQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

import { getFilterOptions } from "$/api/companies/get-filter-options";
import { FormDatePicker } from "$/components/form/FormDatePicker";
import ComboSelectComponent, {
  SelectOption,
} from "$/components/inputs/FormComboSelect/ComboSelectInput";
import Flexbox from "$/components/ui/Flexbox";
import { CompaniesReportTableFilters } from "$/types/api/companies-reports.types";

type Props = {
  tab: "companies" | "actions";
  handleSetFilter: (
    key: keyof CompaniesReportTableFilters,
    value?: string | Date | null,
  ) => void;
  tableFilters?: CompaniesReportTableFilters;
};

export const ReportsFilters = ({
  handleSetFilter,
  tab,
  tableFilters,
}: Props) => {
  const { setValue } = useFormContext();

  const handleDateRange = (
    key: "startDateRange" | "endDateRange",
    startDate: Date,
    endDate?: Date,
  ) => {
    const formattedValue =
      startDate.toISOString().split("T")[0] +
      (endDate ? `/${endDate.toISOString().split("T")[0]}` : "");
    if (key === "startDateRange") {
      setValue("startDateRange", formattedValue);
      handleSetFilter("startDateRange", formattedValue);
    } else {
      setValue("endDateRange", formattedValue);
      handleSetFilter("endDateRange", formattedValue);
    }
  };

  const { data } = useQuery({
    queryKey: ["company-filter-options"],
    queryFn: () => getFilterOptions(),
    gcTime: 0,
  });

  const handleFilter = (
    key: keyof CompaniesReportTableFilters,
    selectedOption: SelectOption<string> | SelectOption<string>[] | Date | null,
  ) => {
    if (!Array.isArray(selectedOption)) {
      if (selectedOption !== null) {
        if (selectedOption instanceof Date) {
          handleSetFilter(key, selectedOption);
        } else {
          handleSetFilter(key, selectedOption.value);
        }
      }
      return;
    }
  };

  return (
    <Flexbox
      fullWidth
      fullHeight
      className="gap-4"
      key={JSON.stringify(tableFilters)}
    >
      <ComboSelectComponent<string>
        name="industries"
        withFilter
        isClearable
        returnSingleValue
        placeHolder="Selectionner"
        label="Industrie"
        handleOnSelect={(selectedOption) =>
          handleFilter("industries", selectedOption)
        }
        options={data?.industries || []}
        onClearOptions={() => {
          handleSetFilter("industries", null);
        }}
        wrapperClassName="w-full"
      />
      <ComboSelectComponent<string>
        name="categories"
        withFilter
        isClearable
        returnSingleValue
        placeHolder="Selectionner"
        label="Catégorie"
        handleOnSelect={(selectedOption) =>
          handleFilter("categories", selectedOption)
        }
        options={data?.categories || []}
        onClearOptions={() => {
          handleSetFilter("categories", undefined);
        }}
        wrapperClassName="w-full"
      />

      <ComboSelectComponent<string>
        name="sections"
        withFilter
        returnSingleValue
        isClearable
        label="Rubrique"
        placeHolder="Selectionner"
        defaultOuterValue={tableFilters?.sections}
        handleOnSelect={(selectedOption) =>
          handleFilter("sections", selectedOption)
        }
        onClearOptions={() => {
          handleSetFilter("sections", null);
        }}
        options={data?.sections || []}
        wrapperClassName="w-full"
      />
      <ComboSelectComponent<string>
        name="companyName"
        withFilter
        returnSingleValue
        isClearable
        label="Société"
        placeHolder="Selectionner"
        handleOnSelect={(selectedOption) =>
          handleFilter("companyName", selectedOption)
        }
        onClearOptions={() => {
          handleSetFilter("companyName", null);
        }}
        options={data?.companies || []}
        wrapperClassName="w-full"
      />
      {tab === "companies" ? (
        <ComboSelectComponent<string>
          name="companyPotential"
          withFilter
          returnSingleValue
          isClearable
          label="Potentiel Actuel"
          placeHolder="Selectionner"
          handleOnSelect={(selectedOption) =>
            handleFilter("companyPotential", selectedOption)
          }
          onClearOptions={() => {
            handleSetFilter("companyPotential", null);
          }}
          options={data?.companiesPotentials || []}
          wrapperClassName="w-full"
        />
      ) : (
        <>
          <ComboSelectComponent<string>
            name="actionType"
            withFilter
            returnSingleValue
            isClearable
            label="Type d'action"
            placeHolder="Selectionner"
            handleOnSelect={(selectedOption) =>
              handleFilter("actionType", selectedOption)
            }
            onClearOptions={() => {
              handleSetFilter("actionType", null);
            }}
            options={data?.actionsTypes || []}
            wrapperClassName="w-full"
          />
          <ComboSelectComponent<string>
            name="doneBy"
            withFilter
            returnSingleValue
            isClearable
            label="Fait par"
            placeHolder="Selectionner"
            handleOnSelect={(selectedOption) =>
              handleFilter("addedBy", selectedOption)
            }
            onClearOptions={() => {
              handleSetFilter("addedBy", "");
            }}
            options={data?.addedBy || []}
            wrapperClassName="w-full"
          />
          <ComboSelectComponent<string>
            name="object"
            withFilter
            returnSingleValue
            isClearable
            label="Objet"
            placeHolder="Selectionner"
            handleOnSelect={(selectedOption) =>
              handleFilter("object", selectedOption)
            }
            onClearOptions={() => {
              handleSetFilter("object", null);
            }}
            options={data?.objects || []}
            wrapperClassName="w-full"
          />
          <ComboSelectComponent<string>
            name="done"
            withFilter
            returnSingleValue
            isClearable
            label="Fait"
            placeHolder="Selectionner"
            handleOnSelect={(selectedOption) =>
              handleFilter("done", selectedOption)
            }
            onClearOptions={() => {
              handleSetFilter("done", null);
            }}
            options={[
              { label: "Fait", value: "true" },
              { label: "Non fait", value: "false" },
            ]}
            wrapperClassName="w-full"
          />

          <FormDatePicker
            labelWrapperClassName="w-full"
            name="startDateRange"
            handleSetDateRange={(start, end) => {
              handleDateRange("startDateRange", start, end);
            }}
            label="Date de début"
          />
          <FormDatePicker
            labelWrapperClassName="w-full"
            name="endDateRange"
            handleSetDateRange={(start, end) => {
              handleDateRange("endDateRange", start, end);
            }}
            label="Date de fin"
          />
        </>
      )}
    </Flexbox>
  );
};
