import { UpdateContactDataType } from "$/pages/ClientPage/_features/constants/validations.constants";
import { ContactRecord } from "$/types/models/contact.types";
import { restApiClient } from "$/utils/clients/restApiClient";

export const updateContact = (data: UpdateContactDataType) => {
  const { id, ...rest } = data;
  return restApiClient.url(`/contacts/${id}`).patch<ContactRecord>(rest);
};
