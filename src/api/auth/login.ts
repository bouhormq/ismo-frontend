import {
  DataLogin,
  LoginDataType,
} from "$/pages/auth/login/_features/constants/validations.constants";

import { restApiClient } from "../../utils/clients/restApiClient";

export const loginUser = async ({ password, username }: LoginDataType) => {
  return restApiClient.url("/auth/login").post<DataLogin>({
    password,
    username: username.toLowerCase().trim(),
  });
};
