import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import {
  CompaniesReportTableFilters,
  CompanyActionReportRecordResponse,
  CompanyReportRecordResponse,
} from "$/types/api/companies-reports.types";
import { restApiClient } from "$/utils/clients/restApiClient";
import { Pagination } from "$/utils/types/misc.types";

export const getAllCompaniesReport = async (
  sorting?: EnhancedTableSorting<CompanyReportRecordResponse>,
  pagination?: Pagination,
  filters?: CompaniesReportTableFilters,
) => {
  return restApiClient
    .url("/companies/report")
    .query({
      ...pagination,
      ...sorting,
      ...filters,
    })
    .get<CompanyReportRecordResponse>();
};

export const getAllCompaniesActionsReport = async (
  sorting?: EnhancedTableSorting<CompanyActionReportRecordResponse>,
  pagination?: Pagination,
  filters?: CompaniesReportTableFilters,
) => {
  return restApiClient
    .url("/companies/actions-report")
    .query({
      ...pagination,
      ...sorting,
      ...filters,
    })
    .get<CompanyActionReportRecordResponse>();
};
