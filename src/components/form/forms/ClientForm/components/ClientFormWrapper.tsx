import { useEffect, useMemo, useRef } from "react";
import { DefaultValues, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { EditCompanyDataType } from "$/pages/ClientPage/_features/constants/validations.constants";
import { NewCompanyDataType } from "$/pages/createClient/_features/constants/validations.constants";
import { PATHS } from "$/routes/constants";
import { GetAllCompaniesFilterOptionsResponse } from "$/types/api/company.types";

import { ClientFormTabs } from "./ClientFormTabs";
import CompanyInformationBox from "./CompanyInformationBox";
import FollowUpBox from "./FollowUpBox";
import RelationShipBox from "./RelationShipBox";

type Props<T extends NewCompanyDataType | EditCompanyDataType> = {
  mode: "create" | "edit";
  defaultValues?: DefaultValues<T>;
  companyFilterOptions?: GetAllCompaniesFilterOptionsResponse;
  isLoading: boolean;
  handleOnSubmit?: (data: T) => Promise<void>;
  onAutoSave?: (data: T) => Promise<void>;
  onAutoSaved?: () => void;
};

const AUTO_SAVE_DELAY = 3000;

const ClientFormWrapper = <T extends NewCompanyDataType | EditCompanyDataType>({
  defaultValues,
  companyFilterOptions,
  isLoading,
  handleOnSubmit,
  onAutoSave,
  onAutoSaved,
}: Props<T>) => {
  const navigate = useNavigate();

  const form = useFormContext<T>();
  const { reset, control, handleSubmit } = form;
  const isSavingRef = useRef(false);
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const isInitializedRef = useRef(false);
  const lastSavedDataRef = useRef<string | null>(null);

  useEffect(() => {
    const autoSaveHandler = onAutoSave || handleOnSubmit;
    if (!autoSaveHandler) return;

    const subscription = form.watch(() => {
      if (!isInitializedRef.current) {
        isInitializedRef.current = true;
        lastSavedDataRef.current = JSON.stringify(form.getValues());
        return;
      }

      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = setTimeout(() => {
        if (isSavingRef.current) return;
        const currentData = JSON.stringify(form.getValues());
        if (currentData === lastSavedDataRef.current) return;

        handleSubmit(async (data) => {
          isSavingRef.current = true;
          try {
            await autoSaveHandler(data);
            lastSavedDataRef.current = JSON.stringify(form.getValues());
            onAutoSaved?.();
          } finally {
            isSavingRef.current = false;
          }
        })();
      }, AUTO_SAVE_DELAY);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(autoSaveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit, handleOnSubmit, onAutoSave, onAutoSaved]);

  const { _defaultValues } = control;

  const formSelectOptions = useMemo(
    () =>
      companyFilterOptions ?? {
        usedItems: [],
        desiredItems: [],
        contactOrigin: [],
        industries: [],
        categories: [],
        sections: [],
        users: [],
        companyTypes: [],
      },
    [companyFilterOptions],
  );

  const handleCancel = () => {
    navigate(PATHS.CLIENTS);
  };

  useEffect(() => {
    if (JSON.stringify(defaultValues) !== JSON.stringify(_defaultValues)) {
      reset(defaultValues);
      lastSavedDataRef.current = JSON.stringify(defaultValues);
    }
  }, [defaultValues, _defaultValues, reset]);

  return (
    <>
      <Flexbox
        row
        className="gap-3 tabletScreen:flex-wrap smallTabletScreen:flex-col"
        align="stretch"
        fullWidth
      >
        <CompanyInformationBox />
        <FollowUpBox options={formSelectOptions} />
        <RelationShipBox options={formSelectOptions} />
      </Flexbox>

      <ClientFormTabs />

      <Flexbox
        row
        fullWidth
        justify="end"
        className="mt-4 gap-2 mobileScreen:relative mobileScreen:flex-col-reverse"
      >
        <Button
          variant="outlined"
          className="w-fit rounded-full border-[#0A2D6E] text-[#0A2D6E] mobileScreen:mb-4 mobileScreen:w-full"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Annuler
        </Button>

        <Button
          type="submit"
          variant="primary"
          className="w-fit rounded-full mobileScreen:w-full"
          isLoading={isLoading}
        >
          Sauvegarder
        </Button>
      </Flexbox>
    </>
  );
};

export default ClientFormWrapper;
