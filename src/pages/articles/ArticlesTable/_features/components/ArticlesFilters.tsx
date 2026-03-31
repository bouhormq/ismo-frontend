import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { getArticlesFilterOptions } from "$/api/articles/get-filter-options";
import FormStyledTextinput from "$/components/common/FormStyledTextInput";
import ComboSelectComponent, {
  SelectOption,
} from "$/components/inputs/FormComboSelect/ComboSelectInput";
import Flexbox from "$/components/ui/Flexbox";
import { ArticlesTableFilters } from "$/types/api/article.types";
import {
  COUNTRIES,
  COUNTRIES_AND_CITIES,
} from "$/utils/constants/countries.constants";
import { CountryType } from "$/utils/types/misc.types";

import ManageCategoriesModal from "./ManageCategoriesModal";

type Props = {
  handleSetFilter: (
    key: keyof ArticlesTableFilters,
    value?: string | null,
  ) => void;
};

const ArticlesFilter = ({ handleSetFilter }: Props) => {
  const { watch } = useFormContext();
  const values = watch();
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  const country = values.companyCountry as CountryType | undefined;

  const { data } = useQuery({
    queryKey: ["all-article-filter-options"],
    queryFn: () => getArticlesFilterOptions(),
    gcTime: 0,
  });

  const availabilityOptions = useMemo(
    () => [
      { value: "available", label: "Disponible" },
      { value: "unavailable", label: "Indisponible" },
    ],
    [],
  );

  const articleCompletedOptions = useMemo(
    () => [
      { value: "all", label: "Tous" },
      { value: "true", label: "Complété" },
      { value: "false", label: "Non complété" },
    ],
    [],
  );

  const countriesOptions = useMemo(
    () =>
      COUNTRIES.map((country) => ({
        label: country,
        value: country,
      })),
    [],
  );

  const citiesOptions = useMemo(
    () =>
      country
        ? COUNTRIES_AND_CITIES[country].map((city) => ({
            label: city,
            value: city,
          }))
        : [],
    [country],
  );

  const handleFilter = (
    key: keyof ArticlesTableFilters,
    selectedOption: SelectOption<string> | SelectOption<string>[],
  ) => {
    if (!Array.isArray(selectedOption)) {
      handleSetFilter(key, selectedOption.value);
      return;
    }
  };

  return (
    <Flexbox fullWidth fullHeight className="gap-5">
      <FormStyledTextinput
        name="title"
        label="Titre"
        labelWrapperClassName="w-full"
        onChange={(e) => {
          handleSetFilter("title", e.target.value);
        }}
      />

      <ComboSelectComponent<string>
        name="section"
        withFilter
        returnSingleValue
        isClearable
        label="Rubrique"
        placeHolder="Selectionner"
        defaultOuterValue={values.section}
        handleOnSelect={(selectedOption) =>
          handleFilter("section", selectedOption)
        }
        onClearOptions={() => {
          handleSetFilter("section", null);
        }}
        options={data?.sections || []}
        wrapperClassName="w-full"
      />

      <ComboSelectComponent<string>
        name="equipmentCondition"
        withFilter
        returnSingleValue
        isClearable
        label="État du matériel"
        placeHolder="Selectionner"
        defaultOuterValue={values.equipmentCondition}
        handleOnSelect={(selectedOption) =>
          handleFilter("equipmentCondition", selectedOption)
        }
        onClearOptions={() => {
          handleSetFilter("equipmentCondition", null);
        }}
        options={data?.equipmentCondition || []}
        wrapperClassName="w-full"
      />

      <ComboSelectComponent<string>
        name="companyName"
        withFilter
        returnSingleValue
        isClearable
        label="Société fournisseur"
        placeHolder="Selectionner"
        defaultOuterValue={values.companyName}
        handleOnSelect={(selectedOption) =>
          handleFilter("companyName", selectedOption)
        }
        onClearOptions={() => {
          handleSetFilter("companyName", null);
        }}
        options={data?.companyNames || []}
        wrapperClassName="w-full"
      />

      <ComboSelectComponent<string>
        name="isCompleted"
        returnSingleValue
        label="Fiche complétée"
        placeHolder="Selectionner"
        defaultOuterValue={values.isCompleted}
        handleOnSelect={(selectedOption) =>
          handleFilter("isCompleted", selectedOption)
        }
        onClearOptions={() => {
          handleSetFilter("isCompleted", null);
        }}
        options={articleCompletedOptions}
        wrapperClassName="w-full"
      />

      <Flexbox row fullWidth className="gap-5 mobileScreen:flex-col">
        <div className="mobileScreen:w-full">
          <ComboSelectComponent<string>
            name="category"
            withFilter
            isClearable
            returnSingleValue
            placeHolder="Selectionner"
            label="Catégorie"
            defaultOuterValue={values.category}
            handleOnSelect={(selectedOption) =>
              handleFilter("category", selectedOption)
            }
            options={data?.categories || []}
            onClearOptions={() => {
              handleSetFilter("category", null);
            }}
            wrapperClassName="mobileScreen:w-full"
          />
          <button
            type="button"
            onClick={() => setIsCategoriesModalOpen(true)}
            className="mt-1 text-xs font-medium text-[#0A2D6E] underline hover:text-[#082559]"
          >
            Gérer les catégories
          </button>
        </div>
        <ComboSelectComponent<string>
          name="industry"
          withFilter
          isClearable
          returnSingleValue
          placeHolder="Selectionner"
          label="Industrie"
          defaultOuterValue={values.industry}
          handleOnSelect={(selectedOption) =>
            handleFilter("industry", selectedOption)
          }
          options={data?.industries || []}
          onClearOptions={() => {
            handleSetFilter("industry", null);
          }}
          wrapperClassName="mobileScreen:w-full"
        />
      </Flexbox>

      <Flexbox row fullWidth className="gap-5 mobileScreen:flex-col">
        <ComboSelectComponent<string>
          name="availability"
          withFilter
          isClearable
          returnSingleValue
          placeHolder="Selectionner"
          label="Disponibilité"
          defaultOuterValue={values.availability}
          handleOnSelect={(selectedOption) =>
            handleFilter("availability", selectedOption)
          }
          options={availabilityOptions}
          onClearOptions={() => {
            handleSetFilter("availability", null);
          }}
          wrapperClassName="mobileScreen:w-full"
        />
        <ComboSelectComponent<string>
          name="reference"
          withFilter
          isClearable
          returnSingleValue
          placeHolder="Selectionner"
          label="Référence"
          defaultOuterValue={values.reference}
          handleOnSelect={(selectedOption) =>
            handleFilter("reference", selectedOption)
          }
          options={data?.references || []}
          onClearOptions={() => {
            handleSetFilter("reference", null);
          }}
          wrapperClassName="mobileScreen:w-full"
        />
      </Flexbox>

      <Flexbox row fullWidth className="gap-5 mobileScreen:flex-col">
        <ComboSelectComponent<string>
          name="companyCountry"
          withFilter
          isClearable
          returnSingleValue
          placeHolder="Selectionner"
          label="Pays"
          defaultOuterValue={values.companyCountry}
          handleOnSelect={(selectedOption) =>
            handleFilter("companyCountry", selectedOption)
          }
          onClearOptions={() => {
            handleSetFilter("companyCountry", null);
          }}
          options={countriesOptions}
          wrapperClassName="mobileScreen:w-full"
        />
        <ComboSelectComponent<string>
          name="companyCity"
          withFilter
          returnSingleValue
          isClearable
          label="Ville"
          searchInputClassName="w-[80%]"
          defaultOuterValue={values.companyCity}
          handleOnSelect={(selectedOption) =>
            handleFilter("companyCity", selectedOption)
          }
          onClearOptions={() => {
            handleSetFilter("companyCity", null);
          }}
          options={citiesOptions}
          wrapperClassName="mobileScreen:w-full"
        />
      </Flexbox>

      <ManageCategoriesModal
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
        categories={data?.categories || []}
      />
    </Flexbox>
  );
};

export default ArticlesFilter;
