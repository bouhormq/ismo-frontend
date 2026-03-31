import { restApiClient } from "../../utils/clients/restApiClient";

export const logoutUser = async () => {
  return restApiClient.url("/auth/logout").post<never>();
};
