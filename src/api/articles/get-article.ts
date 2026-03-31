import { DetailedArticleResponse } from "$/types/api/article.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export default async function getArticle(id: number) {
  return restApiClient.url(`/articles/${id}`).get<DetailedArticleResponse>();
}
