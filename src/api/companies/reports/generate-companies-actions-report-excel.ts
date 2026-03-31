import { CompaniesReportTableFilters } from "$/types/api/companies-reports.types";
import { GenerateCompaniesExcelResponse } from "$/types/api/company.types";

import { restApiClient } from "../../../utils/clients/restApiClient";

export const generateCompaniesActionsReportExcel = async (
  data: CompaniesReportTableFilters,
) => {
  return restApiClient
    .url("/companies/actions-report/generate-excel")
    .post<GenerateCompaniesExcelResponse>(data);
};
