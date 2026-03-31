import { SelectOption } from "$/components/inputs/FormComboSelect/ComboSelectInput";
import { restApiClient } from "$/utils/clients/restApiClient";

export type ContactOptions = SelectOption<number>[];

export const getContactOptions = (params: { companyId?: number }) => {
  return restApiClient
    .url("/contacts/options")
    .query(params)
    .get<ContactOptions>();
};
