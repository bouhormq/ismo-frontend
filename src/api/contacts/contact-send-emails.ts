import { restApiClient } from "$/utils/clients/restApiClient";

export type ContactSendEmailsParams = {
  object: string;
  message: string;
  documents: { name: string; url: string }[];
  selectedIds: number[];
  cc?: string[];
  bcc?: string[];
  contactIds?: number[];
  articleIds?: number[];
  sendCatalog?: boolean;
};

export const contactSendEmails = async (data: ContactSendEmailsParams) => {
  const res = await restApiClient
    .url("/contacts/send-emails")
    .post<boolean>(data);
  return res;
};
