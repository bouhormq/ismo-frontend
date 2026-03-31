import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import {
  CompanyActionsResponse,
  CompanyActionsTableFilters,
} from "$/types/api/action.types";
import { restApiClient } from "$/utils/clients/restApiClient";
import { Pagination } from "$/utils/types/misc.types";

export const getAllCompanyActions = async (
  companyId: number,
  sorting?: EnhancedTableSorting<CompanyActionsResponse>,
  pagination?: Pagination,
  filters?: CompanyActionsTableFilters,
): Promise<CompanyActionsResponse> => {
  if (!companyId) {
    return new Promise((resolve) => resolve({ data: [], count: 0 }));
  }
  return restApiClient
    .url("/actions")
    .query({
      companyId,
      ...pagination,
      ...sorting,
      ...filters,
    })
    .get<CompanyActionsResponse>();
};
