import { restApiClient } from "$/utils/clients/restApiClient";

export const deleteArticle = async (id: number) => {
  return restApiClient.delete(`/articles/${id}`);
};
