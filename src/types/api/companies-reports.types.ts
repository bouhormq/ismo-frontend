export type CompaniesReportTableFilters = {
  sections?: string;
  industries?: string;
  categories?: string;
  companyName?: string;
  actionType?: string;
  addedBy?: string;
  object?: string;
  done?: string;
  companyPotential?: string;
  startDateRange?: string;
  endDateRange?: string;
};

export type CompanyReportRecord = {
  id: number;
  name: string;
  industry: string;
  category: string;
  section: string;
  companyPotential: string;

  daysSpentInAvailableEquipment: number;
  daysSpentInNeutral: number;
  daysSpentInMaterialRequest: number;
  daysSpentInProjectStudy: number;
  daysSpentInNegotiation: number;
  daysSpentInConclusion: number;
};

export type CompanyReportRecordResponse = {
  data: CompanyReportRecord[];
  count: number;
};

export type CompanyActionReportRecord = {
  id: number;
  companyName: string;
  actionType: string;
  addedBy: string;
  startDate: string;
  endDate: string;
  object: string;
  isDone: boolean;
};

export type CompanyActionReportRecordResponse = {
  data: CompanyActionReportRecord[];
  count: number;
};
