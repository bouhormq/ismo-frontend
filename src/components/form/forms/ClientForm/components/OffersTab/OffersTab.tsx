import {
  GetCompanyOffersDataResponse,
  OffersTableColumnsType,
  getCompanyOffers,
} from "$/api/companies/axonaut/getCompanyOffers";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import Flexbox from "$/components/ui/Flexbox";

import OffersTable from "./OffersTable";

type Props = { companyId: number };

export const OffersTab = ({ companyId }: Props) => {
  return (
    <Flexbox fullWidth className="mt-2">
      <EnhancedTableProvider<
        GetCompanyOffersDataResponse,
        OffersTableColumnsType,
        any
      >
        dataSelector={(data) => data.data}
        totalCountSelector={(data) => data.count}
        queryOptions={{
          queryKey: ["company-offers", companyId],
          queryFn: () => getCompanyOffers({ companyId }),
        }}
      >
        <Flexbox fullWidth className="gap-5 rounded-[34px] bg-white p-6">
          <OffersTable />
        </Flexbox>
      </EnhancedTableProvider>
    </Flexbox>
  );
};
