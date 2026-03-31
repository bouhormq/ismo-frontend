import { getAllCompanyArticles } from "$/api/articles/get-all-company-articles";
import { EnhancedTableProvider } from "$/components/tables/enhanced-table";
import Flexbox from "$/components/ui/Flexbox";
import {
  CompanyArticleRecord,
  CompanyArticlesResponse,
  CompanyArticlesTableFilters,
} from "$/types/api/article.types";

import { CompanyArticlesTable } from "./CompanyArticlesTable";

type Props = { companyId: number };

export const ArticlesTab = ({ companyId }: Props) => {
  return (
    <Flexbox fullWidth className="mt-2">
      <EnhancedTableProvider<
        CompanyArticlesResponse,
        CompanyArticleRecord,
        CompanyArticlesTableFilters
      >
        dataSelector={(data) => data.data}
        totalCountSelector={(data) => data.count}
        queryOptions={{
          queryKey: ["company-articles-data", companyId],
          queryFn: ({ filters, pagination, sorting }) =>
            getAllCompanyArticles(companyId, sorting, pagination, filters),
          gcTime: 0,
        }}
      >
        <CompanyArticlesTable />
      </EnhancedTableProvider>
    </Flexbox>
  );
};
