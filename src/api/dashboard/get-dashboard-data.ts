import { restApiClient } from "$/utils/clients/restApiClient";

import { CompanyRecord } from "../companies/get-all-companies";

export type NameCount = {
  name: string;
  count: number;
};

export type NameCountWithColor = {
  name: string;
  value: number;
  color: string;
  percentage: string;
};

type DashboardResponse = {
  allCompanies: CompanyRecord[];
  allEmails: number;
  chiffreAffaires: number;
  companies: {
    categories: NameCount[];
    sections: NameCount[];
    industries: NameCount[];
  };
  articles: {
    categories: NameCount[];
    sections: NameCount[];
    industries: NameCount[];
  };
};

export const getDashboardData = async (filterDate?: {
  start?: Date;
  end?: Date;
}) => {
  return restApiClient
    .url("/dashboard")
    .query({
      startDate: filterDate?.start?.toISOString(),
      endDate: filterDate?.end?.toISOString(),
    })
    .get<DashboardResponse>();
};
