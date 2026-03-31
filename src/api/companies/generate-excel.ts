import { GenerateCompaniesExcelResponse } from "$/types/api/company.types";

import { restApiClient } from "../../utils/clients/restApiClient";
import { CompaniesTableFilters } from "./get-all-companies";

export type GenerateCompaniesExcelParams = CompaniesTableFilters & {
  selectedIds: number[];
};

export const generateCompaniesExcel = async (
  data: GenerateCompaniesExcelParams,
) => {
  return restApiClient
    .url("/companies/generate-excel")
    .post<GenerateCompaniesExcelResponse>(data);
};
