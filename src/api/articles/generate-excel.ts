import {
  ArticlesTableFilters,
  GenerateArticlesExcelResponse,
} from "$/types/api/article.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export type GenerateArticlesExcelParams = ArticlesTableFilters & {
  selectedIds: number[];
};

export const generateArticlesExcel = async (
  data: GenerateArticlesExcelParams,
) => {
  return restApiClient
    .url("/articles/generate-excel")
    .post<GenerateArticlesExcelResponse>(data);
};
