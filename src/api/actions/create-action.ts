import {
  CreateCompanyActionParams,
  CreateCompanyActionResponse,
} from "$/types/api/action.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export const createAction = async (data: CreateCompanyActionParams) => {
  return restApiClient.url("/actions").post<CreateCompanyActionResponse>(data);
};
