import {
  EditCompanyParams,
  EditCompanyResponse,
} from "$/types/api/company.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export const updateCompany = async (input: {
  id: number;
  data: EditCompanyParams;
}) => {
  return restApiClient
    .url(`/companies/${input.id}`)
    .patch<EditCompanyResponse>(input.data);
};
