import { NewContactDataType } from "$/pages/ClientPage/_features/constants/validations.constants";
import { ContactRecord } from "$/types/models/contact.types";
import { restApiClient } from "$/utils/clients/restApiClient";

export const createContact = (data: NewContactDataType) => {
  return restApiClient.url("/contacts").post<ContactRecord>(data);
};
