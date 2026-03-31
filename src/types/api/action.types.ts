import { Action } from "../models/action.types";

export type CompanyActionRecord = {
  id: number;
  isDone: boolean;
  createdAt: string;
  addedBy: string;
  object: string;
  actionType: string;
};

export type CompanyActionsTableFilters = {
  search?: string;
};

export type CompanyActionsResponse = {
  data: CompanyActionRecord[];
  count: number;
};

export type DetailedActionResponse = Omit<Action, "updatedAt" | "createdAt"> & {
  actionType: { id: number; name: string; color: string };
  addedBy: { id: number; name: string };
  contact: { id: number; name: string } | null;
  companyId: number;
};

export type CreateCompanyActionParams = {
  companyId: number;
  contact?: { id: number } | { name: string };
  actionType: { name: string; color: string } | { id: number };
  addedBy?: { id: number };
  isDone: boolean;
  startDate: string;
  endDate?: string;
  alarmDate?: string;
  object: string;
  description: string;
};

export type CreateCompanyActionResponse = Action;

export type UpdateCompanyActionParams = Partial<CreateCompanyActionParams>;

export type UpdateCompanyActionResponse = DetailedActionResponse;
