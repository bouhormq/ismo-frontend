import { restApiClient } from "$/utils/clients/restApiClient";

export type ContactSendEmailsParams = {
  documents: { name: string; url: string }[];
  object: string;
  message: string;
  selectedIds: number[];
};

export const contactSendEmails = async (data: ContactSendEmailsParams) => {
  const res = await restApiClient
    .url("/contacts/send-emails")
    .post<boolean>(data);
  return res;
};
