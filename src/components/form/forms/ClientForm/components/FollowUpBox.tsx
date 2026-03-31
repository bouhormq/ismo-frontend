import { isArray } from "lodash";
import { useFormContext } from "react-hook-form";

import FormStyledSelectInput, {
  SelectOption,
} from "$/components/common/FormStyledSelectInput";
import FormStyledTextAreaInput from "$/components/common/FormStyledTextAreaInput";
import FormStyledTextinput from "$/components/common/FormStyledTextInput";
import ComboSelectComponent from "$/components/inputs/FormComboSelect/ComboSelectInput";
import Flexbox from "$/components/ui/Flexbox";
import TodoListIcon from "$/icons/Ui/TodoListIcon";
import { EditCompanyDataType } from "$/pages/ClientPage/_features/constants/validations.constants";
import { GetAllCompaniesFilterOptionsResponse } from "$/types/api/company.types";

import { NewCompanyDataType } from "../../../../../pages/createClient/_features/constants/validations.constants";
import BoxesLayout from "../../../../common/BoxesLayout";

type Props = {
  options: GetAllCompaniesFilterOptionsResponse;
};

const FollowUpBox = ({ options }: Props) => {
  const form = useFormContext<NewCompanyDataType | EditCompanyDataType>();

  const { setValue } = form;

  const handleSelect = (
    key: "followedBy",
    selected: SelectOption<number> | SelectOption<number>[],
  ) => {
    if (isArray(selected)) return;

    setValue(key, selected.value);
  };

  return (
    <BoxesLayout
      className="min-w-[300px] flex-grow-[1]"
      icon={<TodoListIcon />}
      title="Suivi"
    >
      <Flexbox
        fullWidth
        row
        className="flex-wrap gap-x-2 gap-y-5 mobileScreen:gap-y-3.5"
      >
        <Flexbox
          fullWidth
          row
          className="flex-wrap gap-x-2 gap-y-5 mobileScreen:gap-y-3.5"
        >
          {/* <FormStyledSelectInput
            labelWrapperClassName="flex-grow-[0.5] !min-w-[unset] !w-fit"
            name="companyType"
            label="Type de Fiche"
            mainClassName="border-none !px-3 bg-blue-input-light"
            contentClassName="border-1 border-[#E5E5E5]"
            options={companyTypeOptions}
            handleOnSelect={(selected) => handleSelect("companyType", selected)}
          /> */}
          <ComboSelectComponent
            name="companyType"
            withFilter
            isClearable
            label="Type de Fiche"
            placeHolder="Sélectionner"
            autoAddOptions
            returnSingleValue
            labelClassName="overflow-x-scroll 12inch:max-w-[75%] 12inch:whitespace-nowrap"
            mainClassName="bg-blue-input-light"
            searchInputClassName="bg-blue-input-light text-[#43454E] placeholder-[#43454E] border-none"
            wrapperClassName="flex-grow-[1]  !min-w-[180px] rounded-full !w-fit"
            options={options.companyTypes}
          />
          <FormStyledTextinput
            label="Référence"
            name="code"
            labelWrapperClassName="flex-grow-[1] !min-w-[110px] !w-fit"
            disabled
          />
        </Flexbox>

        <FormStyledSelectInput
          name="followedBy"
          label="Suivi par"
          labelWrapperClassName="flex-grow"
          mainClassName="border-none !px-3 bg-blue-input-light"
          contentClassName="border-1 border-[#E5E5E5]"
          options={options.users}
          handleOnSelect={(selected) => handleSelect("followedBy", selected)}
        />
        <ComboSelectComponent
          name="usedItems"
          withFilter
          isClearable
          multiple
          label="Article Utilisé"
          autoAddOptions
          mainClassName="flex-grow"
          returnSingleValue
          wrapperClassName="flex-grow basis-[unset] flex-shrink-[unset] !min-w-[unset] !w-full"
          searchInputClassName="text-[#43454E] placeholder-[#43454E] flex-grow"
          options={options.usedItems}
        />
        <ComboSelectComponent
          name="desiredItems"
          withFilter
          isClearable
          multiple
          label="Article Désiré"
          autoAddOptions
          returnSingleValue
          wrapperClassName="flex-grow basis-[unset] flex-shrink-[unset] !min-w-[unset] !w-full"
          searchInputClassName="text-[#43454E] placeholder-[#43454E]"
          options={options.desiredItems}
        />
        <FormStyledTextAreaInput
          name="activityDescription"
          label="Descriptif de l'activité"
          className="min-h-[70px] !rounded-[30px] border-none !px-4 !py-3 outline-none"
          labelWrapperClassName="flex-grow"
        />
      </Flexbox>
    </BoxesLayout>
  );
};

export default FollowUpBox;
