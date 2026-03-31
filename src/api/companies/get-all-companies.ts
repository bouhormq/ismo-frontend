import { EnhancedTableSorting } from "$/components/tables/enhanced-table";
import { restApiClient } from "$/utils/clients/restApiClient";
import { Pagination } from "$/utils/types/misc.types";

export type CompanyRecord = {
  id: number;
  phoneNumber?: string;
  name: string;
  code: string;
  country: string;
  companyPotential: string;
  category: string;
  section: string;
  latestAction: string;
  lastProspectionCall?: string;
  createdAt: string;
};

export type CompanyRecordResponse = {
  data: CompanyRecord[];
  count: number;
};
/**
 * companyPotential
 * createdAt updatedAt
 * companyType followedBy
 * country city
 * contactOrigin section'
 * industry category
 * usedItem wantedItem
 */
export type CompaniesTableFilters = {
  search?: string;
  companyPotential?: string;
  createdAt?: string;
  updatedAt?: string;
  companyType?: string;
  followedBy?: string;
  country?: string;
  city?: string;
  contactOrigin?: string;
  sections?: string;
  industries?: string;
  categories?: string;
  usedItems?: string;
  desiredItems?: string;
  lastProspectionCall?: string;
};

export const getAllCompanies = async (
  sorting?: EnhancedTableSorting<CompanyRecordResponse>,
  pagination?: Pagination,
  filters?: CompaniesTableFilters,
) => {
  return restApiClient
    .url("/companies")
    .query({
      ...pagination,
      ...sorting,
      ...filters,
    })
    .get<CompanyRecordResponse>();
};
