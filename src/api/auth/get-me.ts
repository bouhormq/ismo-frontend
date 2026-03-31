import { User } from "../../types/auth/user.types";
import { restApiClient } from "../../utils/clients/restApiClient";

export default async function getMe() {
  return restApiClient.url("/auth/me").get<User>();
}
