import { DetailedActionResponse } from "$/types/api/action.types";

import { restApiClient } from "../../utils/clients/restApiClient";

export default async function getAction(id: number) {
  return restApiClient.url(`/actions/${id}`).get<DetailedActionResponse>();
}
