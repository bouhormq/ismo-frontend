import { restApiClient } from "$/utils/clients/restApiClient";

export const deleteDocument = async (id: number) => {
  return restApiClient.delete(`/documents/${id}`);
};
