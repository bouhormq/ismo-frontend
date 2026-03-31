import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CompaniesTableFilters,
  CompanyRecord,
  CompanyRecordResponse,
  getAllCompanies,
} from "$/api/companies/get-all-companies";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import Flexbox from "$/components/ui/Flexbox";
import PageHeaderLayout from "$/layouts/PageHeaderLayout";
import CompanyTableHeaderWithFilterTrigger from "$/pages/companyProfile/_features/components/CompanyTableHeaderWithFilterTrigger";
import { PATHS } from "$/routes/constants";

import CompaniesTable from "./_features/components/CompaniesTable";

const CompanyProfileMainPage = () => {
  const navigate = useNavigate();

  const [companiesCount, setCompaniesCount] = useState<number | undefined>();

  return (
    <PageHeaderLayout
      headerText="Fiche Société"
      subtitle={companiesCount ? `(${companiesCount} Sociétés)` : undefined}
    >
      <EnhancedTableProvider<
        CompanyRecordResponse,
        CompanyRecord,
        CompaniesTableFilters
      >
        dataSelector={(data) => data.data}
        totalCountSelector={(data) => {
          setCompaniesCount(data.count);
          return data.count;
        }}
        queryOptions={{
          queryKey: ["all-companies"],
          queryFn: ({ filters, pagination, sorting }) =>
            getAllCompanies(sorting, pagination, filters),
          gcTime: 0,
        }}
      >
        <Flexbox fullWidth className="gap-5 rounded-[34px] bg-white p-6">
          <CompanyTableHeaderWithFilterTrigger
            handleAdd={() => navigate(PATHS.CREATE_CLIENT)}
          />

          <CompaniesTable />
        </Flexbox>
      </EnhancedTableProvider>
    </PageHeaderLayout>
  );
};

export default CompanyProfileMainPage;
