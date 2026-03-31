import { LocalContactSendEmailsParams } from "$/components/form/forms/ClientForm/components/ContactsTab/SendEmail/ContactSendEmailWrapper";

export type ContactRecord = {
  id: number;
  companyId?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  functionality?: string;
  status?: string;
  gender: string;
  hasWhatsapp: boolean;
  note?: string;
};

export type ContactRecordResponse = {
  data: ContactRecord[];
  count: number;
};

export type ContactsTableFilters = {
  search?: string;
};

export type PublishPropsHandleChange = <
  T extends keyof LocalContactSendEmailsParams,
>(
  key: T,
  value: LocalContactSendEmailsParams[T],
) => void;
