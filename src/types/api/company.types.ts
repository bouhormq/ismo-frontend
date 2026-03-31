import { EditCompanyDataType } from "$/pages/ClientPage/_features/constants/validations.constants";
import { DataSheets } from "$/utils/types/misc.types";

import { Company } from "../models/company.types";

export type CreateCompanyResponse = Company;

export type DetailedCompanyResponse = Company & {
  followedBy?: { id: number; name: string };
  contactOrigin?: { id: number; name: string };
  usedItems: { value: number; name: string }[];
  desiredItems: { value: number; name: string }[];
  industries: { value: number; name: string }[];
  categories: { value: number; name: string }[];
  sections: { value: number; name: string }[];
};

type SelectParam = {
  id?: number;
  name?: string;
};

type InitialEditCompanyParams = Omit<
  EditCompanyDataType,
  | "companyType"
  | "contactOrigin"
  | "usedItems"
  | "desiredItems"
  | "industries"
  | "categories"
  | "sections"
  | "_memo"
>;

export type EditCompanyParams = InitialEditCompanyParams & {
  usedItems: SelectParam[];
  desiredItems: SelectParam[];

  companyPotential?: SelectParam;
  contactOrigin?: SelectParam;

  companyType?: SelectParam;

  industries?: SelectParam[];
  categories?: SelectParam[];
  sections?: SelectParam[];
  lastProspectionCall?: string;
};

export type EditCompanyResponse = DetailedCompanyResponse;

type OptionItem = {
  value: number;
  label: string;
};

export type GetAllCompaniesOptionsResponse = OptionItem[];

export type GetAllCompaniesFilterOptionsResponse = {
  usedItems: OptionItem[];
  desiredItems: OptionItem[];

  contactOrigin: OptionItem[];
  industries: OptionItem[];
  categories: OptionItem[];
  sections: OptionItem[];

  users: OptionItem[];

  companyTypes: OptionItem[];
};

export type GenerateCompaniesExcelResponse = { dataSheets: DataSheets };
