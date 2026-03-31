import { SelectOption } from "$/components/inputs/FormComboSelect/ComboSelectInput";
import { restApiClient } from "$/utils/clients/restApiClient";

export type CompanyFilterOptions = {
  companyPotential: SelectOption<string>[];
  categories: SelectOption<string>[];
  contactOrigin: SelectOption<string>[];
  sections: SelectOption<string>[];
  followedBy: SelectOption<string>[];
  industries: SelectOption<string>[];
  usedItems: SelectOption<string>[];
  desiredItems: SelectOption<string>[];
  users: SelectOption<string>[];
  companyTypes: SelectOption<string>[];
  companies: SelectOption<string>[];
  companiesPotentials: SelectOption<string>[];
  actionsTypes: SelectOption<string>[];
  addedBy: SelectOption<string>[];
  objects: SelectOption<string>[];
};

export const getFilterOptions = () => {
  return restApiClient
    .url("/companies/filter-options")
    .get<CompanyFilterOptions>();
};
