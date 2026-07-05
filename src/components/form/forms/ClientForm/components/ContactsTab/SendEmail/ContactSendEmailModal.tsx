import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

import { contactSendEmails } from "$/api/contacts/contact-send-emails";
import { uploadFile } from "$/api/media";
import Form from "$/components/form/Form";
import { useEnhancedTable } from "$/components/tables/enhanced-table/EnhancedTableProvider";
import { contactSendEmailSchema } from "$/pages/companyProfile/_features/components/SendEmailModal/validations.constants";
import {
  ContactRecord,
  ContactRecordResponse,
} from "$/types/models/contact.types";

import {
  ContactSendEmailWrapper,
  LocalContactSendEmailsParams,
} from "./ContactSendEmailWrapper";

type Props = {
  onCancel: VoidFunction;
};

type FormValues = {
  object: string;
  message: string;
};

export const ContactSendEmailModal = ({ onCancel }: Props) => {
  const { resetField } = useFormContext();

  const { getSelectedRows } = useEnhancedTable<
    ContactRecordResponse,
    ContactRecord
  >();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Partial<LocalContactSendEmailsParams>) => {
      const { documents, object, message, articleIds, sendCatalog, cc, bcc } = data;

      if (!object || !message) return;

      const ccList = cc ? cc.split(",").map((e) => e.trim()).filter(Boolean) : undefined;
      const bccList = bcc ? bcc.split(",").map((e) => e.trim()).filter(Boolean) : undefined;
      const documentsWithUrls: { name: string; url: string }[] = [];

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

      const sendEmailResponse = await contactSendEmails({
        selectedIds: getSelectedRows().map((row) => row.id),
        object,
        message,
        documents: documentsWithUrls,
        ...(ccList?.length ? { cc: ccList } : {}),
        ...(bccList?.length ? { bcc: bccList } : {}),
        ...(articleIds?.length ? { articleIds } : {}),
        ...(sendCatalog !== undefined ? { sendCatalog } : {}),
      });

      resetField("object");
      resetField("message");

      return sendEmailResponse;
    },
    onSuccess: () => {
      onCancel();
    },
  });

  const handleOnSubmit = async (
    data: Partial<LocalContactSendEmailsParams>,
  ) => {
    mutate(data);
  };

  return (
    <Form<FormValues>
      resolverSchema={contactSendEmailSchema}
      onSubmit={(data) => handleOnSubmit(data)}
      isLoading={isPending}
      className="w-full"
      id="upload-form"
    >
      <ContactSendEmailWrapper handleClose={onCancel} isPending={isPending} />
    </Form>
  );
};
