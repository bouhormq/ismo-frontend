import { getAllCompanyActions } from "$/api/actions/get-all-company-actions";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import {
  CompanyActionRecord,
  CompanyActionsResponse,
  CompanyActionsTableFilters,
} from "$/types/api/action.types";

import ActionsTable from "./ActionsTable";

type Props = {
  companyId: number;
};

export const ActionsTab = ({ companyId }: Props) => {
  return (
    <EnhancedTableProvider<
      CompanyActionsResponse,
      CompanyActionRecord,
      CompanyActionsTableFilters
    >
      dataSelector={(data) => data.data}
      totalCountSelector={(data) => data.count}
      queryOptions={{
        queryKey: ["table-company-actions", companyId],
        queryFn: ({ filters, pagination, sorting }) =>
          getAllCompanyActions(companyId, sorting, pagination, filters),
        gcTime: 0,
      }}
    >
      <ActionsTable companyId={companyId} />
    </EnhancedTableProvider>
  );
};
