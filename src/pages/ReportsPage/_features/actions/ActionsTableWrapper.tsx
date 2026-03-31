import { getAllCompaniesActionsReport } from "$/api/companies/reports/get-all-companies-report";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import Flexbox from "$/components/ui/Flexbox";
import {
  CompaniesReportTableFilters,
  CompanyActionReportRecord,
  CompanyActionReportRecordResponse,
} from "$/types/api/companies-reports.types";

import { TablesHeaderWithFilterTrigger } from "../TablesHeaderWithFilterTrigger";
import { ActionsTable } from "./ActionsTable";

type Props = {
  tab: "companies" | "actions";
  handleSetTab: (tab: "companies" | "actions") => void;
};

export const ActionsTableWrapper = ({ tab, handleSetTab }: Props) => {
  return (
    <EnhancedTableProvider<
      CompanyActionReportRecordResponse,
      CompanyActionReportRecord,
      CompaniesReportTableFilters
    >
      dataSelector={(data) => data.data}
      totalCountSelector={(data) => data.count}
      queryOptions={{
        queryKey: ["all-companies-actions-reports"],
        queryFn: ({ filters, pagination, sorting }) =>
          getAllCompaniesActionsReport(sorting, pagination, filters),
        gcTime: 0,
      }}
    >
      <Flexbox fullWidth className="gap-5 rounded-[34px] bg-white p-6">
        <TablesHeaderWithFilterTrigger<
          CompanyActionReportRecordResponse,
          CompanyActionReportRecord
        >
          tab={tab}
          handleSetTab={handleSetTab}
        />

        <ActionsTable />
      </Flexbox>
    </EnhancedTableProvider>
  );
};
