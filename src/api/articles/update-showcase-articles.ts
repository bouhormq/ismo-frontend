import { restApiClient } from "../../utils/clients/restApiClient";

export type UpdateShowcaseArticlesParams = {
  selectedIds: number[];
};

export const updateShowcaseArticles = async (
  data: UpdateShowcaseArticlesParams,
) => {
  return restApiClient.url("/articles/showcase-articles").post<boolean>(data);
};
