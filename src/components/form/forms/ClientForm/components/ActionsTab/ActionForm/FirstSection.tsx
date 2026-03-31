import { isArray } from "lodash";
import { useFormContext } from "react-hook-form";

import { ActionOptions } from "$/api/actions/get-action-options";
import { FormDatePicker } from "$/components/form/FormDatePicker";
import ComboSelectComponent, {
  SelectOption,
} from "$/components/inputs/FormComboSelect/ComboSelectInput";
import Flexbox from "$/components/ui/Flexbox";
import { GetAllCompaniesOptionsResponse } from "$/types/api/company.types";
import { cn } from "$/utils/functions/misc.functions";

import { NewCompanyActionDataType } from "./validations";

type Props = {
  mode: "create" | "edit" | "calendar-create" | "calendar-edit";
  options: ActionOptions & {
    companies: GetAllCompaniesOptionsResponse;
    contacts: SelectOption<number>[];
  };
  disabled: boolean;
};

export const FirstSection = ({ mode, options, disabled }: Props) => {
  const form = useFormContext<NewCompanyActionDataType>();

  const { setValue, watch } = form;

  const handleChangeDate = (key: "createdAt", date: Date) => {
    setValue(key, date.toISOString().split("T")[0]);
  };

  const handleCustomChange = (checked: boolean) => {
    setValue("isDone", checked);
  };

  const handleSelect = (
    key: "companyId" | "contact",
    selected: SelectOption<number> | SelectOption<number>[],
  ) => {
    if (isArray(selected)) return;

    setValue(key, selected.value);
  };

  return (
    <>
      <Flexbox
        fullWidth
        className="gap-4 rounded-3xl border-1 border-[#F6F6F6] p-3 smallTabletScreen:border-none smallTabletScreen:p-0"
      >
        {(mode === "calendar-create" || mode === "calendar-edit") && (
          <ComboSelectComponent<number>
            name="companyId"
            mainClassName="border-none !px-4 !h-full"
            contentClassName="border-1 border-[#E5E5E5]"
            wrapperClassName={cn("!w-full", {
              "opacity-70": mode === "calendar-edit",
            })}
            defaultOuterValue={options.companies.find(
              (type) => type.value === watch("companyId"),
            )}
            options={options.companies}
            placeHolder="Sélectionner"
            handleOnSelect={(selected) => handleSelect("companyId", selected)}
            label="Société"
            disabled={mode === "calendar-edit"}
            withFilter
          />
        )}
        <ComboSelectComponent<number>
          name="contact"
          mainClassName="border-none !px-4 !h-full"
          contentClassName="border-1 border-[#E5E5E5]"
          wrapperClassName={cn("!w-full")}
          defaultOuterValue={options.contacts.find(
            (type) => type.value === watch("contact"),
          )}
          placeHolder="Sélectionner"
          options={options.contacts}
          handleOnSelect={(selected) => handleSelect("contact", selected)}
          label="Contact"
          // withFilter
        />
      </Flexbox>

      <Flexbox
        fullWidth
        className="gap-4 rounded-3xl border border-[#EEF6F7] smallTabletScreen:border-none"
      >
        <Flexbox
          fullWidth
          row
          className="gap-4 rounded-t-3xl bg-[#E5F7FF] p-4 smallTabletScreen:hidden"
        >
          <p className="w-[30%]">Type Action</p>
          <p className="w-[30%]">Réalisé par</p>
          <p className="w-2/5">Date Création</p>
        </Flexbox>

        <Flexbox
          row
          fullWidth
          className="gap-4 px-4 pb-4 smallTabletScreen:flex-col smallTabletScreen:px-[unset] smallTabletScreen:pb-[unset]"
        >
          <ComboSelectComponent
            name="actionType"
            withFilter
            isClearable
            label="Type Action"
            autoAddOptions
            returnSingleValue
            defaultOuterValue={options.actionTypes.find(
              (type) => type.value === watch("actionType"),
            )}
            wrapperClassName={cn(
              "!min-w-[unset] w-[30%] smallTabletScreen:w-full",
              { "opacity-70": disabled },
            )}
            options={options.actionTypes}
            placeHolder="Sélectionner"
            disabled={disabled}
            showLabelWithValue={false}
          />
          <ComboSelectComponent
            name="addedBy"
            withFilter
            isClearable
            label="Réalisé par"
            returnSingleValue
            defaultOuterValue={options.actionTypes.find(
              (type) => type.value === watch("addedBy"),
            )}
            wrapperClassName={cn(
              "!min-w-[unset] w-[30%] smallTabletScreen:w-full",
              { "opacity-70": disabled },
            )}
            options={options.users}
            placeHolder="Sélectionner"
            disabled={disabled}
            showLabelWithValue={false}
          />

          <Flexbox
            row
            align="center"
            justify="center"
            className="tablet w-[40%] gap-4 smallTabletScreen:!w-full smallTabletScreen:flex-col smallTabletScreen:items-start"
          >
            {/** should be disabled on create */}
            <FormDatePicker
              name="createdAt"
              handleSetDateRange={(date) => handleChangeDate("createdAt", date)}
              label="Date Création"
              labelWrapperClassName="!min-w-[unset] smallTabletScreen:!w-full rounded-full bg-[#DEE2E6]"
              singleDate
              disabled={true}
              showLabelWithValue={false}
            />

            <Flexbox
              row
              align="center"
              justify="center"
              className="gap-2 smallTabletScreen:ml-2"
            >
              <input
                className={cn(
                  "size-4 rounded-xl border accent-[#082559] hover:cursor-pointer",
                  // { "hover:cursor-not-allowed": disabled },
                )}
                type="checkbox"
                checked={form.watch("isDone")}
                onChange={(e) => handleCustomChange(e.target.checked)}
                // disabled={disabled}
              />
              <p className="text-sm text-[#43454E]">Fait</p>
            </Flexbox>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    </>
  );
};
