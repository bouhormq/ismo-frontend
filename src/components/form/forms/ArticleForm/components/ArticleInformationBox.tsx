import { isArray } from "lodash";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { ArticleFilterOptions } from "$/api/articles/get-filter-options";
import BoxesLayout from "$/components/common/BoxesLayout";
import FormStyledSelectInput from "$/components/common/FormStyledSelectInput";
import FormStyledTextinput from "$/components/common/FormStyledTextInput";
import ComboSelectComponent, {
  SelectOption,
} from "$/components/inputs/FormComboSelect/ComboSelectInput";
import Flexbox from "$/components/ui/Flexbox";
import BoxIcon from "$/icons/Ui/BoxIcon";
import { NewArticleDataType } from "$/pages/articles/CreateArticle/_features/constants/validations.constants";

type Props = {
  options?: ArticleFilterOptions;
};

const ArticleInformationBox = ({ options }: Props) => {
  const form = useFormContext<NewArticleDataType>();

  const { setValue } = form;

  const availabilityOptions = useMemo(
    () => [
      { value: "available", label: "Disponible" },
      { value: "unavailable", label: "Indisponible" },
    ],
    [],
  );

  const handleSelect = (
    key: "availability",
    selected: SelectOption<string> | SelectOption<string>[],
  ) => {
    if (isArray(selected)) return;

    setValue(key, selected.value);
  };

  return (
    <BoxesLayout
      className="w-full min-w-[300px] flex-grow tabletScreen:min-w-[unset] smallTabletScreen:flex-grow"
      icon={<BoxIcon />}
      title="Informations de l'article"
    >
      <Flexbox fullWidth row className="flex-wrap gap-x-2 gap-y-4">
        <FormStyledTextinput
          label="Titre"
          name="title"
          className="bg-blue-inputBg text-lg font-semibold"
          labelClassName="text-[#2e2e2e] font-semibold"
        />

        <Flexbox
          fullWidth
          row
          className="gap-x-2 gap-y-4 tabletScreen:flex-col"
        >
          <FormStyledTextinput
            label="Référence"
            name="reference"
            labelWrapperClassName="!min-w-unset flex-grow-[0.5] tabletScreen:flex-grow tabletScreen:w-full"
            disabled
          />
          <FormStyledTextinput
            label="État du matériel"
            name="equipmentCondition"
            labelWrapperClassName="!min-w-unset flex-grow-[0.5] tabletScreen:flex-grow tabletScreen:w-full"
          />
        </Flexbox>

        <Flexbox
          fullWidth
          row
          className="gap-x-2 gap-y-4 tabletScreen:flex-col"
        >
          <ComboSelectComponent
            name="industry"
            mainClassName="bg-blue-inputBg"
            searchInputClassName="bg-blue-inputBg text-[#43454E] placeholder-[#43454E] border-none"
            wrapperClassName="tabletScreen:w-full !min-w-unset"
            withFilter
            isClearable
            label="Industrie"
            placeHolder="Selectionner"
            autoAddOptions
            returnSingleValue
            options={options?.industries ?? []}
          />
          <ComboSelectComponent
            name="category"
            mainClassName="bg-blue-inputBg"
            searchInputClassName="bg-blue-inputBg text-[#43454E] placeholder-[#43454E] border-none"
            wrapperClassName="tabletScreen:w-full !min-w-unset"
            withFilter
            isClearable
            label="Catégorie"
            placeHolder="Selectionner"
            autoAddOptions
            returnSingleValue
            options={options?.categories ?? []}
          />
        </Flexbox>

        <Flexbox
          fullWidth
          row
          justify="center"
          align="center"
          className="gap-x-2 gap-y-4 tabletScreen:flex-col"
        >
          <ComboSelectComponent
            name="section"
            mainClassName="bg-blue-inputBg"
            searchInputClassName="bg-blue-inputBg  text-[#43454E] placeholder-[#43454E] border-none"
            wrapperClassName="tabletScreen:w-full flex-grow !min-w-[unset]"
            withFilter
            isClearable
            label="Rubrique"
            placeHolder="Selectionner"
            autoAddOptions
            returnSingleValue
            options={options?.sections ?? []}
          />
          <FormStyledSelectInput<string>
            name="availability"
            mainClassName="border-none !px-3 !h-full"
            labelWrapperClassName="tabletScreen:!flex-grow tabletScreen:!w-full !min-w-[unset] max-w-[50%] tabletScreen:max-w-full"
            contentClassName="border-1 border-[#E5E5E5]"
            wrapperClassName="tabletScreen:w-full"
            options={availabilityOptions}
            handleOnSelect={(selected) =>
              handleSelect("availability", selected)
            }
            label="Disponibilité"
          />
        </Flexbox>
      </Flexbox>
    </BoxesLayout>
  );
};

export default ArticleInformationBox;
