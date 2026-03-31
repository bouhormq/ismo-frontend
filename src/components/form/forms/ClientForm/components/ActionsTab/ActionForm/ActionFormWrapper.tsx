import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { DefaultValues, useFormContext } from "react-hook-form";

import { getActionOptions } from "$/api/actions/get-action-options";
import getAllCompanyOptions from "$/api/companies/get-all-company-options";
import { getContactOptions } from "$/api/contacts/get-all-contacts-options";
import FormStyledTextAreaInput from "$/components/common/FormStyledTextAreaInput";
import FormStyledTextinput from "$/components/common/FormStyledTextInput";
import { ColorPicker } from "$/components/inputs/ColorPicker";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { cn } from "$/utils/functions/misc.functions";

import { FirstSection } from "./FirstSection";
import { SecondSection } from "./SecondSection";
import { NewCompanyActionDataType } from "./validations";

type Props<T extends NewCompanyActionDataType> = {
  mode: "create" | "edit" | "calendar-create" | "calendar-edit";
  isLoading?: boolean;
  handleOnCancel: VoidFunction;
  defaultValues?: DefaultValues<T>;
};

export const ActionFormWrapper = <T extends NewCompanyActionDataType>({
  mode,
  isLoading,
  handleOnCancel,
  defaultValues,
}: Props<T>) => {
  const form = useFormContext<NewCompanyActionDataType>();

  const { watch, setValue, reset, formState, control } = form;

  const { _defaultValues } = control;

  const companyId = watch("companyId") ?? undefined;

  const colorError = formState.errors.actionTypeColor?.message;

  const { data: companyOptions, isFetching: isFetchingCompanies } = useQuery({
    queryKey: ["all-company-options"],
    queryFn: getAllCompanyOptions,
    gcTime: 0,
  });

  const companyName = companyOptions?.find(
    (company) => company.value === companyId,
  )?.label;

  const { data: options, isFetching } = useQuery({
    queryKey: ["all-action-options"],
    queryFn: getActionOptions,
    gcTime: 0,
  });

  const { data: contactOptions } = useQuery({
    queryKey: ["all-contact-options", companyId],
    queryFn: () => getContactOptions({ companyId }),
    gcTime: 0,
    enabled: !!companyId,
  });

  const actionOptions = useMemo(
    () =>
      options
        ? {
            ...options,
            companies: companyOptions ?? [],
            contacts: contactOptions ?? [],
          }
        : {
            actionTypes: [],
            users: [],
            contacts: [],
            companies: [],
          },
    [companyOptions, options, contactOptions],
  );

  const { actionType, actionTypeColor } = watch();

  const handleChangeColor = useCallback(
    (color: string) => {
      const actionType = watch("actionType");
      if (typeof actionType === "number") return;
      setValue("actionTypeColor", color);
    },
    [setValue, watch],
  );

  useEffect(() => {
    if (options && typeof actionType === "number") {
      const newColor = options.actionTypes.find(
        (type) => type.value === actionType,
      )?.color;

      if (newColor) setValue("actionTypeColor", newColor);
    }
  }, [actionType, options, setValue]);

  useEffect(() => {
    if (
      JSON.stringify(defaultValues) !== JSON.stringify(_defaultValues) &&
      options
    )
      reset(defaultValues);
  }, [defaultValues, _defaultValues, reset, options]);

  return (
    <Flexbox
      fullWidth
      align="center"
      className="gap-5 rounded-[34px] bg-white p-6"
    >
      <h3 className="text-center text-[28px] font-normal text-[#082559] smallTabletScreen:text-xl">
        {mode === "create" || mode === "edit" ? (
          <>
            Fiche action <br />
            <span className="text-[25px]">Société : {companyName ?? ""}</span>
          </>
        ) : mode === "calendar-create" ? (
          <span> Nouvelle action</span>
        ) : (
          <span>Action</span>
        )}
      </h3>

      <FirstSection
        mode={mode}
        options={actionOptions}
        disabled={mode === "calendar-edit"}
      />

      <Flexbox
        className={cn("ml-6 self-start", {
          "opacity-70": mode === "calendar-edit",
        })}
      >
        <Flexbox row align="center" className="gap-4">
          <p className="text-xs font-medium">Couleur d'action</p>
          <ColorPicker
            value={actionTypeColor}
            onChange={handleChangeColor}
            disabled={
              mode === "calendar-edit" ||
              typeof watch("actionType") === "number"
            }
          />
        </Flexbox>
        {!!colorError && (
          <span className="mt-2 text-custom-10 font-semibold text-red-500">
            {colorError.toString()}
          </span>
        )}
      </Flexbox>

      <SecondSection disabled={mode === "calendar-edit"} />

      <Flexbox
        fullWidth
        className="gap-2 rounded-3xl border border-[#F6F6F6] p-3"
      >
        <FormStyledTextinput
          label="Objet"
          name="object"
          labelWrapperClassName="!min-w-[unset] !w-full"
          disabled={mode === "calendar-edit"}
        />

        <FormStyledTextAreaInput
          name="description"
          label="Description"
          className="min-h-36 !w-full !rounded-[30px] border-none !px-4 !py-3 outline-none"
          labelWrapperClassName="!w-full"
          disabled={mode === "calendar-edit"}
        />
      </Flexbox>

      <Flexbox
        row
        fullWidth
        justify="center"
        className="gap-2 smallTabletScreen:flex-col-reverse"
      >
        <Button
          variant="outlined"
          className="w-28 rounded-full border-[#0A2D6E] text-base font-normal text-[#0A2D6E] smallTabletScreen:w-full"
          onClick={handleOnCancel}
          disabled={isLoading || isFetching || isFetchingCompanies}
        >
          {mode === "calendar-edit" ? "Fermer" : "Annuler"}
        </Button>

        <Button
          type="submit"
          variant="primary"
          className="w-28 rounded-full text-base font-normal smallTabletScreen:w-full"
          isLoading={isLoading || isFetching || isFetchingCompanies}
        >
          Ajouter
        </Button>
      </Flexbox>
    </Flexbox>
  );
};
