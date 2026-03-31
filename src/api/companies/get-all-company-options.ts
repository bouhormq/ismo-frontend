import { GetAllCompaniesOptionsResponse } from "$/types/api/company.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export default async function getAllCompanyOptions() {
  return restApiClient
    .url("/companies/options")
    .get<GetAllCompaniesOptionsResponse>();
}
