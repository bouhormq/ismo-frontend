import { getAllCompaniesReport } from "$/api/companies/reports/get-all-companies-report";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import Flexbox from "$/components/ui/Flexbox";
import {
  CompaniesReportTableFilters,
  CompanyReportRecord,
  CompanyReportRecordResponse,
} from "$/types/api/companies-reports.types";

import { TablesHeaderWithFilterTrigger } from "../TablesHeaderWithFilterTrigger";
import { CompaniesTable } from "./CompaniesTable";

type Props = {
  tab: "companies" | "actions";
  handleSetTab: (tab: "companies" | "actions") => void;
};

export const CompaniesTableWrapper = ({ tab, handleSetTab }: Props) => {
  return (
    <EnhancedTableProvider<
      CompanyReportRecordResponse,
      CompanyReportRecord,
      CompaniesReportTableFilters
    >
      dataSelector={(data) => data.data}
      totalCountSelector={(data) => data.count}
      queryOptions={{
        queryKey: ["all-companies-reports"],
        queryFn: ({ filters, pagination, sorting }) =>
          getAllCompaniesReport(sorting, pagination, filters),
        gcTime: 0,
      }}
    >
      <Flexbox fullWidth className="gap-5 rounded-[34px] bg-white p-6">
        <TablesHeaderWithFilterTrigger<
          CompanyReportRecordResponse,
          CompanyReportRecord
        >
          tab={tab}
          handleSetTab={handleSetTab}
        />

        <CompaniesTable />
      </Flexbox>
    </EnhancedTableProvider>
  );
};
