import { restApiClient } from "$/utils/clients/restApiClient";

export const deleteAction = async (id: number) => {
  return restApiClient.delete(`/actions/${id}`);
};
