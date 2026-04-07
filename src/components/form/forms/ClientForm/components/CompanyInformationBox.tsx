import { isArray } from "lodash";
import { Clock } from "lucide-react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import CitiesInput from "$/components/common/CitiesInput";
import FormStyledCountryInput from "$/components/common/FormStyledCountryInput";
import FormStyledSelectInput, {
  SelectOption,
} from "$/components/common/FormStyledSelectInput";
import FormStyledTextinput from "$/components/common/FormStyledTextInput";
import Flexbox from "$/components/ui/Flexbox";
import BuildingIcon from "$/icons/Ui/BuildingIcon";
import { EditCompanyDataType } from "$/pages/ClientPage/_features/constants/validations.constants";
import { cn } from "$/utils/functions/misc.functions";
import { CountryType } from "$/utils/types/misc.types";

import { NewCompanyDataType } from "../../../../../pages/createClient/_features/constants/validations.constants";
import { COUNTRIES } from "../../../../../utils/constants/countries.constants";
import BoxesLayout from "../../../../common/BoxesLayout";

const CompanyInformationBox = () => {
  const form = useFormContext<NewCompanyDataType | EditCompanyDataType>();
  const { watch, setValue } = form;

  // Use watch() for specific fields instead of all values
  const country = watch("country") as CountryType | undefined;
  const zipCode = watch("zipCode");
  const siret = watch("siret");
  const vatNumber = watch("vatNumber");
  const city = watch("city");
  console.log("city", city);

  const countriesOptions = useMemo(
    () =>
      COUNTRIES.map((country) => ({
        label: country,
        value: country,
      })),
    [],
  );

  const handleSelect = (
    key: "country" | "city",
    selected: SelectOption<string> | SelectOption<string>[],
  ) => {
    if (isArray(selected)) return;

    setValue(key, selected.value);
    if (key === "country") setValue("city", undefined);
  };

  return (
    <BoxesLayout
      className="w-full min-w-[300px] flex-grow-[1.5] tabletScreen:min-w-[unset] tabletScreen:flex-grow smallTabletScreen:flex-grow"
      icon={<BuildingIcon />}
      title="Informations Société"
    >
      <Flexbox
        fullWidth
        row
        className="flex-wrap gap-x-2 gap-y-5 mobileScreen:gap-y-3.5"
      >
        <Flexbox
          fullWidth
          row
          className="flex-wrap gap-x-2 gap-y-8 smallTabletScreen:flex-col mobileScreen:gap-y-3.5"
        >
          <FormStyledTextinput
            label="Nom société"
            name="companyName"
            className="bg-blue-input-light"
            labelClassName="text-[#2e2e2e] font-semibold"
            labelWrapperClassName=" smallTabletScreen:flex-grow[1] smallTabletScreen:!w-full !min-w-[unset]"
          />
        </Flexbox>
        <Flexbox
          fullWidth
          row
          className="flex-wrap gap-x-2 gap-y-8 smallTabletScreen:flex-col mobileScreen:gap-y-3.5"
        >
          <FormStyledCountryInput
            isFormElement
            hideLabel
            mainClassName="!px-5"
            label="Téléphone"
            name="phoneNumber"
            labelClassName="text-[#2e2e2e]"
            labelWrapperClassName=" smallTabletScreen:flex-grow[1] smallTabletScreen:!w-full !min-w-[unset]"
          />
        </Flexbox>
        <Flexbox
          fullWidth
          row
          className="flex-wrap gap-x-2 gap-y-8 smallTabletScreen:flex-col mobileScreen:gap-y-3.5"
        >
          <FormStyledTextinput
            label="Adresse société"
            name="address"
            labelWrapperClassName="flex-grow smallTabletScreen:flex-grow smallTabletScreen:!w-full !min-w-[unset] "
          />
        </Flexbox>

        <FormStyledTextinput
          label="compl"
          name="compl"
          labelWrapperClassName="w-full shrink-0 basis-[unset]"
        />

        <Flexbox
          fullWidth
          row
          className="flex-wrap gap-x-2 gap-y-8 smallTabletScreen:flex-col mobileScreen:gap-y-3.5"
        >
          <FormStyledTextinput
            label="Email"
            name="email"
            labelWrapperClassName="flex-grow smallTabletScreen:flex-grow smallTabletScreen:!w-full !min-w-[unset]"
          />
        </Flexbox>
        <Flexbox
          fullWidth
          row
          className="flex-wrap gap-x-2 gap-y-8 mobileScreen:gap-y-3.5"
        >
          <FormStyledTextinput
            name="website"
            label="Site Web"
            labelWrapperClassName=" !min-w-[unset] tabletScreen:flex-grow tabletScreen:!min-w-full"
          />
        </Flexbox>
        <Flexbox
          fullWidth
          row
          className="flex-wrap gap-x-2 gap-y-8 mobileScreen:gap-y-3.5"
        >
          <FormStyledSelectInput
            name="country"
            mainClassName="border-none !px-3"
            labelWrapperClassName="flex-grow-[0.5] max-w-[50%] !min-w-[unset] tabletScreen:flex-grow tabletScreen:!min-w-full"
            contentClassName="border-1 border-[#E5E5E5]"
            options={countriesOptions}
            label="Pays"
            handleOnSelect={(selected) => handleSelect("country", selected)}
            withFilter
          />
          <CitiesInput
            mainClassName="border-none !px-3"
            wrapperClassName="flex-grow-[0.5] max-w-[50%] !min-w-[unset] tabletScreen:flex-grow tabletScreen:!min-w-full"
            contentClassName="border-1 border-[#E5E5E5]"
            country={country}
            handleOnSelect={(selected) => handleSelect("city", selected)}
            withFilter
            defaultOuterValue={city ? { label: city, value: city } : undefined}
          />
        </Flexbox>

        <Flexbox
          fullWidth
          row
          className="flex-wrap gap-x-2 gap-y-8 mobileScreen:gap-y-3.5"
        >
          <FormStyledTextinput
            label="Code postal"
            name="zipCode"
            labelWrapperClassName="flex-grow-[0.34] !min-w-[unset] tabletScreen:flex-grow tabletScreen:!min-w-full"
            labelClassName={cn({ "whitespace-nowrap": zipCode })}
          />
          <FormStyledTextinput
            label="Numéro siret"
            name="siret"
            labelWrapperClassName="flex-grow-[0.34] !min-w-[unset] tabletScreen:flex-grow tabletScreen:!min-w-full"
            labelClassName={cn({ "whitespace-nowrap": siret })}
          />
          <FormStyledTextinput
            label="Numéro TVA"
            name="vatNumber"
            labelWrapperClassName="flex-grow-[0.34] !min-w-[unset] tabletScreen:flex-grow tabletScreen:!min-w-full"
            labelClassName={cn({ "whitespace-nowrap": vatNumber })}
          />
        </Flexbox>

        <Flexbox fullWidth row align="center" className="flex-wrap gap-x-2 gap-y-8 mobileScreen:gap-y-3.5">
          <FormStyledTextinput
            label="Dernier appel prospection"
            name="lastProspectionCall"
            type="date"
            labelWrapperClassName="flex-grow !min-w-[unset] tabletScreen:flex-grow tabletScreen:!min-w-full"
            labelClassName="whitespace-nowrap"
          />
          <button
            type="button"
            onClick={() => {
              setValue("lastProspectionCall", new Date().toISOString().split("T")[0]);
            }}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-blue-primary px-4 py-2 text-sm font-medium text-blue-primary transition-opacity hover:opacity-75"
          >
            <Clock className="h-4 w-4" />
            Mettre la date d&apos;aujourd&apos;hui
          </button>
        </Flexbox>
      </Flexbox>
    </BoxesLayout>
  );
};

export default CompanyInformationBox;
