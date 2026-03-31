import { NewCompanyData } from "$/pages/createClient/_features/constants/validations.constants";
import { CreateCompanyResponse } from "$/types/api/company.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export const createCompany = async (data: NewCompanyData) => {
  return restApiClient.url("/companies").post<CreateCompanyResponse>(data);
};
