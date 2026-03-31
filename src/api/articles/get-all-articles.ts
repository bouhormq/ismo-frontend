import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import {
  ArticleRecordResponse,
  ArticlesTableFilters,
} from "$/types/api/article.types";
import { restApiClient } from "$/utils/clients/restApiClient";
import { Pagination } from "$/utils/types/misc.types";

export const getAllArticles = async (
  sorting?: EnhancedTableSorting<ArticleRecordResponse>,
  pagination?: Pagination,
  filters?: ArticlesTableFilters,
) => {
  return restApiClient
    .url("/articles")
    .query({
      ...pagination,
      ...sorting,
      ...filters,
    })
    .get<ArticleRecordResponse>();
};
