import { SelectOption } from "$/components/inputs/FormComboSelect/ComboSelectInput";
import { restApiClient } from "$/utils/clients/restApiClient";

export type ActionOptions = {
  actionTypes: SelectOption<number>[];
  users: SelectOption<number>[];
};

export const getActionOptions = () => {
  return restApiClient.url("/actions/options").get<ActionOptions>();
};
