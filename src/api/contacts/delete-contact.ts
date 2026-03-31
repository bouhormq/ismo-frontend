import { restApiClient } from "$/utils/clients/restApiClient";

export const deleteContact = async (id: number) => {
  return restApiClient.delete(`/contacts/${id}`);
};
