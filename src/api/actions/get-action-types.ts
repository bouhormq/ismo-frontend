import { restApiClient } from "$/utils/clients/restApiClient";

export type ActionTypes = {
  id: number;
  name: string;
  color: string;
}[];

export const getActionTypes = () => {
  return restApiClient.url("/actions/action-types").get<ActionTypes>();
};
