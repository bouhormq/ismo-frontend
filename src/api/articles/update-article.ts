import {
  EditArticleParams,
  EditArticleResponse,
} from "$/types/api/article.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export const updateArticle = async (input: {
  id: number;
  data: EditArticleParams;
}) => {
  return restApiClient
    .url(`/articles/${input.id}`)
    .patch<EditArticleResponse>(input.data);
};
