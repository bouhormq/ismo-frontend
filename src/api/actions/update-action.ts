import {
  UpdateCompanyActionParams,
  UpdateCompanyActionResponse,
} from "$/types/api/action.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export const updateAction = async (input: {
  id: number;
  data: UpdateCompanyActionParams;
}) => {
  return restApiClient
    .url(`/actions/${input.id}`)
    .patch<UpdateCompanyActionResponse>(input.data);
};
