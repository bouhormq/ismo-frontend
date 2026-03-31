import { GetAllCompaniesFilterOptionsResponse } from "$/types/api/company.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export default async function getAllCompanyFilterOptions() {
  return restApiClient
    .url("/companies/filter-options")
    .get<GetAllCompaniesFilterOptionsResponse>();
}
