import { restApiClient } from "../../utils/clients/restApiClient";
import { CompaniesTableFilters } from "./get-all-companies";

export type SendEmailsParams = CompaniesTableFilters & {
  documents: { name: string; url: string }[];
  object: string;
  message: string;
  template: string;
  selectedIds: number[];
  contactIds?: number[];
  articleIds?: number[];
  sendCatalog?: boolean;
};

export const sendEmails = async (data: SendEmailsParams) => {
  const res = await restApiClient
    .url("/companies/send-emails")
    .post<boolean>(data);
  return res;
};
