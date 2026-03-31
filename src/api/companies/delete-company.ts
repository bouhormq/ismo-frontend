import { restApiClient } from "$/utils/clients/restApiClient";

export const deleteCompany = async (id: number) => {
  return restApiClient.delete(`/companies/${id}`);
};
