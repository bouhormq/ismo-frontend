import { NewArticleType } from "$/pages/articles/CreateArticle/_features/constants/validations.constants";
import { CreateArticleResponse } from "$/types/api/article.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export const createArticle = async (data: NewArticleType) => {
  return restApiClient.url("/articles").post<CreateArticleResponse>(data);
};
