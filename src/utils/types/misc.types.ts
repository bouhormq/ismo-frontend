import { ComponentProps } from "react";
import { FieldValues, Path, RegisterOptions } from "react-hook-form";

import { COUNTRIES_PAIR } from "$/utils/constants/countries.constants";

export type BaseInput<O extends keyof ComponentProps<"input"> = never> = Omit<
  ComponentProps<"input">,
  O | "type"
> & {
  label: string;
  hideLabel?: boolean;
  error?: string;
};

export type FormInput<
  T extends FieldValues,
  TPath extends Path<T> = Path<T>,
> = {
  name: TPath;
  label: string;
} & Omit<RegisterOptions<T, TPath>, "valueAsNumber" | "valueAsDate">;

export type ComboOption<T> = {
  label: string;
  value: T;
};

export type KeyValueObject<KeyType extends PropertyKey = PropertyKey> = Record<
  KeyType,
  unknown
>;
export const SortOrder = {
  ASC: "asc",
  DESC: "desc",
} as const;
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

// enum CompanyType {
//   SARL
//   SAS
//   SASU
//   EURL
//   EIRL
//   ASSOCIATION
// }

export const CompanyType = {
  SARL: "SARL",
  SAS: "SAS",
  SASU: "SASU",
  EURL: "EURL",
  EIRL: "EIRL",
  ASSOCIATION: "ASSOCIATION",
} as const;
export type CompanyType = keyof typeof CompanyType;

export const CompanyTypeOptions: ComboOption<CompanyType>[] = Object.keys(
  CompanyType,
).map((key) => ({ label: key, value: key as CompanyType }));

export type Pagination = {
  offset?: number;
  limit?: number;
};

export type SelectOption = {
  label: string;
  value: string;
  color?: string;
};

export type CountryType = (typeof COUNTRIES_PAIR)[keyof typeof COUNTRIES_PAIR];

export type ExcelDataType = { [key: string]: string }[];

export type DataSheets = {
  [sheetName: string]: {
    headers: { [key: string]: string };
    data: ExcelDataType;
  };
};
