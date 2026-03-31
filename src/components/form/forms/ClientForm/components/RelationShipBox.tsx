import { useFormContext } from "react-hook-form";

import ComboSelectComponent from "$/components/inputs/FormComboSelect/ComboSelectInput";
import Flexbox from "$/components/ui/Flexbox";
import GroupOfPeopleIcon from "$/icons/Ui/GroupOfPeopleIcon";
import { EditCompanyDataType } from "$/pages/ClientPage/_features/constants/validations.constants";
import { GetAllCompaniesFilterOptionsResponse } from "$/types/api/company.types";
import {
  COMPANY_POTENTIAL_OPTIONS,
  POTENTIALS,
} from "$/utils/constants/company.constants";
import { cn } from "$/utils/functions/misc.functions";

import { NewCompanyDataType } from "../../../../../pages/createClient/_features/constants/validations.constants";
import BoxesLayout from "../../../../common/BoxesLayout";

type Props = {
  options: GetAllCompaniesFilterOptionsResponse;
};

const RelationShipBox = ({ options }: Props) => {
  const form = useFormContext<NewCompanyDataType | EditCompanyDataType>();

  const { watch } = form;

  const { companyPotential } = watch();

  return (
    <BoxesLayout
      className="min-w-[300px] flex-grow-[1]"
      icon={<GroupOfPeopleIcon />}
      title="Relation"
    >
      <Flexbox
        fullWidth
        row
        className="flex-wrap gap-x-2 gap-y-5 mobileScreen:gap-y-4"
      >
        <ComboSelectComponent
          name="companyPotential"
          mainClassName={cn(
            companyPotential
              ? POTENTIALS[companyPotential].bgColor
              : "bg-blue-input-light",
          )}
          searchInputClassName={cn(
            companyPotential
              ? POTENTIALS[companyPotential].bgColor
              : "bg-blue-input-light",
            "text-[#43454E] placeholder-[#43454E] border-none",
          )}
          withFilter
          isClearable
          label="Potentiel de la société"
          returnSingleValue
          options={COMPANY_POTENTIAL_OPTIONS}
          wrapperClassName="flex-grow basis-[unset] flex-shrink-[unset] !min-w-[unset] !w-full"
        />
        <ComboSelectComponent
          name="contactOrigin"
          mainClassName="bg-blue-input-light"
          searchInputClassName="bg-blue-input-light text-[#43454E] placeholder-[#43454E] border-none"
          withFilter
          isClearable
          label="Origine du contact"
          autoAddOptions
          returnSingleValue
          wrapperClassName="flex-grow basis-[unset] flex-shrink-[unset] !min-w-[unset] !w-full"
          options={options.contactOrigin}
        />

        <ComboSelectComponent
          name="industries"
          mainClassName="bg-blue-input-light"
          searchInputClassName="bg-blue-input-light text-[#43454E] placeholder-[#43454E] border-none"
          withFilter
          isClearable
          multiple
          label="Industrie"
          autoAddOptions
          returnSingleValue
          wrapperClassName="flex-grow basis-[unset] flex-shrink-[unset] !min-w-[unset] !w-full"
          options={options.industries}
        />
        <ComboSelectComponent
          name="categories"
          mainClassName="bg-blue-input-light"
          searchInputClassName="bg-blue-input-light text-[#43454E] placeholder-[#43454E] border-none"
          withFilter
          isClearable
          multiple
          label="Catégorie"
          autoAddOptions
          returnSingleValue
          wrapperClassName="flex-grow basis-[unset] flex-shrink-[unset] !min-w-[unset] !w-full"
          options={options.categories}
        />
        <ComboSelectComponent
          name="sections"
          mainClassName="bg-blue-input-light"
          searchInputClassName="bg-blue-input-light text-[#43454E] placeholder-[#43454E] border-none"
          withFilter
          isClearable
          multiple
          label="Rubrique"
          autoAddOptions
          wrapperClassName="flex-grow basis-[unset] flex-shrink-[unset] !min-w-[unset] !w-full"
          returnSingleValue
          options={options.sections}
        />
      </Flexbox>
    </BoxesLayout>
  );
};

export default RelationShipBox;
