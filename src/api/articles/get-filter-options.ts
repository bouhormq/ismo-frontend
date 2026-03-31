import { SelectOption } from "$/components/inputs/FormComboSelect/ComboSelectInput";
import { restApiClient } from "$/utils/clients/restApiClient";

export type ArticleFilterOptions = {
  sections: SelectOption<string>[];
  industries: SelectOption<string>[];
  categories: SelectOption<string>[];
  equipmentCondition: SelectOption<string>[];
  references: SelectOption<string>[];
  companyNames: SelectOption<string>[];
};

export const getArticlesFilterOptions = () => {
  return restApiClient
    .url("/articles/filter-options")
    .get<ArticleFilterOptions>();
};
