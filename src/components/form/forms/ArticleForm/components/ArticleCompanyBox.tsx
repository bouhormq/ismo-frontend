import { useQuery } from "@tanstack/react-query";
import { isArray } from "lodash";
import { useFormContext } from "react-hook-form";

import getAllCompanyOptions from "$/api/companies/get-all-company-options";
import getCompany from "$/api/companies/get-company";
import BoxesLayout from "$/components/common/BoxesLayout";
import FormStyledSelectInput, {
  SelectOption,
} from "$/components/common/FormStyledSelectInput";
import FormStyledTextinput from "$/components/common/FormStyledTextInput";
import Flexbox from "$/components/ui/Flexbox";
import BuildingIcon from "$/icons/Ui/BuildingIcon";
import { NewArticleDataType } from "$/pages/articles/CreateArticle/_features/constants/validations.constants";

const ArticleCompanyBox = () => {
  const form = useFormContext<NewArticleDataType>();

  const { watch, setValue } = form;

  const { data: companyOptions, isFetching } = useQuery({
    queryKey: ["all-company-options"],
    queryFn: getAllCompanyOptions,
    gcTime: 0,
  });

  const companyId = watch("company");

  const { data: company } = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => getCompany(companyId),
    enabled: !!companyId,
  });

  const handleSelect = (
    key: "company",
    selected: SelectOption<number> | SelectOption<number>[],
  ) => {
    if (isArray(selected)) return;

    setValue(key, selected.value);
  };

  return (
    <BoxesLayout
      className="w-full min-w-[300px] flex-grow tabletScreen:min-w-[unset] smallTabletScreen:flex-grow"
      icon={<BuildingIcon />}
      title="Société associée"
    >
      <Flexbox fullWidth className="gap-x-2 gap-y-4">
        <FormStyledSelectInput<number>
          name="company"
          mainClassName="border-none !px-4 !h-full"
          contentClassName="border-1 border-[#E5E5E5]"
          labelWrapperClassName="!w-full"
          options={companyOptions ?? []}
          handleOnSelect={(selected) => handleSelect("company", selected)}
          label="Société"
          disabled={isFetching}
          withFilter
        />

        <FormStyledTextinput
          name="code"
          label="Code société"
          labelWrapperClassName="!w-full"
          value={company?.code ?? ""}
          className="font-medium text-gray-700"
          disabled
        />
        <FormStyledTextinput
          label="Adresse"
          value={company?.address ?? ""}
          labelWrapperClassName="!w-full"
          className="font-medium text-gray-700"
          name="address"
          disabled
        />

        <Flexbox
          fullWidth
          row
          className="gap-x-2 gap-y-4 tabletScreen:flex-col"
        >
          <FormStyledTextinput
            name="zipCode"
            label="Code postal"
            value={company?.zipCode ?? ""}
            labelWrapperClassName="!min-w-unset flex-grow-[0.5] tabletScreen:flex-grow tabletScreen:w-full font-medium text-gray-700"
            disabled
          />
          <FormStyledTextinput
            label="Ville"
            value={company?.city ?? ""}
            name="city"
            labelWrapperClassName="!min-w-unset flex-grow-[0.5] tabletScreen:flex-grow tabletScreen:w-full font-medium text-gray-700"
            disabled
          />
        </Flexbox>

        <FormStyledTextinput
          label="Pays"
          value={company?.country ?? ""}
          name="country"
          labelWrapperClassName="!w-full"
          className="font-medium text-gray-700"
          disabled
        />
      </Flexbox>
    </BoxesLayout>
  );
};

export default ArticleCompanyBox;
