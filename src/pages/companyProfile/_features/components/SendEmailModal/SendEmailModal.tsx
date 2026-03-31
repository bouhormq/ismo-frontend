import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import {
  CompaniesTableFilters,
  CompanyRecord,
  CompanyRecordResponse,
} from "$/api/companies/get-all-companies";
import { SendEmailsParams, sendEmails } from "$/api/companies/send-emails";
import { uploadFile } from "$/api/media";
import Modal from "$/components/DialogComponents/Modal";
import Form from "$/components/form/Form";
import { useEnhancedTable } from "$/components/tables/enhanced-table/EnhancedTableProvider";
import { QueryError } from "$/types/api/restApiClient.types";

import PdfLoadingOverlay from "$/components/ui/PdfLoadingOverlay";
import { SendEmailFormWrapper } from "./SendEmailFormWrapper";
import { SendEmailDataType, sendEmailSchema } from "./validations.constants";

type Props = {
  isOpen: boolean;
  onCancel: VoidFunction;
};

export const SendEmailModal = ({ isOpen, onCancel }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { filters: tableFilters, getSelectedRows } = useEnhancedTable<
    CompanyRecordResponse,
    CompanyRecord,
    CompaniesTableFilters
  >();

  const { mutateAsync, isPending } = useMutation<
    boolean,
    QueryError,
    SendEmailsParams
  >({
    mutationFn: sendEmails,
    onSuccess: () => {
      toast.success("Email envoyé avec succès");
      onCancel();
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Erreur lors de l'envoi de l'email");
      setIsLoading(false);
    },
  });

  const handleOnSubmit = async (data: SendEmailDataType) => {
    const { documents, _companyId, ...rest } = data;

    const documentsWithUrls: { name: string; url: string }[] = [];

    setIsLoading(true);
    onCancel();

    await Promise.all(
      Array.from(documents ?? []).map(async (file) => {
        const response = await uploadFile({
          file: file as File,
          isPublic: false,
          path: "email-documents",
        });

        if (response)
          documentsWithUrls.push({
            name: file.name,
            url: response,
          });
      }),
    );

    mutateAsync({
      ...tableFilters,
      ...rest,
      selectedIds: getSelectedRows().map((row) => row.id),
      documents: documentsWithUrls,
    });
  };

  const isSending = isPending || isLoading;

  return (
    <>
      <PdfLoadingOverlay isVisible={isSending} message="Envoi en cours..." />
      <Modal
        isOpen={isOpen}
        onClose={onCancel}
        className="w-full max-w-[700px] tabletScreen:w-[90%]"
      >
        <Form<SendEmailDataType>
          resolverSchema={sendEmailSchema}
          onSubmit={(data) => handleOnSubmit(data)}
          onSubmitError={(errors) => console.log(errors)}
          isLoading={isSending}
          className="flex h-full w-full flex-col justify-between"
        >
          <SendEmailFormWrapper handleClose={onCancel} isSending={isSending} />
        </Form>
      </Modal>
    </>
  );
};
