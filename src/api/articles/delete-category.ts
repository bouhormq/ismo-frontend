import { restApiClient } from "$/utils/clients/restApiClient";

export const deleteCategory = async (id: number) => {
  return restApiClient.url(`/articles/categories/${id}`).delete();
};
