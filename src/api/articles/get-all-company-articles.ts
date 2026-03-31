import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import {
  CompanyArticlesResponse,
  CompanyArticlesTableFilters,
} from "$/types/api/article.types";
import { restApiClient } from "$/utils/clients/restApiClient";
import { Pagination } from "$/utils/types/misc.types";

export const getAllCompanyArticles = async (
  companyId: number,
  sorting?: EnhancedTableSorting<CompanyArticlesResponse>,
  pagination?: Pagination,
  filters?: CompanyArticlesTableFilters,
): Promise<CompanyArticlesResponse> => {
  if (!companyId) {
    return new Promise((resolve) => resolve({ data: [], count: 0 }));
  }
  return restApiClient
    .url("/articles/company-articles")
    .query({
      companyId,
      ...pagination,
      ...sorting,
      ...filters,
    })
    .get<CompanyArticlesResponse>();
};
