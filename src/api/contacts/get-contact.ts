import { ContactRecord } from "$/types/models/contact.types";
import { restApiClient } from "$/utils/clients/restApiClient";

export const getContact = async (id: number) => {
  return restApiClient.url(`/contacts/${id}`).get<ContactRecord>();
};
