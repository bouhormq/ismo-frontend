import { restApiClient } from "$/utils/clients/restApiClient";

export const forgotPassword = (username: string) => {
  return restApiClient.url("/auth/forgot-password").post({ username });
};
