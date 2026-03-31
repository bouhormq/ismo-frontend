import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { CompaniesTableFilters } from "$/api/companies/get-all-companies";
import {
  deleteCompanyCategory,
  deleteCompanyIndustry,
  deleteCompanySection,
} from "$/api/companies/delete-filter-option";
import { getFilterOptions } from "$/api/companies/get-filter-options";
import CitiesInput from "$/components/common/CitiesInput";
import { FormDatePicker } from "$/components/form/FormDatePicker";
import ComboSelectComponent, {
  SelectOption,
} from "$/components/inputs/FormComboSelect/ComboSelectInput";
import Flexbox from "$/components/ui/Flexbox";
import {
  COMPANY_POTENTIAL_OPTIONS,
  POTENTIALS,
} from "$/utils/constants/company.constants";
import { COUNTRIES } from "$/utils/constants/countries.constants";
import { cn } from "$/utils/functions/misc.functions";
import { CountryType } from "$/utils/types/misc.types";

import ManageFilterOptionsModal from "./ManageFilterOptionsModal";

type Props = {
  handleSetFilter: (key: keyof CompaniesTableFilters, value: string) => void;
};

const CompaniesFilters = ({ handleSetFilter }: Props) => {
  const form = useFormContext();

  const { setValue, watch } = form;
  const values = watch();

  const { companyPotential } = values;

  const [manageCategoriesOpen, setManageCategoriesOpen] = useState(false);
  const [manageSectionsOpen, setManageSectionsOpen] = useState(false);
  const [manageIndustriesOpen, setManageIndustriesOpen] = useState(false);

  const country = values.country as CountryType | undefined;

  const { data } = useQuery({
    queryKey: ["company-filter-options"],
    queryFn: () => getFilterOptions(),
    gcTime: 0,
  });

  const countriesOptions = useMemo(
    () =>
      COUNTRIES.map((country) => ({
        label: country,
        value: country,
      })),
    [],
  );

  const handleChangeDate = (
    key: "createdAt" | "updatedAt" | "lastProspectionCall",
    startDate: Date,
    endDate?: Date,
  ) => {
    setValue(
      key,
      startDate.toISOString().split("T")[0] +
        (endDate ? `/${endDate.toISOString().split("T")[0]}` : ""),
    );
    handleSetFilter(
      key,
      startDate.toISOString().split("T")[0] +
        (endDate ? `/${endDate.toISOString().split("T")[0]}` : ""),
    );
  };

  const handleFilter = (
    key: keyof CompaniesTableFilters,
    selectedOption: SelectOption<string> | SelectOption<string>[],
  ) => {
    if (!Array.isArray(selectedOption)) {
      handleSetFilter(key, selectedOption.value);
      return;
    }
  };

  return (
    <Flexbox fullWidth fullHeight className="gap-4">
      <ComboSelectComponent
        name="companyPotential"
        mainClassName={cn(
          companyPotential && POTENTIALS[companyPotential].bgColor,
        )}
        searchInputClassName={cn(
          companyPotential && POTENTIALS[companyPotential].bgColor,
        )}
        withFilter
        isClearable
        label="Potentiel de la société"
        returnSingleValue
        defaultOuterValue={values.companyPotential}
        options={COMPANY_POTENTIAL_OPTIONS}
        handleOnSelect={(selectedOption) =>
          handleFilter("companyPotential", selectedOption)
        }
        onClearOptions={() => {
          handleSetFilter("companyPotential", "");
        }}
        wrapperClassName="grow-0 mt-1.5 w-full"
      />

      <Flexbox row fullWidth className="gap-5 mobileScreen:flex-col">
        <FormDatePicker
          name="createdAt"
          labelWrapperClassName="mobileScreen:w-full"
          handleSetDateRange={(startDate, endDate) =>
            handleChangeDate("createdAt", startDate, endDate)
          }
          label="Date Création"
        />
        <FormDatePicker
          name="updatedAt"
          labelWrapperClassName="mobileScreen:w-full"
          handleSetDateRange={(startDate, endDate) =>
            handleChangeDate("updatedAt", startDate, endDate)
          }
          calendarClassName="right-0"
          label="Denière modification"
        />
      </Flexbox>

      <Flexbox row fullWidth className="gap-5 mobileScreen:flex-col">
        <FormDatePicker
          name="lastProspectionCall"
          labelWrapperClassName="mobileScreen:w-full"
          handleSetDateRange={(startDate, endDate) =>
            handleChangeDate("lastProspectionCall", startDate, endDate)
          }
          calendarClassName="right-0"
          label="Dernier appel prospection"
        />
      </Flexbox>

      <Flexbox row fullWidth className="gap-5 mobileScreen:flex-col">
        <ComboSelectComponent<string>
          name="companyType"
          withFilter
          isClearable
          returnSingleValue
          placeHolder="Selectionner"
          label="Type de fiche"
          defaultOuterValue={values.companyType}
          handleOnSelect={(selectedOption) =>
            handleFilter("companyType", selectedOption)
          }
          onClearOptions={() => {
            handleSetFilter("companyType", "");
          }}
          options={data?.companyTypes || []}
          wrapperClassName="mobileScreen:w-full"
        />
        <ComboSelectComponent<string>
          name="followedBy"
          withFilter
          returnSingleValue
          isClearable
          label="Suivi par"
          placeHolder="Selectionner"
          defaultOuterValue={values.followedBy}
          handleOnSelect={(selectedOption) =>
            handleFilter("followedBy", selectedOption)
          }
          onClearOptions={() => {
            handleSetFilter("followedBy", "");
          }}
          options={data?.followedBy || []}
          wrapperClassName="mobileScreen:w-full"
        />
      </Flexbox>

      <Flexbox row fullWidth className="gap-5 mobileScreen:flex-col">
        <ComboSelectComponent<string>
          name="country"
          withFilter
          isClearable
          returnSingleValue
          placeHolder="Selectionner"
          label="Pays"
          defaultOuterValue={values.country}
          handleOnSelect={(selectedOption) =>
            handleFilter("country", selectedOption)
          }
          onClearOptions={() => {
            handleSetFilter("country", "");
            handleSetFilter("city", "");
          }}
          options={countriesOptions}
          wrapperClassName="mobileScreen:w-full"
        />
        <CitiesInput
          withFilter
          returnSingleValue
          isClearable
          placeHolder="Selectionner"
          defaultOuterValue={values.city}
          handleOnSelect={(selectedOption) =>
            handleFilter("city", selectedOption)
          }
          onClearOptions={() => {
            handleSetFilter("city", "");
          }}
          country={country}
          wrapperClassName="mobileScreen:w-full"
        />
      </Flexbox>

      <Flexbox row fullWidth className="gap-5 mobileScreen:flex-col">
        <ComboSelectComponent<string>
          name="contactOrigin"
          withFilter
          isClearable
          returnSingleValue
          placeHolder="Selectionner"
          label="Origine du contact"
          defaultOuterValue={values.contactOrigin}
          handleOnSelect={(selectedOption) =>
            handleFilter("contactOrigin", selectedOption)
          }
          onClearOptions={() => {
            handleSetFilter("contactOrigin", "");
          }}
          options={data?.contactOrigin || []}
          wrapperClassName="mobileScreen:w-full"
        />
        <div className="mobileScreen:w-full">
          <ComboSelectComponent<string>
            name="sections"
            withFilter
            returnSingleValue
            isClearable
            label="Rubrique"
            placeHolder="Selectionner"
            defaultOuterValue={values.sections}
            handleOnSelect={(selectedOption) =>
              handleFilter("sections", selectedOption)
            }
            onClearOptions={() => {
              handleSetFilter("sections", "");
            }}
            options={data?.sections || []}
            wrapperClassName="mobileScreen:w-full"
          />
          <button
            type="button"
            onClick={() => setManageSectionsOpen(true)}
            className="mt-1 text-xs font-medium text-[#0A2D6E] underline hover:text-[#082559]"
          >
            Gérer les rubriques
          </button>
        </div>
      </Flexbox>

      <Flexbox row fullWidth className="gap-5 mobileScreen:flex-col">
        <div className="mobileScreen:w-full">
          <ComboSelectComponent<string>
            name="industries"
            withFilter
            isClearable
            returnSingleValue
            placeHolder="Selectionner"
            label="Industrie"
            defaultOuterValue={values.industries}
            handleOnSelect={(selectedOption) =>
              handleFilter("industries", selectedOption)
            }
            onClearOptions={() => {
              handleSetFilter("industries", "");
            }}
            options={data?.industries || []}
            wrapperClassName="mobileScreen:w-full"
          />
          <button
            type="button"
            onClick={() => setManageIndustriesOpen(true)}
            className="mt-1 text-xs font-medium text-[#0A2D6E] underline hover:text-[#082559]"
          >
            Gérer les industries
          </button>
        </div>
        <div className="mobileScreen:w-full">
          <ComboSelectComponent<string>
            name="categories"
            withFilter
            returnSingleValue
            isClearable
            label="Catégorie"
            placeHolder="Selectionner"
            defaultOuterValue={values.categories}
            handleOnSelect={(selectedOption) =>
              handleFilter("categories", selectedOption)
            }
            onClearOptions={() => {
              handleSetFilter("categories", "");
            }}
            options={data?.categories || []}
            wrapperClassName="mobileScreen:w-full"
          />
          <button
            type="button"
            onClick={() => setManageCategoriesOpen(true)}
            className="mt-1 text-xs font-medium text-[#0A2D6E] underline hover:text-[#082559]"
          >
            Gérer les catégories
          </button>
        </div>
      </Flexbox>

      <Flexbox row fullWidth className="gap-5 mobileScreen:flex-col">
        <ComboSelectComponent<string>
          name="usedItems"
          withFilter
          isClearable
          returnSingleValue
          placeHolder="Selectionner"
          label="Article utilisé"
          defaultOuterValue={values.usedItems}
          handleOnSelect={(selectedOption) =>
            handleFilter("usedItems", selectedOption)
          }
          onClearOptions={() => {
            handleSetFilter("usedItems", "");
          }}
          options={data?.usedItems || []}
          wrapperClassName="mobileScreen:w-full"
        />
        <ComboSelectComponent<string>
          name="desiredItems"
          withFilter
          returnSingleValue
          isClearable
          label="Article desiré"
          placeHolder="Selectionner"
          defaultOuterValue={values.desiredItems}
          handleOnSelect={(selectedOption) =>
            handleFilter("desiredItems", selectedOption)
          }
          onClearOptions={() => {
            handleSetFilter("desiredItems", "");
          }}
          options={data?.desiredItems || []}
          wrapperClassName="mobileScreen:w-full"
        />
      </Flexbox>
      <ManageFilterOptionsModal
        isOpen={manageCategoriesOpen}
        onClose={() => setManageCategoriesOpen(false)}
        title="Gérer les catégories"
        emptyMessage="Aucune catégorie"
        items={data?.categories || []}
        deleteFn={deleteCompanyCategory}
      />
      <ManageFilterOptionsModal
        isOpen={manageSectionsOpen}
        onClose={() => setManageSectionsOpen(false)}
        title="Gérer les rubriques"
        emptyMessage="Aucune rubrique"
        items={data?.sections || []}
        deleteFn={deleteCompanySection}
      />
      <ManageFilterOptionsModal
        isOpen={manageIndustriesOpen}
        onClose={() => setManageIndustriesOpen(false)}
        title="Gérer les industries"
        emptyMessage="Aucune industrie"
        items={data?.industries || []}
        deleteFn={deleteCompanyIndustry}
      />
    </Flexbox>
  );
};

export default CompaniesFilters;
