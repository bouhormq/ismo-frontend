import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  CompanyRecord,
  CompanyRecordResponse,
  CompaniesTableFilters,
} from "$/api/companies/get-all-companies";
import { SendEmailingParams, sendEmailing } from "$/api/companies/send-emailing";
import ComboSelectComponent, {
  SelectOption,
} from "$/components/inputs/FormComboSelect/ComboSelectInput";
import { useEnhancedTable } from "$/components/tables/enhanced-table/EnhancedTableProvider";
import Modal from "$/components/DialogComponents/Modal";
import Button from "$/components/ui/Button";
import Flexbox from "$/components/ui/Flexbox";
import { QueryError } from "$/types/api/restApiClient.types";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  onCancel: VoidFunction;
};

const EMAILING_TEMPLATES: SelectOption<string>[] = [
  { value: "nouvel-arrivage", label: "Nouvel arrivage" },
];

export const EmailingModal = ({ isOpen, onCancel }: Props) => {
  const formMethods = useForm();
  const { getSelectedRows } = useEnhancedTable<
    CompanyRecordResponse,
    CompanyRecord,
    CompaniesTableFilters
  >();

  const selectedCompanies = getSelectedRows();

  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const { mutateAsync, isPending } = useMutation<
    boolean,
    QueryError,
    SendEmailingParams
  >({
    mutationFn: sendEmailing,
    onSuccess: () => {
      toast.success("Emails envoyés avec succès");
      onCancel();
      setSelectedTemplate("");
    },
    onError: () => {
      toast.error("Erreur lors de l'envoi des emails");
    },
  });

  const handleSubmit = () => {
    if (!selectedTemplate) {
      toast.warning("Veuillez sélectionner un modèle");
      return;
    }

    if (selectedCompanies.length === 0) {
      toast.warning("Veuillez sélectionner au moins une société");
      return;
    }

    mutateAsync({
      template: selectedTemplate,
      companyIds: selectedCompanies.map((c) => c.id),
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      className="w-full max-w-[700px] tabletScreen:w-[90%]"
    >
      <FormProvider {...formMethods}>
        <Flexbox
          align="center"
          justify="center"
          fullWidth
          className="relative w-full gap-5 rounded-[34px] bg-white py-2 text-center"
        >
          <h3 className="text-[28px] font-normal text-[#082559] mobileScreen:text-xl">
            Envoyer Emailing
          </h3>

          {/* Template selector */}
          <div className="w-full">
            <ComboSelectComponent<string>
              name="emailing-template"
              label="Modèle"
              options={EMAILING_TEMPLATES}
              returnSingleValue
              isNotFormElement
              placeHolder="Sélectionner un modèle"
              wrapperClassName="!w-full !min-w-[unset]"
              mainWrapperClassName="w-full"
              handleOnSelect={(selected) => {
                const val = Array.isArray(selected)
                  ? selected[0]?.value
                  : selected?.value;
                setSelectedTemplate(val ?? "");
              }}
            />
          </div>

          {/* Selected companies display */}
          {selectedCompanies.length > 0 && (
            <div className="w-full text-left">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sociétés ({selectedCompanies.length})
              </label>
              <div className="flex max-h-[200px] flex-col gap-1 overflow-y-auto rounded-xl border border-gray-200 px-4 py-3">
                {selectedCompanies.map((company) => (
                  <span
                    key={company.id}
                    className="text-sm text-[#082559]"
                  >
                    {company.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="flex w-full items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
            <span className="text-sm text-blue-700">
              L&apos;email sera envoyé automatiquement à tous les contacts ayant
              un email dans les sociétés sélectionnées.
            </span>
          </div>

          {/* Action buttons */}
          <Flexbox
            row
            fullWidth
            justify="center"
            align="center"
            className="gap-4"
          >
            <Button
              type="button"
              className="w-1/2 rounded-full border-[2px] border-blue-primary text-blue-primary md:w-1/5"
              onClick={onCancel}
            >
              Annuler
            </Button>
            <Button
              type="button"
              className="w-1/2 border-[2px] border-blue-primary bg-blue-primary text-white md:w-1/5"
              onClick={handleSubmit}
              disabled={isPending}
            >
              Envoyer
            </Button>
          </Flexbox>
        </Flexbox>
      </FormProvider>
    </Modal>
  );
};
