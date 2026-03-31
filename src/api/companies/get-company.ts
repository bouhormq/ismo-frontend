import { DetailedCompanyResponse } from "$/types/api/company.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export default async function getCompany(id: number) {
  return restApiClient.url(`/companies/${id}`).get<DetailedCompanyResponse>();
}
